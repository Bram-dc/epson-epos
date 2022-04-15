import ePOSBuilder from './ePOSBuilder'

export default class EndorsePrinter extends ePOSBuilder {
    parent: HybridPrinter
    mode40cpl = false
    timeout = 60000

    constructor(parent: HybridPrinter) {
        super()

        this.parent = parent

    }

    send() {

        const xml = (arguments.length < 1) ? this.toString() : arguments[1]

        const data = {
            type: 'endorseprint',
            is40cplmode: this.mode40cpl,
            timeout: this.timeout,
            printdata: xml,
        }

        const sequence = this.parent.send(data)

        this.setXmlString('')

        return sequence

    }

    setXmlString(xml: string) {

        this.message = xml

    }

    getXmlString() {

        return this.message

    }

    cancel() {

        const data = {
            type: 'endorsecancel',
        }

        return this.parent.send(data)

    }

    enable40cplmode(flag: boolean) {

        this.mode40cpl = flag

    }

    fireOnReceive(res, sq) {
        if (this.onreceive == null) {
            return
        }
        if (res == null) {
            return
        }
        let eventtype = ''
        switch (res.eventtype) {
            case 'endorseprint':
                eventtype = 'send'
                break
            case 'endorsecancel':
                eventtype = 'cancel'
                break
            default:
                break
        }
        let code = res.code
        if (code == 'EX_ENPC_TIMEOUT') {
            code = 'ERROR_DEVICE_BUSY'
        }
        this.onreceive({
            eventtype: eventtype,
            success: res.success,
            code: code,
            status: res.status,
        }, sq)
    }

}