import CanvasPrint from './CanvasPrint'
import ePOSBuilder from './ePOSBuilder'

export default class Printer extends CanvasPrint {
    deviceID?: string
    isCrypto?: boolean
    ePosDev?: any
    timeout = 10000
    timeoutid?: NodeJS.Timeout

    constructor(deviceID?: string, isCrypto?: boolean, ePOSDeviceContext?: any) {
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
                var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
                var sequence = -1
                try {
                    this.connectionObj.emit(eposmsg)
                    sequence = eposmsg.sequence
                } catch (e) { }
                this.force = false
                this.setXmlString("")
            } catch (e) {
                sq = -1
            }
        } else {
            let self = this,
                address = this.connectionObj?.getAddressWithProtocol() + "/cgi-bin/epos/service.cgi?devid=" + this.deviceID + "&timeout=" + this.timeout,
                soap: string, xhr: XMLHttpRequest, tid: NodeJS.Timeout, res: HTMLCollectionOf<Element>, success, code, status, battery
            soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
            if (printjobid) {
                soap += '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' + printjobid + "</printjobid></parameter></s:Header>"
            }
            soap += "<s:Body>" + this.toString() + "</s:Body></s:Envelope>"
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
                xhr.open("POST", address, true)
                xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
                xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jan 1970 00:00:00 GMT")
                xhr.setRequestHeader("SOAPAction", '""')
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        clearTimeout(tid)
                        if (xhr.status == 200 && xhr.responseXML) {
                            res = xhr.responseXML.getElementsByTagName('response')
                            if (res.length > 0) {
                                success = /^(1|true)$/.test(res[0].getAttribute("success") ?? '')
                                code = res[0].hasAttribute("code") ? res[0].getAttribute("code") : ''
                                status = res[0].hasAttribute("status") ? parseInt(res[0].getAttribute("status") ?? '') : 0
                                battery = res[0].hasAttribute("battery") ? parseInt(res[0].getAttribute("battery") ?? '') : 0
                                res = xhr.responseXML.getElementsByTagName("printjobid")
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
            this.setXmlString("")
            sq = 0
        }
        return sq
    }

    client_onxmlresult(res: HTMLCollectionOf<Element>, sq: number) {
        if (res) {
            var xml = res.resultdata
            var success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml)
            xml.match(/code\s*=\s*"\s*(\S*)\s*"/)
            var code = RegExp.$1
            xml.match(/status\s*=\s*"\s*(\d+)\s*"/)
            var status = parseInt(RegExp.$1)
            xml.match(/battery\s*=\s*"\s*(\d+)\s*"/)
            var battery = parseInt(RegExp.$1)
            this.fireReceiveEvent(success, code, status, battery, res.printjobid, sq)
        } else {
            this.fireErrorEvent(0, this.ASB_NO_RESPONSE, sq)
        }
    }

    startMonitor() {
        var result = false
        var address = this.connectionObj.getAddressWithProtocol() + "/cgi-bin/epos/service.cgi?devid=" + this.deviceID + "&timeout=10000"
        try {
            if (!this.enabled) {
                this.address = address
                this.enabled = true
                this.status = this.ASB_DRAWER_KICK
                this.sendStartMonitorCommand()
            }
            result = true
        } catch (e) {
            throw e
        }
        return result
    }

    sendStartMonitorCommand() {
        var self = this
        var address = this.address
        var request = new ePOSBuilder().toString()
        var soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' + request + "</s:Body></s:Envelope>"
        var epos = this
        if (window.XDomainRequest) {
            var xdr = new XDomainRequest()
            xdr.open("POST", address, true)
            xdr.onload() {
                var res = xdr.responseText
                if (/response/.test(res)) {
                    var success = /success\s*=\s*"\s*(1|true)\s*"/.test(res)
                    res.match(/code\s*=\s*"\s*(\S*)\s*"/)
                    var code = RegExp.$1
                    res.match(/status\s*=\s*"\s*(\d+)\s*"/)
                    var status = parseInt(RegExp.$1)
                    res.match(/battery\s*=\s*"\s*(\d+)\s*"/)
                    var battery = parseInt(RegExp.$1)
                    self.fireStatusEvent(epos, status, battery)
                } else {
                    self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                }
                self.updateStatus(epos)
            }
            xdr.onerror() {
                self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE)
                self.updateStatus(epos)
            }
            xdr.onprogress() { }
            xdr.ontimeout = xdr.onerror
            xdr.send(soap)
        } else {
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest()
                xhr.open("POST", address, true)
                xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
                xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jan 1970 00:00:00 GMT")
                xhr.setRequestHeader("SOAPAction", '""')
                xhr.onreadystatechange() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200 && xhr.responseXML) {
                            var res = xhr.responseXML.getElementsByTagName("response")
                            if (res.length > 0) {
                                var success = /^(1|true)$/.test(res[0].getAttribute("success"))
                                var code = res[0].getAttribute("code")
                                var status = parseInt(res[0].getAttribute("status"))
                                var battery = res[0].hasAttribute("battery") ? parseInt(res[0].getAttribute("battery")) : 0
                                self.fireStatusEvent(epos, status, battery)
                            } else {
                                self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                            }
                        } else {
                            self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                        }
                        self.updateStatus(epos)
                    }
                }
                xhr.send(soap)
            } else {
                throw new Error("XMLHttpRequest is not supported")
            }
        }
    }

    stopMonitor() {
        var result = false
        try {
            this.enabled = false
            if (this.timeoutid) {
                clearTimeout(this.timeoutid)
                delete this.timeoutid
            }
            result = true
        } catch (e) {
            throw e
        }
        return result
    }

    fireReceiveEvent(success, code, status, battery, printjobid, sq) {
        delete this.isPrint
        if (code == "EX_ENPC_TIMEOUT") {
            code = "ERROR_DEVICE_BUSY"
        }
        if (this.onreceive) {
            this.onreceive({
                success: success,
                code: code,
                status: status,
                battery: battery,
                printjobid: printjobid
            }, sq)
        }
    }

    fireErrorEvent(status, responseText, sq) {
        if (this.onerror) {
            this.onerror({
                status: status,
                responseText: responseText
            }, sq)
        }
        this.ePosDev.cleanup()
    }

    fireStatusEvent(epos, status, battery) {
        if (status == 0 || status == this.ASB_NO_RESPONSE) {
            status = this.status | this.ASB_NO_RESPONSE
        }
        var diff = this.status == this.ASB_DRAWER_KICK ? ~0 : this.status ^ status
        var difb = this.status == 0 ? ~0 : this.battery ^ battery
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
        const self = this
        if (this.enabled) {
            let delay = this.interval
            if (isNaN(delay) || delay < 1000) {
                delay = 3000
            }
            this.timeoutid = setTimeout(function () {
                delete self.timeoutid
                if (self.enabled) {
                    self.sendStartMonitorCommand()
                }
            }, delay)
        }
    }

}