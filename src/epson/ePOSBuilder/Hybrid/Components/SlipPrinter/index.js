function SlipPrinter(parent) {
    this.parent = parent
    this.SUCCESS = "SUCCESS"
    this.CANCEL = "CANCEL"
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER"
    this.ERROR_COMMAND = "ERROR_COMMAND"
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND"
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY"
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED"
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN"
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT"
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL"
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE"
    this.ERROR_BADPORT = "ERROR_BADPORT"
    this.SYSTEM_ERROR = "SYSTEM_ERROR"
    this.EPTR_CUTTER = "EPTR_CUTTER"
    this.EPTR_MECHANICAL = "EPTR_MECHANICAL"
    this.EPTR_REC_EMPTY = "EPTR_REC_EMPTY"
    this.EPTR_SCHEMAERROR = "EPTR_SCHEMAERROR"
    this.EPTR_PRINT_SYSTEM_ERROR = "EPTR_PRINT_SYSTEM_ERROR"
}
SlipPrinter.prototype = new ePOSBuilder()
SlipPrinter.prototype.timeout = 60000
SlipPrinter.prototype.send = function () {
    var xml = (arguments.length < 1) ? this.toString() : arguments[1]
    var data = {
        type: "slipprint",
        timeout: this.timeout,
        printdata: xml
    }
    var sequence = this.parent.send(data)
    this.setXmlString("")
    return sequence
}
SlipPrinter.prototype.setXmlString = function (xml) {
    this.message = xml
}
SlipPrinter.prototype.getXmlString = function () {
    return this.message
}
SlipPrinter.prototype.cancel = function () {
    var data = {
        type: "slipcancel"
    }
    return this.parent.send(data)
}
SlipPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    if (res == null) {
        return
    }
    var eventtype = ""
    switch (res.eventtype) {
        case "slipprint":
            eventtype = "send"
            break
        case "slipcancel":
            eventtype = "cancel"
            break
        default:
            break
    }
    var code = res.code
    if (code == "EX_ENPC_TIMEOUT") {
        code = "ERROR_DEVICE_BUSY"
    }
    this.onreceive({
        eventtype: eventtype,
        success: res.success,
        code: code,
        status: res.status
    }, sq)
}