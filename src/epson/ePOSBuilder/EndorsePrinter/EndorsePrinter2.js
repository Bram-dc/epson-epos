function EndorsePrinter2(parent) {
    this.parent = parent
    this.mode40cpl = false
}
EndorsePrinter2.prototype = new EndorsePrinter()
EndorsePrinter2.prototype.timeout = 60000
EndorsePrinter2.prototype.waitTime = 500
EndorsePrinter2.prototype.send = function () {
    var xml = null
    if (arguments.length < 1) {
        xml = this.toString()
    } else {
        xml = arguments[1]
    }
    if ((typeof (this.timeout) != "number") || (this.timeout < 60000) || (this.timeout > 900000)) {
        this.timeout = 60000
    }
    var data = {
        type: "endorseprint2",
        is40cplmode: this.mode40cpl,
        timeout: this.timeout,
        printdata: xml
    }
    var sequence = this.parent.send(data)
    this.setXmlString("")
    return sequence
}
EndorsePrinter2.prototype.setXmlString = function (xml) {
    this.message = xml
}
EndorsePrinter2.prototype.getXmlString = function () {
    return this.message
}
EndorsePrinter2.prototype.waitInsertion = function (timeout) {
    if ((typeof (timeout) != "number") || (timeout < 5000) || (timeout > 900000)) {
        this.timeout = 60000
    } else {
        this.timeout = timeout
    }
    var endorseWaitTime = this.waitTime
    if ((typeof (this.waitTime) != "number") || (this.waitTime < 0) || (this.waitTime > 6400)) {
        endorseWaitTime = 500
    }
    var data = {
        type: "endorsewaitinsertion",
        timeout: this.timeout,
        waittime: endorseWaitTime
    }
    return this.parent.send(data)
}
EndorsePrinter2.prototype.cancel = function () {
    var data = {
        type: "endorsecancel"
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
    var eventtype = ""
    switch (res.eventtype) {
        case "endorseprint2":
            eventtype = "send"
            break
        case "endorsecancel":
            eventtype = "cancel"
            break
        case "endorsewaitinsertion":
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