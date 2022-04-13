function MICRReader(parent) {
    this.parent = parent
    this.timeout = 60000
    this.FONT_E13B = "MICR_E13B"
    this.FONT_CMC7 = "MICR_CMC7"
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
    this.EMICR_ILLEGAL_LENGTH = "EMICR_ILLEGAL_LENGTH"
    this.EMICR_NO_MICR = "EMICR_NO_MICR"
    this.EMICR_RECOGNITION = "EMICR_RECOGNITION"
    this.EMICR_READ = "EMICR_READ"
    this.EMICR_NOISE_DETECTED = "EMICR_NOISE_DETECTED"
    this.EMICR_COVER_OPENED = "EMICR_COVER_OPENED"
    this.EMICR_PAPER_JAM = "EMICR_PAPER_JAM"
}
MICRReader.prototype.read = function (ignoreerror, font) {
    var data = {
        type: "micrread",
        ignoreerror: ignoreerror,
        font: font,
        timeout: this.timeout
    }
    return this.parent.send(data)
}
MICRReader.prototype.cleaning = function () {
    var data = {
        type: "micrcleaning",
        timeout: this.timeout
    }
    return this.parent.send(data)
}
MICRReader.prototype.cancel = function () {
    var data = {
        type: "micrcancel"
    }
    return this.parent.send(data)
}
MICRReader.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
        return
    }
    if (res == null) {
        return
    }
    var eventtype = ""
    switch (res.eventtype) {
        case "micrread":
            eventtype = "read"
            break
        case "micrcleaning":
            eventtype = "cleaning"
            break
        case "micrcancel":
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
        status: res.status,
        data: res.data
    }, sq)
}