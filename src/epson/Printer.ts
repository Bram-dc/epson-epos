import { ASB } from '../functions/enums'
import MessageFactory from '../MessageFactory'
import CanvasPrint from './CanvasPrint'
import ePOSBuilder from './ePOSBuilder'

export default class Printer extends CanvasPrint {
    deviceID: string
    isCrypto: boolean
    ePosDev: any
    timeout = 10000
    timeoutid?: NodeJS.Timeout

    constructor(deviceID: string, isCrypto: boolean, ePOSDeviceContext: any) {
        super()

        this.deviceID = deviceID
        this.isCrypto = isCrypto
        this.ePosDev = ePOSDeviceContext

    }

    finalize() {

        this.stopMonitor()

    }

    setXmlString(xml: string) {

        this.message = xml

    }

    getXmlString() {

        return this.message

    }

    getPrintJobStatus(printjobid: string) {

        this.setXmlString('')

        this.send(printjobid)

    }

    send(printjobid?: string | null) {
        let sq = -1
        if ((!this.ePosDev.eposprint) && (this.connectionObj?.isUsableDeviceIF())) {
            try {
                const data: {
                    type: 'print'
                    timeout: number
                    printdata: string
                    printjobid?: string
                } = {
                    type: 'print',
                    timeout: this.timeout,
                    printdata: this.toString(),
                    printjobid: undefined,
                }
                switch (arguments.length) {
                    case 0:
                        data.printdata = this.toString()
                        break
                    case 1:
                        data.printdata = this.toString()
                        data.printjobid = printjobid
                        break
                    case 2:
                    case 3:
                        data.printdata = arguments[1]
                        data.printjobid = arguments[2]
                }
                const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
                let sequence = -1
                try {
                    this.connectionObj.emit(eposmsg)
                    sequence = eposmsg.sequence
                } catch (e) { }
                this.force = false
                this.setXmlString('')
            } catch (e) {
                sq = -1
            }
        } else {

            let self = this,
                address = this.connectionObj?.getAddressWithProtocol() + '/cgi-bin/epos/service.cgi?devid=' + this.deviceID + '&timeout=' + this.timeout,
                soap: string, xhr: XMLHttpRequest, tid: NodeJS.Timeout, res: HTMLCollectionOf<Element>, success, code, status, battery
            soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
            if (printjobid) {
                soap += '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' + printjobid + '</printjobid></parameter></s:Header>'
            }
            soap += '<s:Body>' + this.toString() + '</s:Body></s:Envelope>'


            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
                xhr.open('POST', address, true)
                xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8')
                xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT')
                xhr.setRequestHeader('SOAPAction', '""')
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        clearTimeout(tid)
                        if (xhr.status == 200 && xhr.responseXML) {
                            res = xhr.responseXML.getElementsByTagName('response')
                            if (res.length > 0) {
                                success = /^(1|true)$/.test(res[0].getAttribute('success') ?? '')
                                code = res[0].hasAttribute('code') ? res[0].getAttribute('code') : ''
                                status = res[0].hasAttribute('status') ? parseInt(res[0].getAttribute('status') ?? '') : 0
                                battery = res[0].hasAttribute('battery') ? parseInt(res[0].getAttribute('battery') ?? '') : 0
                                res = xhr.responseXML.getElementsByTagName('printjobid')
                                printjobid = res.length > 0 ? res[0].textContent : ''
                                self.fireReceiveEvent(success, code, status, battery, printjobid, 0)
                            } else {
                                self.fireErrorEvent(xhr.status, xhr.responseText, 0)
                            }
                        } else {
                            self.fireErrorEvent(xhr.status, xhr.responseText, 0)
                        }
                    }
                }
                tid = setTimeout(function () {
                    xhr.abort()
                }, this.timeout)
                xhr.send(soap)
            }
            this.setXmlString('')
            sq = 0
        }
        return sq
    }

    client_onxmlresult(res: HTMLCollectionOf<Element>, sq: number) {

        if (!res)
            return this.fireErrorEvent(0, ASB.NO_RESPONSE, sq)


        const xml = res.resultdata

        const success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml)

        xml.match(/code\s*=\s*"\s*(\S*)\s*"/)
        const code = RegExp.$1

        xml.match(/status\s*=\s*"\s*(\d+)\s*"/)
        const status = parseInt(RegExp.$1)

        xml.match(/battery\s*=\s*"\s*(\d+)\s*"/)
        const battery = parseInt(RegExp.$1)

        this.fireReceiveEvent(success, code, status, battery, res.printjobid, sq)

    }

    startMonitor() {

        const address = this.connectionObj!.getAddressWithProtocol() + '/cgi-bin/epos/service.cgi?devid=' + this.deviceID + '&timeout=10000'

        if (!this.enabled) {
            this.address = address
            this.enabled = true
            this.status = ASB.DRAWER_KICK
            this.sendStartMonitorCommand()
        }

        return true

    }

    sendStartMonitorCommand() {

        const address = this.address!
        const request = new ePOSBuilder().toString()
        const soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' + request + '</s:Body></s:Envelope>'

        fetch(address, {
            method: 'POST',
            body: soap,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
                'SOAPAction': '""',
            },
        })
            .then(res => {

                if (res.status === 200) {

                    res.text()
                        .then(text => {

                            const collection = new window
                                .DOMParser()
                                .parseFromString(text, 'text/xml')
                                .getElementsByTagName('response')

                            const success = collection.length ? /^(1|true)$/.test(collection[0].getAttribute('success') ?? '') : false
                            const code = collection[0].getAttribute('code') ?? ''
                            const status = parseInt(collection[0].getAttribute('status') ?? '')
                            const battery = collection[0].hasAttribute('battery') ? parseInt(collection[0].getAttribute('battery') ?? '') : 0

                            this.fireStatusEvent(this, status, battery)

                        })
                        .catch(() => this.fireStatusEvent(this, ASB.NO_RESPONSE, 0))

                } else {

                    this.fireStatusEvent(this, ASB.NO_RESPONSE, 0)

                }

                this.updateStatus()

            })
            .catch(() => this.fireStatusEvent(this, ASB.NO_RESPONSE, 0))

    }

    stopMonitor() {

        this.enabled = false

        if (this.timeoutid) {
            clearTimeout(this.timeoutid)
            delete this.timeoutid
        }

        return true

    }

    fireReceiveEvent(success, code, status, battery, printjobid, sq) {

        delete this.isPrint

        if (code == 'EX_ENPC_TIMEOUT') {
            code = 'ERROR_DEVICE_BUSY'
        }

        if (this.onreceive) {
            this.onreceive({
                success: success,
                code: code,
                status: status,
                battery: battery,
                printjobid: printjobid,
            }, sq)
        }

    }

    fireErrorEvent(status, responseText, sq: number) {
        if (this.onerror) {
            this.onerror({
                status: status,
                responseText: responseText,
            }, sq)
        }
        this.ePosDev.cleanup()
    }

    fireStatusEvent(epos, status: ASB, battery: number) {
        if (status == 0 || status == this.ASB_NO_RESPONSE) {
            status = this.status | this.ASB_NO_RESPONSE
        }
        const diff = this.status == this.ASB_DRAWER_KICK ? ~0 : this.status ^ status
        const difb = this.status == 0 ? ~0 : this.battery ^ battery
        this.status = status
        this.battery = battery
        if (diff && this.onstatuschange) {
            this.onstatuschange(status)
        }
        if (difb && this.onbatterystatuschange) {
            this.onbatterystatuschange(battery)
        }
        if (diff & (this.ASB_NO_RESPONSE | this.ASB_OFF_LINE)) {
            if (status & this.ASB_NO_RESPONSE) {
                if (this.onpoweroff) {
                    this.onpoweroff()
                }
            } else {
                if (status & this.ASB_OFF_LINE) {
                    if (this.onoffline) {
                        this.onoffline()
                    }
                } else {
                    if (this.ononline) {
                        this.ononline()
                    }
                }
            }
        }
        if (diff & this.ASB_COVER_OPEN) {
            if (status & this.ASB_NO_RESPONSE) { } else {
                if (status & this.ASB_COVER_OPEN) {
                    if (this.oncoveropen) {
                        this.oncoveropen()
                    }
                } else {
                    if (this.oncoverok) {
                        this.oncoverok()
                    }
                }
            }
        }
        if (diff & (this.ASB_RECEIPT_END | this.ASB_RECEIPT_NEAR_END)) {
            if (status & this.ASB_NO_RESPONSE) { } else {
                if (status & this.ASB_RECEIPT_END) {
                    if (this.onpaperend) {
                        this.onpaperend()
                    }
                } else {
                    if (status & this.ASB_RECEIPT_NEAR_END) {
                        if (this.onpapernearend) {
                            this.onpapernearend()
                        }
                    } else {
                        if (this.onpaperok) {
                            this.onpaperok()
                        }
                    }
                }
            }
        }
        if (diff & this.ASB_DRAWER_KICK) {
            if (status & this.ASB_NO_RESPONSE) { } else {
                if (status & this.ASB_DRAWER_KICK) {
                    if (this.drawerOpenLevel == this.DRAWER_OPEN_LEVEL_HIGH) {
                        if (this.ondraweropen) {
                            this.ondraweropen()
                        }
                    } else {
                        if (this.ondrawerclosed) {
                            this.ondrawerclosed()
                        }
                    }
                    if (this.onbatterylow) {
                        this.onbatterylow()
                    }
                } else {
                    if (this.drawerOpenLevel == this.DRAWER_OPEN_LEVEL_HIGH) {
                        if (this.ondrawerclosed) {
                            this.ondrawerclosed()
                        }
                    } else {
                        if (this.ondraweropen) {
                            this.ondraweropen()
                        }
                    }
                    if (this.onbatteryok) {
                        this.onbatteryok()
                    }
                }
            }
        }
    }

    updateStatus() {

        if (!this.enabled)
            return

        let delay = this.interval

        if (isNaN(delay) || delay < 1000)
            delay = 3000

        this.timeoutid = setTimeout(() => {

            delete this.timeoutid

            if (this.enabled)
                this.sendStartMonitorCommand()

        }, delay)

    }

}