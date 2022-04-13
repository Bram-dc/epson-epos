function SlipPrinter2(parent) {
    this.parent = parent
}
SlipPrinter2.prototype = new SlipPrinter()
SlipPrinter2.prototype.timeout = 60000
SlipPrinter2.prototype.waitTime = 500
SlipPrinter2.prototype.send = function () {
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
        type: "slipprint2",
        timeout: this.timeout,
        printdata: xml
    }
    var sequence = this.parent.send(data)
    this.setXmlString("")
    return sequence
}
SlipPrinter2.prototype.setXmlString = function (xml) {
    this.message = xml
}
SlipPrinter2.prototype.getXmlString = function () {
    return this.message
}
SlipPrinter2.prototype.waitInsertion = function (timeout) {
    if ((typeof (timeout) != "number") || (timeout < 5000) || (timeout > 900000)) {
        this.timeout = 60000
    } else {
        this.timeout = timeout
    }
    var slipWaitTime = this.waitTime
    if ((typeof (this.waitTime) != "number") || (this.waitTime < 0) || (this.waitTime > 6400)) {
        slipWaitTime = 500
    }
    var data = {
        type: "slipwaitinsertion",
        timeout: this.timeout,
        waittime: slipWaitTime
    }
    return this.parent.send(data)
}
SlipPrinter2.prototype.cancel = function () {
    var data = {
        type: "slipcancel"
    }
    return this.parent.send(data)
}
SlipPrinter2.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    if (res == null) {
        return
    }
    var eventtype = ""
    switch (res.eventtype) {
        case "slipprint2":
            eventtype = "send"
            break
        case "slipcancel":
            eventtype = "cancel"
            break
        case "slipwaitinsertion":
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