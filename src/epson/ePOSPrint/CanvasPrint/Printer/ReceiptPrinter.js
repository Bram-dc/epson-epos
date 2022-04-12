function ReceiptPrinter(parent) {
    this.parent = parent
    this.methodName = ""
    this.deviceID = this.parent.deviceID
    this.ePosDev = this.parent.ePosDev
    this.connectionObj = null
    this.SUCCESS = "SUCCESS"
    this.CANCEL = "CANCEL"
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER"
    this.ERROR_COMMAND = "ERROR_COMMAND"
    this.ERROR_DEVICE_NOT_FOUND = "DeviceNotFound"
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY"
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED"
    this.ERROR_COVER_OPEN = "EPTR_COVER_OPEN"
    this.ERROR_TIMEOUT = "EX_TIMEOUT"
    this.ERROR_AUTOMATICAL = "EPTR_AUTOMATICAL"
    this.ERROR_UNRECOVERABLE = "EPTR_UNRECOVERABLE"
    this.ERROR_BADPORT = "EX_BADPORT"
    this.SYSTEM_ERROR = "SYSTEM_ERROR"
    this.EPTR_CUTTER = "EPTR_CUTTER"
    this.EPTR_MECHANICAL = "EPTR_MECHANICAL"
    this.EPTR_REC_EMPTY = "EPTR_REC_EMPTY"
    this.EPTR_SCHEMAERROR = "SchemaError"
    this.EPTR_PRINT_SYSTEM_ERROR = "PrintSystemError"
}
ReceiptPrinter.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj
}
ReceiptPrinter.prototype = new Printer()
ReceiptPrinter.prototype.send = function () {
    if (this.methodName == "") {
        this.methodName = "send"
    }
    return Printer.prototype.send.apply(this, arguments)
}
ReceiptPrinter.prototype.print = function (canvas, cut, mode) {
    this.methodName = "print"
    return Printer.prototype.print.apply(this, arguments)
}
ReceiptPrinter.prototype.recover = function () {
    this.methodName = "recover"
    return Printer.prototype.recover.apply(this, arguments)
}
ReceiptPrinter.prototype.reset = function () {
    this.methodName = "reset"
    return Printer.prototype.reset.apply(this, arguments)
}
ReceiptPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    var eventtype = this.methodName
    var success = "false"
    var code = ""
    var status = this.ASB_NO_RESPONSE
    if (res) {
        var xml = res.resultdata
        success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml)
        xml.match(/code\s*=\s*"\s*(\S*)\s*"/)
        code = RegExp.$1
        if (code == "") {
            code = (success) ? "SUCCESS" : "ERROR_DEVICE_NOT_FOUND"
        }
        xml.match(/status\s*=\s*"\s*(\d+)\s*"/)
        status = parseInt(RegExp.$1)
    }
    if (code == "EX_ENPC_TIMEOUT") {
        code = "ERROR_DEVICE_BUSY"
    }
    this.onreceive({
        eventtype: eventtype,
        success: success,
        code: code,
        status: status
    }, sq)
    this.methodName = ""
}