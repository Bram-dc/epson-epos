import ePOSBuilder from './ePOSBuilder'

export default class ValidationPrinter extends ePOSBuilder {
    private parent: HybridPrinter

    private timeout = 10000
    private waitTime = 500

    constructor(parent: HybridPrinter) {
        super()

        this.parent = parent

    }

    send(...args: string[]) {
        let xml: string | null = null
        if (args.length < 1) {
            xml = this.toString()
        } else {
            xml = args[1]
        }
        if ((typeof (this.timeout) !== 'number') || (this.timeout < 5000) || (this.timeout > 1000000)) {
            this.timeout = 10000
        }
        const data = {
            type: 'validationprint2',
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

    waitInsertion(timeout?: number) {
        if ((typeof (timeout) !== 'number') || (timeout < 5000) || (timeout > 900000)) {
            this.timeout = 60000
        } else {
            this.timeout = timeout
        }
        let validationWaitTime = this.waitTime
        if ((typeof (this.waitTime) != 'number') || (this.waitTime < 0) || (this.waitTime > 6400)) {
            validationWaitTime = 500
        }
        const data = {
            type: 'validationwaitinsertion',
            timeout: this.timeout,
            waittime: validationWaitTime,
        }
        return this.parent.send(data)
    }

    cancel() {
        const data = {
            type: 'validationcancel',
        }
        return this.parent.send(data)
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
            case 'validationprint2':
                eventtype = 'send'
                break
            case 'validationcancel':
                eventtype = 'cancel'
                break
            case 'validationwaitinsertion':
                eventtype = 'waitinsertion'
                break
            default:
                break
        }
        this.onreceive({
            eventtype: eventtype,
            success: res.success,
            code: res.code,
            status: res.status,
        }, sq)
    }

}