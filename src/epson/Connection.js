function Connection() {
    this.OK = "OK"
    this.SSL_CONNECT_OK = "SSL_CONNECT_OK"
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT"
    this.ERROR_PARAMETER = "ERROR_PARAMETER"
    this.ERROR_SYSTEM = "SYSTEM_ERROR"
    this.socket_p = null
    this.address_p = ""
    this.protocol_p = ""
    this.port_p = ""
    this.callback_p = null
    this.usableIF_p = 0
    this.ws_status_p = 2
    this.dev_status_p = 2
    this.IF_EPOSDEVICE = 1
    this.IF_EPOSPRINT = 2
    this.IF_EPOSDISPLAY = 4
    this.IF_ALL = 7
    this.ACCESS_OK = "OK"
    this.ACCESS_ERROR = "ERROR"
    this.ACCESS_TIMEOUT = "TIMEOUT"
    this.ACCESS_NONE = "NONE"
    this.CONNECT = 1
    this.DISCONNECT = 2
    this.RECONNECTING = 4
}
Connection.prototype.probe = function (url, postdata, callback) {
    var probeSelf = this
    var xhr = null
    var tid
    if (window.XDomainRequest) {
        try {
            xhr = new XDomainRequest()
            xhr.open("POST", url)
            xhr.onload = function () {
                callback(probeSelf.OK)
            }
            xhr.onerror = function () {
                callback(probeSelf.ERROR_PARAMETER)
            }
            xhr.ontimeout = function () {
                callback(probeSelf.ERROR_TIMEOUT)
            }
            xhr.onprogress = function () { }
            xhr.send(postdata)
        } catch (e) {
            callback(this.ERROR_PARAMETER)
        }
    } else {
        try {
            xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
            xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT")
            xhr.setRequestHeader("SOAPAction", '""')
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    clearTimeout(tid)
                    if (xhr.status == 200) {
                        callback(probeSelf.OK)
                    } else {
                        callback(probeSelf.ERROR_PARAMETER)
                    }
                }
            }
            tid = setTimeout(function () {
                xhr.abort()
                callback(probeSelf.ERROR_TIMEOUT)
            }, 5000)
            xhr.timeout = 10000
            xhr.send(postdata)
        } catch (e) {
            callback(this.ERROR_PARAMETER)
        }
    }
}
Connection.prototype.probeWebServiceIF = function (callback) {
    var startTime = (new Date()).getTime()
    var notify = false
    var probeSelf = this
    var printUrl = this.getAddressWithProtocol() + "/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000"
    var printData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>'
    this.probe(printUrl, printData, function (code) {
        var result = probeSelf.ACCESS_ERROR
        if (code == probeSelf.OK) {
            result = probeSelf.ACCESS_OK
        }
        probeSelf.registIFAccessResult(probeSelf.IF_EPOSPRINT, result)
        if (notify) {
            callback((new Date()).getTime() - startTime)
        }
        notify = !notify
    })
    var displayUrl = this.getAddressWithProtocol() + "/cgi-bin/eposDisp/service.cgi?devid=local_display&timeout=10000"
    var displayData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>'
    this.probe(displayUrl, displayData, function (code) {
        var result = probeSelf.ACCESS_ERROR
        if (code == probeSelf.OK) {
            result = probeSelf.ACCESS_OK
        }
        probeSelf.registIFAccessResult(probeSelf.IF_EPOSDISPLAY, result)
        if (notify) {
            callback((new Date()).getTime() - startTime)
        }
        notify = !notify
    })
}
Connection.prototype.setSocket = function (socket) {
    this.socket_p = socket
}
Connection.prototype.emit = function (eposmsg) {
    try {
        if (this.socket_p == null) {
            return
        }
        this.socket_p.emit("message", eposmsg.toTransmissionForm())
    } catch (e) {
        throw new Error(this.ERROR_SYSTEM)
    }
}
Connection.prototype.setAddress = function (protocol, address, port) {
    this.protocol_p = protocol
    this.address_p = address
    this.port_p = port
    this.usableIF_p = 0
}
Connection.prototype.getAddressWithProtocol = function () {
    return this.protocol_p + "://" + this.address_p
}
Connection.prototype.getSocketIoURL = function () {
    return this.getAddressWithProtocol() + ":" + this.port_p
}
Connection.prototype.registCallback = function (callback) {
    if (typeof (callback) == "function") {
        this.callback_p = callback
    }
}
Connection.prototype.changeStatus = function (target, status) {
    switch (target) {
        case this.IF_ALL:
            this.dev_status_p = status
            this.ws_status_p = status
            break
        case this.IF_EPOSDEVICE:
            this.dev_status_p = status
            break
        default:
            this.ws_status_p = status
            break
    }
}
Connection.prototype.status = function (target) {
    if (target == this.IF_EPOSDEVICE) {
        return this.dev_status_p
    } else {
        return this.ws_status_p
    }
}
Connection.prototype.isUsableDeviceIF = function () {
    return ((this.usableIF_p & this.IF_EPOSDEVICE) == this.IF_EPOSDEVICE)
}
Connection.prototype.isUsablePrintIF = function () {
    if (this.isUsableDeviceIF()) {
        return true
    }
    return ((this.usableIF_p & this.IF_EPOSPRINT) == this.IF_EPOSPRINT)
}
Connection.prototype.isUsableDisplayIF = function () {
    if (this.isUsableDeviceIF()) {
        return true
    }
    return ((this.usableIF_p & this.IF_EPOSDISPLAY) == this.IF_EPOSDISPLAY)
}
Connection.prototype.registIFAccessResult = function (type, code) {
    if (code == this.ACCESS_OK) {
        this.changeStatus(type, this.CONNECT)
        this.usableIF_p |= type
    }
    if (type == this.IF_EPOSDEVICE) {
        var result = this.ERROR_PARAMETER
        if (this.usableIF_p & this.IF_ALL) {
            if (this.protocol_p == "http") {
                result = this.OK
            } else {
                result = this.SSL_CONNECT_OK
            }
        }
        if (code == this.ACCESS_TIMEOUT) {
            result = this.ERROR_TIMEOUT
        }
        if (this.callback_p != null) {
            try {
                this.callback_p(result)
            } catch (e) { }
            this.callback_p = null
        }
    }
}