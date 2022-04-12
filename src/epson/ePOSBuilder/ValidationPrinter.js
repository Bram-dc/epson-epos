function ValidationPrinter(parent) {
    this.parent = parent
}
ValidationPrinter.prototype = new ePOSBuilder()
ValidationPrinter.prototype.timeout = 10000
ValidationPrinter.prototype.waitTime = 500
ValidationPrinter.prototype.send = function () {
    var xml = null
    if (arguments.length < 1) {
        xml = this.toString()
    } else {
        xml = arguments[1]
    }
    if ((typeof (this.timeout) != "number") || (this.timeout < 5000) || (this.timeout > 1000000)) {
        this.timeout = 10000
    }
    var data = {
        type: "validationprint2",
        timeout: this.timeout,
        printdata: xml
    }
    var sequence = this.parent.send(data)
    this.setXmlString("")
    return sequence
}
ValidationPrinter.prototype.setXmlString = function (xml) {
    this.message = xml
}
ValidationPrinter.prototype.getXmlString = function () {
    return this.message
}
ValidationPrinter.prototype.waitInsertion = function (timeout) {
    if ((typeof (timeout) != "number") || (timeout < 5000) || (timeout > 900000)) {
        this.timeout = 60000
    } else {
        this.timeout = timeout
    }
    var validationWaitTime = this.waitTime
    if ((typeof (this.waitTime) != "number") || (this.waitTime < 0) || (this.waitTime > 6400)) {
        validationWaitTime = 500
    }
    var data = {
        type: "validationwaitinsertion",
        timeout: this.timeout,
        waittime: validationWaitTime
    }
    return this.parent.send(data)
}
ValidationPrinter.prototype.cancel = function () {
    var data = {
        type: "validationcancel"
    }
    return this.parent.send(data)
}
ValidationPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    if (res == null) {
        return
    }
    var eventtype = ""
    switch (res.eventtype) {
        case "validationprint2":
            eventtype = "send"
            break
        case "validationcancel":
            eventtype = "cancel"
            break
        case "validationwaitinsertion":
            eventtype = "waitinsertion"
            break
        default:
            break
    }
    this.onreceive({
        eventtype: eventtype,
        success: res.success,
        code: res.code,
        status: res.status
    }, sq)
}