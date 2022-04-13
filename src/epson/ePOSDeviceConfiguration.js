export default function ePOSDeviceConfiguration(address) {
    this.DEVICE_GROUP_ALL = "group_all"
    this.DEVICE_GROUP_PRINTER = "group_printer"
    this.DEVICE_GROUP_DISPLAY = "group_display"
    this.DEVICE_GROUP_HID = "group_hid"
    this.DEVICE_GROUP_SERIAL = "group_serial"
    this.DEVICE_GROUP_OTHER = "group_other"
    this.DEVICE_TYPE_PRINTER = "type_printer"
    this.DEVICE_TYPE_HYBRID_PRINTER = "type_hybrid_printer"
    this.DEVICE_TYPE_DISPLAY = "type_display"
    this.DEVICE_TYPE_KEYBOARD = "type_keyboard"
    this.DEVICE_TYPE_SCANNER = "type_scanner"
    this.DEVICE_TYPE_MSR = "type_msr"
    this.DEVICE_TYPE_CASH_CHANGER = "type_cash_changer"
    this.DEVICE_TYPE_SIMPLE_SERIAL = "type_simple_serial"
    this.DEVICE_TYPE_CASH_DRAWER = "type_cash_drawer"
    this.DEVICE_TYPE_PIN_PAD = "type_pin_pad"
    this.DEVICE_TYPE_CAT = "type_cat"
    this.DEVICE_TYPE_SMARTCARD_RW = "type_smartcard_rw"
    this.CGI_PATH = "/epson_eposdevice/getDeviceList.cgi"
    this.RESULT_OK = "OK"
    this.UNKNOWN = "unknown"
    this.ONLINE = "online"
    this.OFFLINE = "offline"
    this.INTERVAL = 500
    this.TIMEOUT = 60 * 1000
    this.address = address
    this.cb = null
    this.message = null
    this.WEBSOCKET_PORT = 8008
    this.SSLWEBSOCKET_PORT = 8043
}
ePOSDeviceConfiguration.prototype.getRegisterdDevices = function (type, callback) {
    this.cb = callback
    var self = this
    var xhr = null
    var protocol = window.location.protocol + "//"
    var param = "?group=" + type
    var url = protocol + this.address + this.CGI_PATH + param
    if (window.XDomainRequest) {
        xhr = new XDomainRequest()
        xhr.open("GET", url)
        xhr.onload = function () {
            self.message = self.RESULT_OK
            var jsonObj = JSON.parse(xhr.responseText)
            self.checkDevice(jsonObj, function (resultList) {
                for (var key in resultList) {
                    for (var i = 0; i < jsonObj.length; i++) {
                        if (jsonObj[i].deviceId != key) {
                            continue
                        }
                        jsonObj[i].status = resultList[key]
                    }
                }
                if (self.cb != null) {
                    self.cb(self, jsonObj)
                    self.cb = null
                }
            })
        }
        xhr.onerror = function () {
            self.message = "Failed to get device list."
            if (self.cb != null) {
                self.cb(self, null)
                self.cb = null
            }
        }
    } else {
        xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        xhr.setRequestHeader("Pragma", "no-cache")
        xhr.setRequestHeader("Cache-Control", "no-cache")
        xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT")
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    self.message = self.RESULT_OK
                    var jsonObj = JSON.parse(xhr.responseText)
                    self.checkDevice(jsonObj, function (resultList) {
                        for (var key in resultList) {
                            for (var i = 0; i < jsonObj.length; i++) {
                                if (jsonObj[i].deviceId != key) {
                                    continue
                                }
                                jsonObj[i].status = resultList[key]
                            }
                        }
                        if (self.cb != null) {
                            self.cb(self, jsonObj)
                            self.cb = null
                        }
                    })
                } else {
                    self.message = "Failed to get device list."
                    if (self.cb != null) {
                        self.cb(self, null)
                        self.cb = null
                    }
                }
            }
        }
    }
    xhr.send(null)
}
ePOSDeviceConfiguration.prototype.checkDevice = function (obj, callback) {
    var self = this
    var protocol = window.location.protocol
    var port = (protocol.match(/^(https:)/)) ? this.SSLWEBSOCKET_PORT : this.WEBSOCKET_PORT
    var ePosDev = new epson.ePOSDevice()
    var resultList = new Array()
    for (var i = 0; i < obj.length; i++) {
        resultList[obj[i].deviceId] = self.UNKNOWN
    }
    ePosDev.onerror = function (sq, deviceId, result) {
        if (deviceId != "") {
            resultList[deviceId] = self.OFFLINE
        }
    }
    ePosDev.connect(this.address, port, function (data) {
        if ((data == "OK") || (data == "SSL_CONNECT_OK")) {
            for (var i = 0; i < obj.length; i++) {
                ePosDev.createDevice(obj[i].deviceId, obj[i].deviceType, {}, function (data, code) {
                    resultList[data.deviceID] = (code == "OK") ? self.ONLINE : self.OFFLINE
                    ePosDev.deleteDevice(data, null)
                })
            }
        }
    })
    var timer
    timer = window.setInterval(function () {
        for (var key in resultList) {
            if (resultList[key] == self.UNKNOWN) {
                return
            }
        }
        clearInterval(timer)
        if (callback != null) {
            callback(resultList)
        }
    }, self.INTERVAL)
    window.setTimeout(function () {
        clearInterval(timer)
        if (callback != null) {
            callback(resultList)
        }
    }, self.TIMEOUT)
}