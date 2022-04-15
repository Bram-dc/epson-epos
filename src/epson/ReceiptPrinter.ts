export default class ReceiptPrinter extends Printer {
    this.parent = parent
this.methodName = ''
this.deviceID = this.parent.deviceID
this.ePosDev = this.parent.ePosDev
this.connectionObj = null


}




function ReceiptPrinter(parent) {
    this.parent = parent
    this.methodName = ''
    this.deviceID = this.parent.deviceID
    this.ePosDev = this.parent.ePosDev
    this.connectionObj = null
}
ReceiptPrinter.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj
}
ReceiptPrinter.prototype = new Printer()
ReceiptPrinter.prototype.send = function () {
    if (this.methodName == '') {
        this.methodName = 'send'
    }
    return Printer.prototype.send.apply(this, arguments)
}
ReceiptPrinter.prototype.print = function (canvas, cut, mode) {
    this.methodName = 'print'
    return Printer.prototype.print.apply(this, arguments)
}
ReceiptPrinter.prototype.recover = function () {
    this.methodName = 'recover'
    return Printer.prototype.recover.apply(this, arguments)
}
ReceiptPrinter.prototype.reset = function () {
    this.methodName = 'reset'
    return Printer.prototype.reset.apply(this, arguments)
}
ReceiptPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    var eventtype = this.methodName
    var success = 'false'
    var code = ''
    var status = this.ASB_NO_RESPONSE
    if (res) {
        var xml = res.resultdata
        success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml)
        xml.match(/code\s*=\s*"\s*(\S*)\s*"/)
        code = RegExp.$1
        if (code == '') {
            code = (success) ? 'SUCCESS' : 'ERROR_DEVICE_NOT_FOUND'
        }
        xml.match(/status\s*=\s*"\s*(\d+)\s*"/)
        status = parseInt(RegExp.$1)
    }
    if (code == 'EX_ENPC_TIMEOUT') {
        code = 'ERROR_DEVICE_BUSY'
    }
    this.onreceive({
        eventtype: eventtype,
        success: success,
        code: code,
        status: status,
    }, sq)
    this.methodName = ''
}