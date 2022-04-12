function EndorsePrinter(parent) {
    this.parent = parent
    this.mode40cpl = false
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
EndorsePrinter.prototype = new ePOSBuilder()
EndorsePrinter.prototype.timeout = 60000
EndorsePrinter.prototype.send = function () {
    var xml = (arguments.length < 1) ? this.toString() : arguments[1]
    var data = {
        type: "endorseprint",
        is40cplmode: this.mode40cpl,
        timeout: this.timeout,
        printdata: xml
    }
    var sequence = this.parent.send(data)
    this.setXmlString("")
    return sequence
}
EndorsePrinter.prototype.setXmlString = function (xml) {
    this.message = xml
}
EndorsePrinter.prototype.getXmlString = function () {
    return this.message
}
EndorsePrinter.prototype.cancel = function () {
    var data = {
        type: "endorsecancel"
    }
    return this.parent.send(data)
}
EndorsePrinter.prototype.enable40cplmode = function (flag) {
    this.mode40cpl = flag
}
EndorsePrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    if (res == null) {
        return
    }
    var eventtype = ""
    switch (res.eventtype) {
        case "endorseprint":
            eventtype = "send"
            break
        case "endorsecancel":
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