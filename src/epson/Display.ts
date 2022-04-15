function Display(deviceID, isCrypto, ePOSDeviceContext) {
    this.message = ''
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.ePosDev = ePOSDeviceContext
    this.timeout = 10000
    this.onreceive = null
    this.onerror = null
    this.ASB_NO_RESPONSE = 1
    this.ASB_DISPLAY_SUCCESS = 2
    this.SCROLL_OVERWRITE = 'overwrite'
    this.SCROLL_VERTICAL = 'v_scroll'
    this.SCROLL_HORIZONTAL = 'h_scroll'
    this.MOVE_TOP_LEFT = 'top_left'
    this.MOVE_TOP_RIGHT = 'top_right'
    this.MOVE_BOTTOM_LEFT = 'bottom_left'
    this.MOVE_BOTTOM_RIGHT = 'bottom_right'
    this.CURSOR_NONE = 'none'
    this.CURSOR_UNDERLINE = 'underline'
    this.BRIGHTNESS_20 = 20
    this.BRIGHTNESS_40 = 40
    this.BRIGHTNESS_60 = 60
    this.BRIGHTNESS_100 = 100
    this.MARQUEE_WALK = 'walk'
    this.MARQUEE_PLACE = 'place'
    this.connectionObj = null
    this.LAYOUT_MODE_1 = 1
    this.LAYOUT_MODE_2 = 2
    this.LAYOUT_MODE_3 = 3
    this.LAYOUT_MODE_4 = 4
    this.LAYOUT_MODE_5 = 5
    this.LAYOUT_MODE_6 = 6
    this.LAYOUT_MODE_7 = 7
    this.LAYOUT_MODE_8 = 8
    this.LAYOUT_MODE_9 = 9
    this.LAYOUT_MODE_10 = 10
    this.LAYOUT_MODE_11 = 11
    this.LAYOUT_MODE_12 = 12
    this.LAYOUT_MODE_13 = 13
    this.LAYOUT_MODE_14 = 14
    this.LAYOUT_MODE_15 = 15
    this.LANDSCAPE_LAYOUT_MODE_1 = 20
    this.LANDSCAPE_LAYOUT_MODE_2 = 22
    this.LANDSCAPE_LAYOUT_MODE_3 = 23
    this.LANDSCAPE_LAYOUT_MODE_4 = 24
    this.LANDSCAPE_LAYOUT_MODE_5 = 25
    this.PORTRAIT_LAYOUT_MODE_1 = 21
    this.PORTRAIT_LAYOUT_MODE_2 = 26
    this.PORTRAIT_LAYOUT_MODE_3 = 27
    this.PORTRAIT_LAYOUT_MODE_4 = 28
    this.PORTRAIT_LAYOUT_MODE_5 = 29
    this.PORTRAIT_LAYOUT_MODE_6 = 30
    this.PORTRAIT_LAYOUT_MODE_7 = 31
    this.EVEN_ROWS = 'even'
    this.ODD_ROWS = 'odd'
    this.ALL_ROWS = 'all'
    this.SYMBOL_QRCODE_MODEL_1 = 'qrcode_model_1'
    this.SYMBOL_QRCODE_MODEL_2 = 'qrcode_model_2'
    this.LEVEL_L = 'level_l'
    this.LEVEL_M = 'level_m'
    this.LEVEL_Q = 'level_q'
    this.LEVEL_H = 'level_h'
    this.LEVEL_DEFAULT = 'default'
}
Display.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj
}
Display.prototype.reset = function () {
    try {
        this.message += '<reset />'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.createWindow = function (number, x, y, width, hight, scrollMode) {
    try {
        var s = ''
        s += getIntAttr('number', number, 1, 4)
        s += getIntAttr('x', x, 1, 44)
        s += getIntAttr('y', y, 1, 19)
        s += getIntAttr('width', width, 1, 44)
        s += getIntAttr('height', hight, 1, 19)
        s += getEnumAttr('scrollmode', scrollMode, regexScrollMode)
        this.message += '<window' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.destroyWindow = function (number) {
    try {
        var s = ''
        s += getIntAttr('number', number, 1, 4)
        this.message += '<window' + s + ' destroy="true"/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.setCurrentWindow = function (number) {
    try {
        var s = ''
        s += getIntAttr('number', number, 1, 4)
        this.message += '<window' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.setCursorPosition = function () {
    try {
        var s = ''
        s += getIntAttr('x', arguments[0], 1, 44)
        s += getIntAttr('y', arguments[1], 1, 19)
        this.message += '<cursor' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.moveCursorPosition = function () {
    try {
        var s = ''
        s += getEnumAttr('moveto', arguments[0], regexMoveto)
        this.message += '<cursor' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.setCursorType = function (underline) {
    try {
        var s = ''
        s += getEnumAttr('type', underline, regexUnderline)
        this.message += '<cursor' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addText = function () {
    try {
        var s = ''
        switch (arguments.length) {
            case 1:
                break
            case 2:
                if (arguments[1] != undefined) {
                    s += ' lang="' + arguments[1] + '"'
                }
                break
            case 3:
                if ((arguments[1] != undefined) && (arguments[2] != undefined)) {
                    s += getIntAttr('x', arguments[1], 1, 44)
                    s += getIntAttr('y', arguments[2], 1, 19)
                }
                break
            case 4:
                if ((arguments[1] != undefined) && (arguments[2] != undefined)) {
                    s += getIntAttr('x', arguments[1], 1, 44)
                    s += getIntAttr('y', arguments[2], 1, 19)
                }
                if (arguments[3] != undefined) {
                    s += ' lang="' + arguments[3] + '"'
                }
                break
            case 7:
                if ((arguments[1] != undefined) && (arguments[2] != undefined)) {
                    s += getIntAttr('x', arguments[1], 1, 44)
                    s += getIntAttr('y', arguments[2], 1, 19)
                }
                if (arguments[3] != undefined) {
                    s += ' lang="' + arguments[3] + '"'
                }
                if ((arguments[4] != undefined) && (arguments[5] != undefined) && (arguments[6] != undefined)) {
                    var tmp = getIntAttr('r', arguments[4], 0, 255)
                    tmp = getIntAttr('g', arguments[5], 0, 255)
                    tmp = getIntAttr('b', arguments[6], 0, 255)
                    var rHex = ('00' + Number(arguments[4]).toString(16)).slice(-2)
                    var gHex = ('00' + Number(arguments[5]).toString(16)).slice(-2)
                    var bHex = ('00' + Number(arguments[6]).toString(16)).slice(-2)
                    var color = '#' + rHex + gHex + bHex
                    s += ' color="' + color + '"'
                }
                break
            default:
                throw new Error('Parameters are invalid')
                break
        }
        this.message += '<text' + s + '>' + escapeMarkup(arguments[0]) + '</text>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addReverseText = function () {
    try {
        var s = ''
        switch (arguments.length) {
            case 1:
                s += getBoolAttr('reverse', true)
                break
            case 2:
                s += ' lang="' + arguments[1] + '"'
                s += getBoolAttr('reverse', true)
                break
            case 3:
                s += getIntAttr('x', arguments[1], 1, 20)
                s += getIntAttr('y', arguments[2], 1, 2)
                s += getBoolAttr('reverse', true)
                break
            case 4:
                s += getIntAttr('x', arguments[1], 1, 20)
                s += getIntAttr('y', arguments[2], 1, 2)
                s += ' lang="' + arguments[3] + '"'
                s += getBoolAttr('reverse', true)
                break
            default:
                throw new Error('Parameters are invalid')
                break
        }
        this.message += '<text' + s + '>' + escapeMarkup(arguments[0]) + '</text>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.clearWindow = function () {
    try {
        this.message += '<clear/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.setBlink = function (interval) {
    try {
        var s = ''
        s += getUShortAttr('interval', interval)
        this.message += '<blink' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.setBrightness = function (value) {
    try {
        var s = ''
        s += getEnumAttr('value', value, regexBrightness)
        this.message += '<brightness' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addMarquee = function (text, format, uwait, rwait, repeat, lang) {
    try {
        var s = ''
        s += getEnumAttr('format', format, regexMarquee)
        s += getIntAttr('uwait', uwait, 0, 2000)
        s += getIntAttr('rwait', rwait, 100, 2000)
        s += getIntAttr('repeat', repeat, 0, 127)
        if ((typeof lang) !== 'undefined') {
            s += ' lang="' + lang + '"'
        }
        this.message += '<marquee' + s + '>' + escapeMarkup(text) + '</marquee>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.showClock = function () {
    try {
        this.message += '<clock/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addCommand = function (text) {
    try {
        this.message += '<command>' + toHexBinary(text) + '</command>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addCreateScreen = function (mode) {
    try {
        var s = ''
        s += getIntAttr('mode', mode, 1, 15)
        this.message += '<screen' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addCreateScreenCustom = function (mode, column, row) {
    try {
        var s = ''
        s += getIntAttr('mode', mode, 20, 31)
        s += getIntAttr('column', column, 1, 44)
        s += getIntAttr('row', row, 1, 19)
        this.message += '<screen' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addBackgroundColor = function (row, r, g, b) {
    try {
        var s = ''
        s += getEnumAttr('row', row, regexRow)
        var tmp = getIntAttr('r', r, 0, 255)
        tmp = getIntAttr('g', g, 0, 255)
        tmp = getIntAttr('b', b, 0, 255)
        var rHex = ('00' + Number(r).toString(16)).slice(-2)
        var gHex = ('00' + Number(g).toString(16)).slice(-2)
        var bHex = ('00' + Number(b).toString(16)).slice(-2)
        var color = '#' + rHex + gHex + bHex
        s += ' color="' + color + '"'
        this.message += '<backgroundcolor' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addStartSlideShow = function (interval) {
    try {
        var s = ''
        s += getIntAttr('interval', interval, 200, 51000)
        this.message += '<slideshow' + s + ' stop="false"/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addStopSlideShow = function () {
    try {
        this.message += '<slideshow stop="true"/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addSymbol = function (data, type, level, width, height, dotX, dotY, quietZone) {
    try {
        var s = ''
        s += getEnumAttr('type', type, regexSymbol)
        s += getEnumAttr('level', level, regexLevel)
        s += getIntAttr('width', width, 1, 255)
        s += getIntAttr('dotx', dotX, 0, 799)
        s += getIntAttr('doty', dotY, 0, 799)
        s += getEnumAttr('quietzone', quietZone, regexQuietZone)
        this.message += '<symbol' + s + '>' + escapeControl(escapeMarkup(data)) + '</symbol>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addDownloadImage = function (key1, key2, dotX, dotY, width, height) {
    try {
        var s = ''
        s += getIntAttr('key1', key1, 0, 255)
        s += getIntAttr('key2', key2, 0, 255)
        s += getIntAttr('dotx', dotX, 0, 799)
        s += getIntAttr('doty', dotY, 0, 799)
        s += getIntAttr('width', width, 0, 1440)
        s += getIntAttr('height', height, 0, 1440)
        this.message += '<downloadimage' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addRegisterDownloadImage = function (data, key1, key2) {
    try {
        var s = ''
        s += getIntAttr('key1', key1, 0, 255)
        s += getIntAttr('key2', key2, 0, 255)
        this.message += '<registerdownloadimage' + s + '>' + toBase64Binary(data) + '</registerdownloadimage>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addNVImage = function (key1, key2, dotX, dotY, width, height) {
    try {
        var s = ''
        s += getIntAttr('key1', key1, 0, 255)
        s += getIntAttr('key2', key2, 0, 255)
        s += getIntAttr('dotx', dotX, 0, 799)
        s += getIntAttr('doty', dotY, 0, 799)
        s += getIntAttr('width', width, 0, 1440)
        s += getIntAttr('height', height, 0, 1440)
        this.message += '<nvimage' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addClearImage = function () {
    try {
        this.message += '<clearimage/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.addClearSymbol = function () {
    try {
        this.message += '<clearsymbol/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.createTextArea = function (number, x, y, width, height, scrollMode) {
    try {
        var s = ''
        s += getIntAttr('number', number, 1, 4)
        s += getIntAttr('x', x, 1, 44)
        s += getIntAttr('y', y, 1, 19)
        s += getIntAttr('width', width, 1, 44)
        s += getIntAttr('height', height, 1, 19)
        s += getEnumAttr('scrollmode', scrollMode, regexScrollMode)
        this.message += '<textarea' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.destroyTextArea = function (number) {
    try {
        var s = ''
        s += getIntAttr('number', number, 1, 4)
        this.message += '<textarea' + s + ' destroy="true"/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.setCurrentTextArea = function (number) {
    try {
        var s = ''
        s += getIntAttr('number', number, 1, 4)
        this.message += '<textarea' + s + '/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.clearTextArea = function () {
    try {
        this.message += '<clear/>'
    } catch (e) {
        throw e
    }
    return this
}
Display.prototype.send = function () {
    var sq = -1
    if ((!this.ePosDev.eposprint) && (this.connectionObj.isUsableDeviceIF())) {
        try {
            var xml = this.toString()
            var data = {
                type: 'display',
                timeout: this.timeout,
                displaydata: xml,
            }
            var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
            this.connectionObj.emit(eposmsg)
            sq = eposmsg.sequence
            this.message = ''
        } catch (e) {
            sq = -1
        }
    } else {
        var self = this,
            address = this.connectionObj.getAddressWithProtocol() + '/cgi-bin/eposDisp/service.cgi?devid=' + this.deviceID + '&timeout=' + this.timeout,
            soap, xhr, tid, res, success, code, status
        res = {}
        soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
        soap += '<s:Body>' + this.toString() + '</s:Body></s:Envelope>'
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
            if (!('withCredentials' in xhr) && window.XDomainRequest) {
                xhr = new XDomainRequest()
                xhr.open('POST', address, true)
                xhr.onload = function () {
                    res = xhr.responseText
                    if (/response/.test(res)) {
                        success = /success\s*=\s*"\s*(1|true)\s*"/.test(res)
                        code = res.match(/code\s*=\s*"\s*(\S*)\s*"/) ? RegExp.$1 : ''
                        status = res.match(/status\s*=\s*"\s*(\d+)\s*"/) ? parseInt(RegExp.$1) : 0
                        self.fireReceiveEvent(success, code, status, 0)
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
                xhr.open('POST', address, true)
                xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8')
                xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT')
                xhr.setRequestHeader('SOAPAction', '""')
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        clearTimeout(tid)
                        if (xhr.status == 200 && xhr.responseXML) {
                            res = xhr.responseXML.getElementsByTagName('response')
                            if (res.length > 0) {
                                success = /^(1|true)$/.test(res[0].getAttribute('success'))
                                code = res[0].hasAttribute('code') ? res[0].getAttribute('code') : ''
                                status = res[0].hasAttribute('status') ? parseInt(res[0].getAttribute('status')) : 0
                                self.fireReceiveEvent(success, code, status, 0)
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
            this.message = ''
        } else {
            throw new Error('XMLHttpRequest is not supported')
        }
        sq = 0
    }
    return sq
}
Display.prototype.fireReceiveEvent = function (success, code, status, sq) {
    if (code == 'EX_ENPC_TIMEOUT') {
        code = 'ERROR_DEVICE_BUSY'
    }
    if (this.onreceive) {
        this.onreceive({
            success: success,
            code: code,
            status: status,
        }, sq)
    }
}
Display.prototype.fireErrorEvent = function (status, responseText, sq) {
    if (this.onerror) {
        this.onerror({
            status: 0,
            responseText: this.ASB_NO_RESPONSE,
        }, sq)
    }
    this.ePosDev.cleanup()
}
Display.prototype.client_onxmlresult = function (res, sq) {
    if (res) {
        var xml = res.resultdata
        var success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml)
        xml.match(/code\s*=\s*"\s*(\S*)\s*"/)
        var code = RegExp.$1
        xml.match(/status\s*=\s*"\s*(\d+)\s*"/)
        var status = parseInt(RegExp.$1)
        if (this.onreceive) {
            this.onreceive({
                success: success,
                code: code,
                status: status,
            }, sq)
        }
    } else {
        if (this.onerror) {
            this.onerror({
                status: 0,
                responseText: this.ASB_NO_RESPONSE,
            }, sq)
        }
        this.ePosDev.cleanup()
    }
}
Display.prototype.toString = function () {
    var epos = '<epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display">' + this.message + '</epos-display>'
    return epos
}
Display.prototype.setXmlString = function (xml) {
    this.message = xml
}
Display.prototype.getXmlString = function () {
    return this.message
}
Display.prototype.callEvent = function (eventName, data) {
    var eventReq = {
        type: eventName,
        data: data,
    }
    var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
    var sequence = -1
    try {
        this.connectionObj.emit(eposmsg)
        sequence = eposmsg.sequence
    } catch (e) { }
    return sequence
}