import ePOSBuilder from './ePOSBuilder'
import { ASB } from '../functions/enums'
import { fireErrorEvent, fireReceiveEvent, fireStatusEvent, updateStatus } from '../functions/events'

export default class ePOSPrint extends ePOSBuilder {
    address?: string
    enabled = false
    interval = 3000
    timeout = 300000
    status = 0
    battery = 0
    drawerOpenLevel = 0
    onreceive: ((data: {
        success: boolean,
        code: string,
        status: number,
        battery: number,
        printjobid?: string,
    }) => void) | null = null
    onerror: ((data: {
        status: number,
        responseText: string,
    }) => void) | null = null
    onstatuschange: ((status: number) => void) | null = null
    ononline: (() => void) | null = null
    onoffline: (() => void) | null = null
    onpoweroff: (() => void) | null = null
    oncoverok: (() => void) | null = null
    oncoveropen: (() => void) | null = null
    onpaperok: (() => void) | null = null
    onpaperend: (() => void) | null = null
    onpapernearend: (() => void) | null = null
    ondrawerclosed: (() => void) | null = null
    ondraweropen: (() => void) | null = null
    onbatterylow: (() => void) | null = null
    onbatteryok: (() => void) | null = null
    onbatterystatuschange: ((battery: number) => null) | null = null
    intervalid?: NodeJS.Timeout
    intervalxhr?: XMLHttpRequest

    constructor(address?: string) {
        super()

        this.address = address

    }

    open() {
        if (!this.enabled) {
            this.enabled = true
            this.status = 0
            this.battery = 0
            this.send()
        }
    }

    close() {
        this.enabled = false
        if (this.intervalid) {
            clearTimeout(this.intervalid)
            delete this.intervalid
        }
        if (this.intervalxhr) {
            this.intervalxhr.abort()
            delete this.intervalxhr
        }
    }

    getPrintJobStatus(printjobid: string) {
        this.send(printjobid)
    }

    send(): void
    send(printjobid: string): void
    send(request: string, printjobid: string): void
    send(address: string, request: string, printjobid: string): void

    send(request?: string, printjobid?: string, ...rest: string[]) {

        const args = arguments.length
        const epos = this // eslint-disable-line @typescript-eslint/no-this-alias

        let address = epos.address

        let timeout: NodeJS.Timeout, res: HTMLCollectionOf<Element>, success: boolean, code: string, status: number, battery: number // eslint-disable-line prefer-const

        if (!/^<epos/.test(request ?? '')) {
            if (args > 2) {
                printjobid = request
                request = new ePOSBuilder().toString()
            } else {
                address = request ?? ''
                request = printjobid ?? ''
                printjobid = rest[0]
            }
        }

        let soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
        if (printjobid) {
            soap += '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' + printjobid + '</printjobid></parameter></s:Header>'
        }
        soap += '<s:Body>' + request + '</s:Body></s:Envelope>'

        const xhr = new XMLHttpRequest()

        xhr.open('POST', address ?? '', true)

        xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8')
        xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT')
        xhr.setRequestHeader('SOAPAction', '""')

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                clearTimeout(timeout)

                if (xhr.status == 200 && xhr.responseXML) {

                    res = xhr.responseXML.getElementsByTagName('response')

                    if (res.length > 0) {

                        success = /^(1|true)$/.test(res[0].getAttribute('success') ?? '')
                        code = res[0].getAttribute('code') ?? ''
                        status = res[0].hasAttribute('status') ? parseInt(res[0].getAttribute('status') ?? '') : 0
                        battery = res[0].hasAttribute('battery') ? parseInt(res[0].getAttribute('battery') ?? '') : 0

                        res = xhr.responseXML.getElementsByTagName('printjobid')

                        printjobid = res.length > 0 ? res[0].textContent ?? '' : ''

                        if (args > 0) {
                            fireReceiveEvent(epos, success, code, status, battery, printjobid)
                        } else {
                            fireStatusEvent(epos, status, battery)
                        }

                    } else {

                        if (args > 0) {
                            fireErrorEvent(epos, xhr.status, xhr.responseText)
                        } else {
                            fireStatusEvent(epos, ASB.NO_RESPONSE, 0)
                        }

                    }

                } else {

                    if (args > 0) {
                        fireErrorEvent(epos, xhr.status, xhr.responseText)
                    } else {
                        fireStatusEvent(epos, ASB.NO_RESPONSE, 0)
                    }

                }

                if (args < 1) {

                    updateStatus(epos)

                }
            }

        }

        timeout = setTimeout(() => xhr.abort(), epos.timeout)

        xhr.send(soap)

        if (args < 1) {
            epos.intervalxhr = xhr
        }

    }

}