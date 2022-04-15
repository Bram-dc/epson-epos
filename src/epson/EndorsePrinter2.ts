import EndorsePrinter from './EndorsePrinter'

export default class EndorsePrinter2 extends EndorsePrinter {
    parent: HybridPrinter2
    mode40cpl = false
    timeout = 60000
    waitTime = 500

    constructor(parent: HybridPrinter2) {
        super(parent)

        this.parent = parent

    }

}

EndorsePrinter2.prototype.send = function () {
    let xml = null
    if (arguments.length < 1) {
        xml = this.toString()
    } else {
        xml = arguments[1]
    }
    if ((typeof (this.timeout) != 'number') || (this.timeout < 60000) || (this.timeout > 900000)) {
        this.timeout = 60000
    }
    const data = {
        type: 'endorseprint2',
        is40cplmode: this.mode40cpl,
        timeout: this.timeout,
        printdata: xml,
    }
    const sequence = this.parent.send(data)
    this.setXmlString('')
    return sequence
}
EndorsePrinter2.prototype.setXmlString = function (xml) {
    this.message = xml
}
EndorsePrinter2.prototype.getXmlString = function () {
    return this.message
}
EndorsePrinter2.prototype.waitInsertion = function (timeout) {
    if ((typeof (timeout) != 'number') || (timeout < 5000) || (timeout > 900000)) {
        this.timeout = 60000
    } else {
        this.timeout = timeout
    }
    let endorseWaitTime = this.waitTime
    if ((typeof (this.waitTime) != 'number') || (this.waitTime < 0) || (this.waitTime > 6400)) {
        endorseWaitTime = 500
    }
    const data = {
        type: 'endorsewaitinsertion',
        timeout: this.timeout,
        waittime: endorseWaitTime,
    }
    return this.parent.send(data)
}
EndorsePrinter2.prototype.cancel = function () {
    const data = {
        type: 'endorsecancel',
    }
    return this.parent.send(data)
}
EndorsePrinter2.prototype.enable40cplmode = function (flag) {
    this.mode40cpl = flag
}
EndorsePrinter2.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    if (res == null) {
        return
    }
    let eventtype = ''
    switch (res.eventtype) {
        case 'endorseprint2':
            eventtype = 'send'
            break
        case 'endorsecancel':
            eventtype = 'cancel'
            break
        case 'endorsewaitinsertion':
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