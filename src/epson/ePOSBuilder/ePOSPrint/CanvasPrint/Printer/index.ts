import CanvasPrint from '..'

export default class Printer extends CanvasPrint {
    deviceID?: string
    isCrypto?: boolean
    ePosDev?: any
    timeout = 10000

    constructor(deviceID?: string, isCrypto?: boolean, ePOSDeviceContext?: any) {
        super()

        this.deviceID = deviceID
        this.isCrypto = isCrypto
        this.ePosDev = ePOSDeviceContext

    }

}


function Printer(deviceID, isCrypto, ePOSDeviceContext) {
    deviceID = deviceID
    isCrypto = isCrypto
    ePosDev = ePOSDeviceContext
    timeout = 10000
}
Printer.prototype = new CanvasPrint()
Printer.prototype.finalize = function () {
    this.stopMonitor()
}
Printer.prototype.toString = function () {
    var str = ePOSBuilder.prototype.toString.apply(this)
    return str
}
Printer.prototype.addFeedUnit = function (unit) {
    try {
        ePOSBuilder.prototype.addFeedUnit.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addFeedLine = function (line) {
    try {
        ePOSBuilder.prototype.addFeedLine.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addFeed = function (unit) {
    try {
        ePOSBuilder.prototype.addFeed.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addFeedPosition = function (line) {
    try {
        ePOSBuilder.prototype.addFeedPosition.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addText = function (text) {
    try {
        ePOSBuilder.prototype.addText.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextLang = function (lang) {
    try {
        ePOSBuilder.prototype.addTextLang.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextAlign = function (align) {
    try {
        ePOSBuilder.prototype.addTextAlign.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextRotate = function (rotate) {
    try {
        ePOSBuilder.prototype.addTextRotate.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextLineSpace = function (linespc) {
    try {
        ePOSBuilder.prototype.addTextLineSpace.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextFont = function (font) {
    try {
        ePOSBuilder.prototype.addTextFont.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextSmooth = function (smooth) {
    try {
        ePOSBuilder.prototype.addTextSmooth.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextDouble = function (dw, dh) {
    try {
        ePOSBuilder.prototype.addTextDouble.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextSize = function (width, height) {
    try {
        ePOSBuilder.prototype.addTextSize.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextStyle = function (reverse, ul, em, color) {
    try {
        ePOSBuilder.prototype.addTextStyle.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextPosition = function (x) {
    try {
        ePOSBuilder.prototype.addTextPosition.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addTextVPosition = function (y) {
    try {
        ePOSBuilder.prototype.addTextVPosition.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addImage = function (context, x, y, width, height, color, mode) {
    try {
        ePOSBuilder.prototype.addImage.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addLogo = function (key1, key2) {
    try {
        ePOSBuilder.prototype.addLogo.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addBarcode = function (barCodeData, type, hri, font, width, height) {
    try {
        ePOSBuilder.prototype.addBarcode.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addSymbol = function (symbolData, type, level, width, height, size) {
    try {
        ePOSBuilder.prototype.addSymbol.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addCommand = function (data) {
    try {
        ePOSBuilder.prototype.addCommand.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addHLine = function (x1, x2, style) {
    try {
        ePOSBuilder.prototype.addHLine.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addVLineBegin = function (x, style) {
    try {
        ePOSBuilder.prototype.addVLineBegin.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addVLineEnd = function (x, style) {
    try {
        ePOSBuilder.prototype.addVLineEnd.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPageBegin = function () {
    try {
        ePOSBuilder.prototype.addPageBegin.apply(this)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPageEnd = function () {
    try {
        ePOSBuilder.prototype.addPageEnd.apply(this)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPageArea = function (x, y, width, height) {
    try {
        ePOSBuilder.prototype.addPageArea.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPageDirection = function (dir) {
    try {
        ePOSBuilder.prototype.addPageDirection.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPagePosition = function (x, y) {
    try {
        ePOSBuilder.prototype.addPagePosition.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPageLine = function (x1, y1, x2, y2, style) {
    try {
        ePOSBuilder.prototype.addPageLine.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
    try {
        ePOSBuilder.prototype.addPageRectangle.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addRotateBegin = function () {
    try {
        ePOSBuilder.prototype.addRotateBegin.apply(this)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addRotateEnd = function () {
    try {
        ePOSBuilder.prototype.addRotateEnd.apply(this)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addCut = function (type) {
    try {
        ePOSBuilder.prototype.addCut.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addPulse = function (drawer, time) {
    try {
        ePOSBuilder.prototype.addPulse.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addSound = function (pattern, repeat, cycle) {
    try {
        ePOSBuilder.prototype.addSound.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.addLayout = function (type, width, height, margin_top, margin_bottom, offset_cut, offset_label) {
    try {
        ePOSBuilder.prototype.addLayout.apply(this, arguments)
    } catch (e) {
        throw e
    }
    return this
}
Printer.prototype.setXmlString = function (xml) {
    this.message = xml
}
Printer.prototype.getXmlString = function () {
    return this.message
}
Printer.prototype.getPrintJobStatus = function (printjobid) {
    this.setXmlString("")
    this.send(printjobid)
}
Printer.prototype.send = function (printjobid) {
    var sq = -1
    if ((!this.ePosDev.eposprint) && (this.connectionObj.isUsableDeviceIF())) {
        try {
            var data = {
                type: "print",
                timeout: this.timeout,
                printdata: this.toString()
            }
            switch (arguments.length) {
                case 0:
                    data.printdata = this.toString()
                    break
                case 1:
                    data.printdata = this.toString()
                    data.printjobid = printjobid
                    break
                case 2:
                case 3:
                    data.printdata = arguments[1]
                    data.printjobid = arguments[2]
            }
            var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
            var sequence = -1
            try {
                this.connectionObj.emit(eposmsg)
                sequence = eposmsg.sequence
            } catch (e) { }
            this.force = false
            this.setXmlString("")
        } catch (e) {
            sq = -1
        }
    } else {
        var self = this,
            address = this.connectionObj.getAddressWithProtocol() + "/cgi-bin/epos/service.cgi?devid=" + this.deviceID + "&timeout=" + this.timeout,
            soap, xhr, tid, res, success, code, status, battery
        soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
        if (printjobid) {
            soap += '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' + printjobid + "</printjobid></parameter></s:Header>"
        }
        soap += "<s:Body>" + this.toString() + "</s:Body></s:Envelope>"
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
            if (!("withCredentials" in xhr) && window.XDomainRequest) {
                xhr = new XDomainRequest()
                xhr.open("POST", address, true)
                xhr.onload = function () {
                    res = xhr.responseText
                    if (/response/.test(res)) {
                        success = /success\s*=\s*"\s*(1|true)\s*"/.test(res)
                        code = res.match(/code\s*=\s*"\s*(\S*)\s*"/) ? RegExp.$1 : ""
                        status = res.match(/status\s*=\s*"\s*(\d+)\s*"/) ? parseInt(RegExp.$1) : 0
                        battery = res.match(/battery\s*=\s*"\s*(\d+)\s*"/) ? parseInt(RegExp.$1) : 0
                        printjobid = res.match(/<printjobid>\s*(\S*)\s*<\/printjobid>/) ? RegExp.$1 : ""
                        self.fireReceiveEvent(success, code, status, battery, printjobid, 0)
                    } else {
                        self.fireErrorEvent(0, xhr.responseText, 0)
                    }
                }
                xhr.onerror = function () {
                    self.fireErrorEvent(0, xhr.responseText, 0)
                }
                xhr.onprogress = function () { }
                xhr.ontimeout = xhr.onerror
                xhr.timeout = self.timeout
                xhr.send(soap)
            } else {
                xhr.open("POST", address, true)
                xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
                xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jan 1970 00:00:00 GMT")
                xhr.setRequestHeader("SOAPAction", '""')
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        clearTimeout(tid)
                        if (xhr.status == 200 && xhr.responseXML) {
                            res = xhr.responseXML.getElementsByTagName("response")
                            if (res.length > 0) {
                                success = /^(1|true)$/.test(res[0].getAttribute("success"))
                                code = res[0].hasAttribute("code") ? res[0].getAttribute("code") : ""
                                status = res[0].hasAttribute("status") ? parseInt(res[0].getAttribute("status")) : 0
                                battery = res[0].hasAttribute("battery") ? parseInt(res[0].getAttribute("battery")) : 0
                                res = xhr.responseXML.getElementsByTagName("printjobid")
                                printjobid = res.length > 0 ? res[0].textContent : ""
                                self.fireReceiveEvent(success, code, status, battery, printjobid, 0)
                            } else {
                                self.fireErrorEvent(xhr.status, xhr.responseText, 0)
                            }
                        } else {
                            self.fireErrorEvent(xhr.status, xhr.responseText, 0)
                        }
                    }
                }
                tid = setTimeout(function () {
                    xhr.abort()
                }, this.timeout)
                xhr.send(soap)
            }
            this.setXmlString("")
        } else {
            throw new Error("XMLHttpRequest is not supported")
        }
        sq = 0
    }
    return sq
}
Printer.prototype.client_onxmlresult = function (res, sq) {
    if (res) {
        var xml = res.resultdata
        var success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml)
        xml.match(/code\s*=\s*"\s*(\S*)\s*"/)
        var code = RegExp.$1
        xml.match(/status\s*=\s*"\s*(\d+)\s*"/)
        var status = parseInt(RegExp.$1)
        xml.match(/battery\s*=\s*"\s*(\d+)\s*"/)
        var battery = parseInt(RegExp.$1)
        this.fireReceiveEvent(success, code, status, battery, res.printjobid, sq)
    } else {
        this.fireErrorEvent(0, this.ASB_NO_RESPONSE, sq)
    }
}
Printer.prototype.startMonitor = function () {
    var result = false
    var address = this.connectionObj.getAddressWithProtocol() + "/cgi-bin/epos/service.cgi?devid=" + this.deviceID + "&timeout=10000"
    try {
        if (!this.enabled) {
            this.address = address
            this.enabled = true
            this.status = this.ASB_DRAWER_KICK
            this.sendStartMonitorCommand()
        }
        result = true
    } catch (e) {
        throw e
    }
    return result
}
Printer.prototype.sendStartMonitorCommand = function () {
    var self = this
    var address = this.address
    var request = new ePOSBuilder().toString()
    var soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' + request + "</s:Body></s:Envelope>"
    var epos = this
    if (window.XDomainRequest) {
        var xdr = new XDomainRequest()
        xdr.open("POST", address, true)
        xdr.onload = function () {
            var res = xdr.responseText
            if (/response/.test(res)) {
                var success = /success\s*=\s*"\s*(1|true)\s*"/.test(res)
                res.match(/code\s*=\s*"\s*(\S*)\s*"/)
                var code = RegExp.$1
                res.match(/status\s*=\s*"\s*(\d+)\s*"/)
                var status = parseInt(RegExp.$1)
                res.match(/battery\s*=\s*"\s*(\d+)\s*"/)
                var battery = parseInt(RegExp.$1)
                self.fireStatusEvent(epos, status, battery)
            } else {
                self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
            }
            self.updateStatus(epos)
        }
        xdr.onerror = function () {
            self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE)
            self.updateStatus(epos)
        }
        xdr.onprogress = function () { }
        xdr.ontimeout = xdr.onerror
        xdr.send(soap)
    } else {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest()
            xhr.open("POST", address, true)
            xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
            xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jan 1970 00:00:00 GMT")
            xhr.setRequestHeader("SOAPAction", '""')
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 && xhr.responseXML) {
                        var res = xhr.responseXML.getElementsByTagName("response")
                        if (res.length > 0) {
                            var success = /^(1|true)$/.test(res[0].getAttribute("success"))
                            var code = res[0].getAttribute("code")
                            var status = parseInt(res[0].getAttribute("status"))
                            var battery = res[0].hasAttribute("battery") ? parseInt(res[0].getAttribute("battery")) : 0
                            self.fireStatusEvent(epos, status, battery)
                        } else {
                            self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                        }
                    } else {
                        self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                    }
                    self.updateStatus(epos)
                }
            }
            xhr.send(soap)
        } else {
            throw new Error("XMLHttpRequest is not supported")
        }
    }
}
Printer.prototype.stopMonitor = function () {
    var result = false
    try {
        this.enabled = false
        if (this.timeoutid) {
            clearTimeout(this.timeoutid)
            delete this.timeoutid
        }
        result = true
    } catch (e) {
        throw e
    }
    return result
}
Printer.prototype.fireReceiveEvent = function (success, code, status, battery, printjobid, sq) {
    delete this.isPrint
    if (code == "EX_ENPC_TIMEOUT") {
        code = "ERROR_DEVICE_BUSY"
    }
    if (this.onreceive) {
        this.onreceive({
            success: success,
            code: code,
            status: status,
            battery: battery,
            printjobid: printjobid
        }, sq)
    }
}
Printer.prototype.fireErrorEvent = function (status, responseText, sq) {
    if (this.onerror) {
        this.onerror({
            status: status,
            responseText: responseText
        }, sq)
    }
    this.ePosDev.cleanup()
}
Printer.prototype.fireStatusEvent = function (epos, status, battery) {
    if (status == 0 || status == this.ASB_NO_RESPONSE) {
        status = this.status | this.ASB_NO_RESPONSE
    }
    var diff = this.status == this.ASB_DRAWER_KICK ? ~0 : this.status ^ status
    var difb = this.status == 0 ? ~0 : this.battery ^ battery
    this.status = status
    this.battery = battery
    if (diff && this.onstatuschange) {
        this.onstatuschange(status)
    }
    if (difb && this.onbatterystatuschange) {
        this.onbatterystatuschange(battery)
    }
    if (diff & (this.ASB_NO_RESPONSE | this.ASB_OFF_LINE)) {
        if (status & this.ASB_NO_RESPONSE) {
            if (this.onpoweroff) {
                this.onpoweroff()
            }
        } else {
            if (status & this.ASB_OFF_LINE) {
                if (this.onoffline) {
                    this.onoffline()
                }
            } else {
                if (this.ononline) {
                    this.ononline()
                }
            }
        }
    }
    if (diff & this.ASB_COVER_OPEN) {
        if (status & this.ASB_NO_RESPONSE) { } else {
            if (status & this.ASB_COVER_OPEN) {
                if (this.oncoveropen) {
                    this.oncoveropen()
                }
            } else {
                if (this.oncoverok) {
                    this.oncoverok()
                }
            }
        }
    }
    if (diff & (this.ASB_RECEIPT_END | this.ASB_RECEIPT_NEAR_END)) {
        if (status & this.ASB_NO_RESPONSE) { } else {
            if (status & this.ASB_RECEIPT_END) {
                if (this.onpaperend) {
                    this.onpaperend()
                }
            } else {
                if (status & this.ASB_RECEIPT_NEAR_END) {
                    if (this.onpapernearend) {
                        this.onpapernearend()
                    }
                } else {
                    if (this.onpaperok) {
                        this.onpaperok()
                    }
                }
            }
        }
    }
    if (diff & this.ASB_DRAWER_KICK) {
        if (status & this.ASB_NO_RESPONSE) { } else {
            if (status & this.ASB_DRAWER_KICK) {
                if (this.drawerOpenLevel == this.DRAWER_OPEN_LEVEL_HIGH) {
                    if (this.ondraweropen) {
                        this.ondraweropen()
                    }
                } else {
                    if (this.ondrawerclosed) {
                        this.ondrawerclosed()
                    }
                }
                if (this.onbatterylow) {
                    this.onbatterylow()
                }
            } else {
                if (this.drawerOpenLevel == this.DRAWER_OPEN_LEVEL_HIGH) {
                    if (this.ondrawerclosed) {
                        this.ondrawerclosed()
                    }
                } else {
                    if (this.ondraweropen) {
                        this.ondraweropen()
                    }
                }
                if (this.onbatteryok) {
                    this.onbatteryok()
                }
            }
        }
    }
}
Printer.prototype.updateStatus = function () {
    var self = this
    if (this.enabled) {
        var delay = this.interval
        if (isNaN(delay) || delay < 1000) {
            delay = 3000
        }
        this.timeoutid = setTimeout(function () {
            delete self.timeoutid
            if (self.enabled) {
                self.sendStartMonitorCommand()
            }
        }, delay)
    }
}
Printer.prototype.print = function (canvas, cut, mode, printjobid) {
    try {
        CanvasPrint.prototype.print.apply(this, arguments)
    } catch (e) {
        throw e
    }
}
Printer.prototype.reset = function () {
    try {
        CanvasPrint.prototype.reset.apply(this, arguments)
    } catch (e) {
        throw e
    }
}
Printer.prototype.recover = function () {
    try {
        CanvasPrint.prototype.recover.apply(this, arguments)
    } catch (e) {
        throw e
    }
}