import { ConnectionAccessResult, ConnectionProbeResult, ConnectionResult, ConnectionIFType, ConnectionStatus } from '../functions/enums'
import ePosDeviceMessage from './ePosDeviceMessage'

export default class Connection {
    socket_p: SocketIOClient.Socket | null = null
    address_p = ''
    protocol_p = ''
    port_p: number | null = null
    callback_p: ((result: ConnectionProbeResult) => void) | null = null
    usableIF_p = 0
    ws_status_p = ConnectionStatus.DISCONNECT
    dev_status_p = ConnectionStatus.DISCONNECT

    constructor() {

        //

    }

    probe(url: string, postdata: string, callback: (result: ConnectionProbeResult) => void) {

        const controller = new AbortController()

        let timedOut = false
        const timeout = setTimeout(() => {
            timedOut = true
            controller.abort()
        }, 5000)

        fetch(url, {
            method: 'POST',
            signal: controller.signal,
            body: postdata,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
                'SOAPAction': '""',
            },
        })
            .then(res => {

                clearTimeout(timeout)

                if (res.status === 200) {

                    callback(ConnectionProbeResult.OK)

                } else {

                    callback(ConnectionProbeResult.ERROR_PARAMETER)

                }

            })
            .catch(() => callback(timedOut ? ConnectionProbeResult.ERROR_TIMEOUT : ConnectionProbeResult.ERROR_PARAMETER))

    }

    probeWebServiceIF(callback: (accessTime: number) => void) {

        const startTime = (new Date).getTime()

        let notify = false

        const printUrl = `${this.getAddressWithProtocol()}/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000`
        const printData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>'

        this.probe(printUrl, printData, code => {

            const result = code === ConnectionProbeResult.OK ? ConnectionAccessResult.OK : ConnectionAccessResult.ERROR

            this.registIFAccessResult(ConnectionIFType.IF_EPOSPRINT, result)

            if (notify)
                callback((new Date).getTime() - startTime)

            notify = false

        })

        const displayUrl = `${this.getAddressWithProtocol()}/cgi-bin/eposDisp/service.cgi?devid=local_display&timeout=10000`
        const displayData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>'

        this.probe(displayUrl, displayData, code => {

            const result = code === ConnectionProbeResult.OK ? ConnectionAccessResult.OK : ConnectionAccessResult.ERROR

            this.registIFAccessResult(ConnectionIFType.IF_EPOSDISPLAY, result)

            if (notify)
                callback((new Date).getTime() - startTime)

            notify = false

        })
    }

    setSocket(socket: SocketIOClient.Socket) {

        this.socket_p = socket

    }

    emit(eposmsg: ePosDeviceMessage) {

        try {

            if (this.socket_p === null)
                return

            this.socket_p.emit('message', eposmsg.toTransmissionForm())

        } catch {

            throw new Error(ConnectionResult.ERROR_SYSTEM)

        }

    }

    setAddress(protocol: string, address: string, port: number) {

        this.protocol_p = protocol
        this.address_p = address
        this.port_p = port
        this.usableIF_p = 0

    }

    getAddressWithProtocol() {

        return `${this.protocol_p}://${this.address_p}`

    }

    getSocketIoURL() {

        return `${this.getAddressWithProtocol()}:${this.port_p}`

    }

    registCallback(callback: (result: ConnectionProbeResult) => void) {

        this.callback_p = callback

    }

    changeStatus(target: ConnectionIFType, status: ConnectionStatus) {

        switch (target) {
            case ConnectionIFType.IF_ALL:
                this.dev_status_p = status
                this.ws_status_p = status
                break
            case ConnectionIFType.IF_EPOSDEVICE:
                this.dev_status_p = status
                break
            default:
                this.ws_status_p = status
                break
        }

    }

    status(target: ConnectionIFType) {

        if (target === ConnectionIFType.IF_EPOSDEVICE)
            return this.dev_status_p

        return this.ws_status_p

    }

    isUsableDeviceIF() {

        return ((this.usableIF_p & ConnectionIFType.IF_EPOSDEVICE) === ConnectionIFType.IF_EPOSDEVICE)

    }

    isUsablePrintIF() {

        if (this.isUsableDeviceIF())
            return true

        return ((this.usableIF_p & ConnectionIFType.IF_EPOSPRINT) === ConnectionIFType.IF_EPOSPRINT)

    }

    isUsableDisplayIF() {

        if (this.isUsableDeviceIF())
            return true

        return ((this.usableIF_p & ConnectionIFType.IF_EPOSDISPLAY) == ConnectionIFType.IF_EPOSDISPLAY)

    }

    registIFAccessResult(type: ConnectionIFType, code: ConnectionAccessResult) {

        if (code === ConnectionAccessResult.OK) {
            this.changeStatus(type, ConnectionStatus.CONNECT)
            this.usableIF_p |= type
        }

        if (type === ConnectionIFType.IF_EPOSDEVICE) {

            let result = ConnectionProbeResult.ERROR_PARAMETER

            if (this.usableIF_p & ConnectionIFType.IF_ALL) {
                if (this.protocol_p == 'http') {
                    result = ConnectionProbeResult.OK
                } else {
                    result = ConnectionProbeResult.SSL_CONNECT_OK
                }
            }

            if (code === ConnectionAccessResult.TIMEOUT)
                result = ConnectionProbeResult.ERROR_TIMEOUT

            if (this.callback_p !== null) {

                try {

                    this.callback_p(result)

                } catch { }

                this.callback_p = null

            }

        }
    }

}