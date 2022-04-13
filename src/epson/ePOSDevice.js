export default function ePOSDevice() {
    this.DEVICE_TYPE_SCANNER = "type_scanner"
    this.DEVICE_TYPE_KEYBOARD = "type_keyboard"
    this.DEVICE_TYPE_POSKEYBOARD = "type_poskeyboard"
    this.DEVICE_TYPE_MSR = "type_msr"
    this.DEVICE_TYPE_CAT = "type_cat"
    this.DEVICE_TYPE_CASH_CHANGER = "type_cash_changer"
    this.DEVICE_TYPE_PRINTER = "type_printer"
    this.DEVICE_TYPE_DISPLAY = "type_display"
    this.DEVICE_TYPE_SIMPLE_SERIAL = "type_simple_serial"
    this.DEVICE_TYPE_HYBRID_PRINTER = "type_hybrid_printer"
    this.DEVICE_TYPE_HYBRID_PRINTER2 = "type_hybrid_printer2"
    this.DEVICE_TYPE_DT = "type_dt"
    this.DEVICE_TYPE_OTHER_PERIPHERAL = "type_other_peripheral"
    this.DEVICE_TYPE_GFE = "type_storage"
    this.RESULT_OK = "OK"
    this.ERROR_SYSTEM = "SYSTEM_ERROR"
    this.ERROR_DEVICE_IN_USE = "DEVICE_IN_USE"
    this.ERROR_DEVICE_OPEN = "DEVICE_OPEN_ERROR"
    this.ERROR_DEVICE_CLOSE = "DEVICE_CLOSE_ERROR"
    this.ERROR_DEVICE_NOT_OPEN = "DEVICE_NOT_OPEN"
    this.ERROR_DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND"
    this.ERROR_PARAMETER = "ERROR_PARAMETER"
    this.IFPORT_EPOSDEVICE = 8008
    this.IFPORT_EPOSDEVICE_S = 8043
    this.CONNECT_TIMEOUT = 15000
    this.RECONNECT_TIMEOUT = 3000
    this.MAX_RECONNECT_RETRY = 5
    this.socket = null
    this.connectionId = null
    this.reconnectTimerId = null
    this.reconnectTryCount = 0
    this.admin = ""
    this.location = ""
    this.recievedDataId = 0
    this.connectStartTime = 0
    this.waitRetryConnectId = 0
    this.conectionObj = new Connection()
    this.commBoxManager = new CommBoxManager()
    this.commBoxManager.setConnectionObject(this.conectionObj)
    this.devObjSelector = new DeviceObjectSelector()
    this.devObjSelector.setConnectionObject(this.conectionObj)
    this.devObjElmMap = new DeviceObjElementMap()
    this.ofsc = new Ofsc()
    this.ofsc.setConnectionObject(this.conectionObj)
    this.cookieIo = new CookieIO()
    this.gbox = new SocketGarbageBox()
    this.eposprint = false
    var self = this
    window.onbeforeunload = function () {
        self.disconnect()
    }
    window.onpagehide = function () {
        self.disconnect()
    }
}
ePOSDevice.prototype = {
    connect: function (address, port, callback, options) {
        if ((this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) != this.conectionObj.DISCONNECT) || (this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) != this.conectionObj.DISCONNECT)) {
            this.disconnect()
        }
        this.connectStartTime = new Date().getTime()
        var protocol = (port == this.IFPORT_EPOSDEVICE) ? "http" : "https"
        this.conectionObj.setAddress(protocol, address, port)
        this.conectionObj.registCallback(callback)
        if (arguments.length >= 4) {
            this.eposprint = options.eposprint
        } else {
            this.eposprint = false
        }
        var self = this
        if (this.eposprint) {
            var selfofProb = this.conectionObj
            this.conectionObj.probeWebServiceIF(function (accessTime) {
                var result = self.ERROR_PARAMETER
                if (selfofProb.isUsablePrintIF()) {
                    result = self.RESULT_OK
                }
                callback(result)
            })
        } else {
            this.connectBySocketIo(this.CONNECT_TIMEOUT, protocol)
        }
    },
    isConnected: function () {
        var devIsConnect = false
        var wsIsConnect = false
        switch (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)) {
            case this.conectionObj.CONNECT:
            case this.conectionObj.RECONNECTING:
                devIsConnect = true
                break
            case this.conectionObj.DISCONNECT:
                break
        }
        if (this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) == this.conectionObj.CONNECT) {
            wsIsConnect = true
        }
        return devIsConnect | wsIsConnect
    },
    disconnect: function () {
        var eposmsg = MessageFactory.getDisconnectMessage(this.connectionId)
        this.conectionObj.emit(eposmsg)
        this.cleanup()
    },
    createDevice: function (deviceId, deviceType, options, callback) {
        try {
            if (!this.isConnected()) {
                throw new Error(this.ERROR_SYSTEM)
            }
            if (this.devObjElmMap.get(deviceId) != null) {
                throw new Error(this.ERROR_DEVICE_IN_USE)
            }
            if (!this.devObjSelector.isSelectable(deviceType)) {
                throw new Error(this.ERROR_DEVICE_NOT_FOUND)
            }
            var isCrypto = false
            var isBufferEnable = false
            if (typeof (options) == "boolean") {
                isCrypto = options
            } else {
                if (typeof (options.crypto) == "boolean") {
                    isCrypto = options.crypto
                }
                if (typeof (options.buffer) == "boolean") {
                    isBufferEnable = options.buffer
                }
            }
            if (deviceType == this.DEVICE_TYPE_DT) {
                isCrypto = true
                deviceId = "local_dt"
            }
            var deviceObject = this.devObjSelector.select(deviceId, deviceType, options.driver, isCrypto, this)
            deviceObject.setConnectionObject(this.conectionObj)
            var element = new DeviceObjElement(deviceId, isCrypto, deviceObject, callback)
            this.devObjElmMap.add(element)
            if (this.conectionObj.isUsableDeviceIF()) {
                var eposmsg = MessageFactory.getOpenDeviceMessage(deviceId, deviceType, isCrypto, isBufferEnable)
                this.conectionObj.emit(eposmsg)
            } else {
                var self = this
                this.checkEposPrintService(deviceId, deviceType, function (result) {
                    if (result == self.RESULT_OK) {
                        callback(deviceObject, self.RESULT_OK)
                    } else {
                        callback(null, self.ERROR_DEVICE_NOT_FOUND)
                    }
                })
            }
        } catch (e) {
            var message = e.message
            if ((message == null) || (message == "")) {
                message = this.ERROR_DEVICE_OPEN
            }
            if (callback != null) {
                callback(null, message)
            }
        }
    },
    deleteDevice: function (deviceObject, callback) {
        try {
            var element = this.devObjElmMap.getByObj(deviceObject)
            if (element == null) {
                throw new Error(this.ERROR_DEVICE_NOT_OPEN)
            }
            if (this.conectionObj.isUsableDeviceIF()) {
                element.callback = callback
                var eposmsg = MessageFactory.getCloseDeviceMessage(element.deviceId)
                this.conectionObj.emit(eposmsg)
            } else {
                try {
                    deviceObject.finalize()
                } catch (e) { }
                this.devObjElmMap.remove(element.deviceId)
                callback(this.RESULT_OK)
            }
        } catch (e) {
            var message = e.message
            if ((message == null) || (message == "")) {
                message = this.ERROR_DEVICE_CLOSE
            }
            if (callback != null) {
                callback(message)
            }
        }
    },
    getAdmin: function () {
        return this.admin
    },
    getLocation: function () {
        return this.location
    },
    sendOfscXml: function (xml, timeout, crypto, callback) {
        this.ofsc.send(xml, timeout, crypto, callback)
    },
    getCommBoxManager: function () {
        if (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) != this.conectionObj.CONNECT) {
            return null
        }
        return this.commBoxManager
    },
    cleanup: function () {
        if (this.waitRetryConnectId != 0) {
            clearTimeout(this.waitRetryConnectId)
            this.waitRetryConnectId = 0
        }
        this.connectStartTime = 0
        this.gbox.stock(this.socket)
        this.gbox.dispose()
        var devObjList = this.devObjElmMap.getElementList()
        devObjList.forEach(function (obj) {
            try {
                obj.deviceObject.finalize()
            } catch (e) { }
        })
        devObjList = null
        this.devObjElmMap.removeAll()
        if ((this.ondisconnect != null) && (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) != this.conectionObj.DISCONNECT || this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) != this.conectionObj.DISCONNECT)) {
            this.ondisconnect()
        }
        this.cookieIo.writeId("", this.conectionObj.address_p)
        this.conectionObj.changeStatus(this.conectionObj.IF_ALL, this.conectionObj.DISCONNECT)
        this.socket = null
        this.conectionObj.setSocket(null)
        this.connectionId = null
        this.conectionObj.setAddress("", "", "")
        if (this.reconnectTimerId != null) {
            clearInterval(this.reconnectTimerId)
        }
        this.reconnectTimerId = null
        this.reconnectTryCount = 0
        this.admin = ""
        this.location = ""
        this.recievedDataId = 0
        this.eposprint = false
    },
    connectBySocketIo: function (timeout) {
        var selfofProb = this.conectionObj
        var url = selfofProb.getSocketIoURL()
        this.socket = io.connect(url, {
            reconnect: false,
            "connect timeout": timeout,
            "force new connection": true
        })
        this.conectionObj.setSocket(this.socket)
        var self = this
        this.socket.on("connect", function (data) {
            try {
                self.gbox.dispose()
            } catch (e) { }
        })
        this.socket.on("close", function () {
            selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE, tselfofProb.DISCONNECT)
        })
        this.socket.on("disconnect", function (data) {
            try {
                if (selfofProb.status(selfofProb.IF_EPOSDEVICE) == selfofProb.RECONNECTING) {
                    return
                } else {
                    if (self.cookieIo.readId(self.conectionObj.address_p) == "" && self.connectionId == null) {
                        self.cleanup()
                    } else {
                        self.startReconnectAction()
                    }
                }
            } catch (e) { }
        })
        this.socket.on("error", function () {
            try {
                selfofProb.probeWebServiceIF(function (accessTime) {
                    if (selfofProb.isUsablePrintIF()) {
                        self.eposprint = true
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_NONE)
                    } else {
                        selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE, selfofProb.DISCONNECT)
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_TIMEOUT)
                    }
                })
            } catch (e) { }
        })
        this.socket.on("connect_failed", function () {
            try {
                selfofProb.probeWebServiceIF(function (accessTime) {
                    if (selfofProb.isUsablePrintIF()) {
                        self.eposprint = true
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_NONE)
                    } else {
                        selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE, selfofProb.DISCONNECT)
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_TIMEOUT)
                    }
                })
            } catch (e) { }
        })
        this.socket.on("message", function (data) {
            try {
                var eposmsg = MessageFactory.parseRequestMessage(data)
                if (eposmsg.data_id != "") {
                    self.recievedDataId = eposmsg.data_id
                }
                switch (eposmsg.request) {
                    case eposmsg.REQUEST.CONNECT:
                        self.procConnect(eposmsg)
                        break
                    case eposmsg.REQUEST.PUBKEY:
                        self.procPubkey(eposmsg)
                        break
                    case eposmsg.REQUEST.ADMININFO:
                        self.procAdminInfo(eposmsg)
                        break
                    case eposmsg.REQUEST.RECONNECT:
                        self.procReconnect(eposmsg)
                        break
                    case eposmsg.REQUEST.DISCONNECT:
                        self.procDisconnect(eposmsg)
                        break
                    case eposmsg.REQUEST.OPENDEVICE:
                        self.procOpenDevice(eposmsg)
                        break
                    case eposmsg.REQUEST.CLOSEDEVICE:
                        self.procCloseDevice(eposmsg)
                        break
                    case eposmsg.REQUEST.DEVICEDATA:
                        self.procDeviceData(eposmsg)
                        break
                    case eposmsg.REQUEST.SERVICEDATA:
                        self.procServiceData(eposmsg)
                        break
                    case eposmsg.REQUEST.OPENCOMMBOX:
                        self.procOpenCommBox(eposmsg)
                        break
                    case eposmsg.REQUEST.CLOSECOMMBOX:
                        self.procCloseCommBox(eposmsg)
                        break
                    case eposmsg.REQUEST.COMMDATA:
                        self.procCommBoxData(eposmsg)
                        break
                    case eposmsg.REQUEST.ERROR:
                        self.procError(eposmsg)
                        break
                    default:
                        return
                }
            } catch (e) { }
        })
    },
    procConnect: function (eposmsg) {
        try {
            if (this.reconnectTimerId != null) {
                clearInterval(this.reconnectTimerId)
                this.reconnectTimerId = null
            }
            var response = null
            var prevConnectionId = this.cookieIo.readId(this.conectionObj.address_p)
            if (eposmsg.data.protocol_version < 2) {
                response = MessageFactory.getPubkeyMessage(eposmsg.data.prime, eposmsg.data.key)
                this.conectionObj.emit(response)
            } else {
                if (this.connectionId != null) {
                    response = MessageFactory.getReconnectMessage(this.connectionId, eposmsg.data.client_id, this.recievedDataId)
                    this.conectionObj.emit(response)
                } else {
                    if (prevConnectionId != "") {
                        response = MessageFactory.getDisconnectMessage(prevConnectionId)
                        this.conectionObj.emit(response)
                        response = MessageFactory.getPubkeyMessage(eposmsg.data.prime, eposmsg.data.key)
                        this.conectionObj.emit(response)
                    } else {
                        response = MessageFactory.getPubkeyMessage(eposmsg.data.prime, eposmsg.data.key)
                        this.conectionObj.emit(response)
                    }
                }
            }
            this.cookieIo.writeId(eposmsg.data.client_id, this.conectionObj.address_p)
            this.connectionId = eposmsg.data.client_id
        } catch (e) {
            this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
            this.cleanup()
        }
    },
    procPubkey: function (eposmsg) {
        try {
            if (eposmsg.code == "SHARED_KEY_MISMATCH_ERROR") {
                var mismatchErrTime = new Date().getTime()
                var mismatchTimeout = 0
                if (this.connectStartTime != 0) {
                    mismatchTimeout = mismatchErrTime - this.connectStartTime
                    if (mismatchTimeout < this.CONNECT_TIMEOUT) {
                        var self = this
                        this.gbox.stock(this.socket)
                        this.connectionId = null
                        this.waitRetryConnectId = setTimeout(function () {
                            self.connectBySocketIo(self.CONNECT_TIMEOUT - mismatchTimeout)
                        }, 100)
                    } else {
                        this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_TIMEOUT)
                        this.cleanup()
                    }
                } else {
                    this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_TIMEOUT)
                    this.cleanup()
                }
            } else {
                if (eposmsg.code == "PARAM_ERROR") {
                    this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
                    this.cleanup()
                } else {
                    var response = MessageFactory.getAdminInfoMessage()
                    this.conectionObj.emit(response)
                }
            }
        } catch (e) {
            this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
            this.cleanup()
        }
    },
    procAdminInfo: function (eposmsg) {
        if (this.eposprint) {
            return
        }
        if (eposmsg.code != this.RESULT_OK) {
            this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
            return
        }
        this.admin = eposmsg.data.admin_name
        this.location = eposmsg.data.location
        this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_OK)
    },
    procReconnect: function (eposmsg) {
        if (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) != this.conectionObj.RECONNECTING) {
            return
        }
        if (eposmsg.code == this.RESULT_OK) {
            this.conectionObj.changeStatus(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.CONNECT)
            if (this.onreconnect != null) {
                this.onreconnect()
            }
        } else {
            this.cleanup()
        }
    },
    procDisconnect: function (eposmsg) { },
    procOpenDevice: function (eposmsg) {
        var deviceId = eposmsg.deviceId
        try {
            var element = this.devObjElmMap.get(deviceId)
            if (eposmsg.code == this.RESULT_OK) {
                if (element.callback != null) {
                    element.callback(element.deviceObject, eposmsg.code)
                }
            } else {
                if (element.callback != null) {
                    element.callback(null, eposmsg.code)
                }
                this.devObjElmMap.remove(deviceId)
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror("0", deviceId, this.ERROR_SYSTEM, null)
            }
        }
    },
    procCloseDevice: function (eposmsg) {
        var deviceId = eposmsg.deviceId
        try {
            if (eposmsg.code == this.RESULT_OK) {
                var element = this.devObjElmMap.get(deviceId)
                if (element.callback != null) {
                    element.callback(eposmsg.code)
                }
                try {
                    element.deviceObject.finalize()
                } catch (e) { }
                this.devObjElmMap.remove(deviceId)
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror("0", deviceId, this.ERROR_SYSTEM, null)
            }
        }
    },
    procDeviceData: function (eposmsg) {
        var deviceId = eposmsg.deviceId
        var sequence = eposmsg.sequence
        var data = eposmsg.data
        try {
            var devObjElm = this.devObjElmMap.get(deviceId)
            if (devObjElm.isCrypto) {
                data = MessageFactory.decrypt(data)
            }
            var deviceObject = devObjElm.deviceObject
            var method = "client_" + data.type
            try {
                if (deviceObject instanceof OtherPeripheral) {
                    deviceObject.client_onreceive(data, sequence)
                } else {
                    eval("deviceObject." + method + "(data, sequence)")
                }
            } catch (e) {
                eval("deviceObject." + data.type + "(data, sequence)")
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, deviceId, this.ERROR_SYSTEM, null)
            }
        }
    },
    procServiceData: function (eposmsg) {
        try {
            switch (eposmsg.serviceId) {
                case "OFSC":
                    this.ofsc.notify(eposmsg)
                    break
                default:
                    break
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(eposmsg.sequence, eposmsg.serviceId, this.ERROR_SYSTEM, null)
            }
        }
    },
    procOpenCommBox: function (eposmsg) {
        var sequence = eposmsg.sequence
        try {
            this.commBoxManager.client_opencommbox(eposmsg.data, sequence)
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, "", this.ERROR_SYSTEM, null)
            }
        }
    },
    procCloseCommBox: function (eposmsg) {
        var sequence = eposmsg.sequence
        try {
            this.commBoxManager.client_closecommbox(eposmsg.data, sequence)
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, "", this.ERROR_SYSTEM, null)
            }
        }
    },
    procCommBoxData: function (eposmsg) {
        var sequence = eposmsg.sequence
        try {
            this.commBoxManager.executeCommDataCallback(eposmsg.data, sequence)
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, "", this.ERROR_SYSTEM, null)
            }
        }
    },
    procError: function (eposmsg) {
        try {
            if (this.onerror != null) {
                this.onerror(eposmsg.sequence, eposmsg.deviceId, eposmsg.code, eposmsg.data)
            }
        } catch (e) { }
    },
    startReconnectAction: function () {
        if (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) == this.conectionObj.RECONNECTING) {
            return
        }
        this.conectionObj.changeStatus(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.RECONNECTING)
        this.reconnectTryCount = 0
        var self = this
        this.reconnectTimerId = setInterval(function () {
            if (self.socket != null) {
                self.gbox.stock(self.socket)
            }
            if (self.reconnectTryCount == self.MAX_RECONNECT_RETRY) {
                clearInterval(self.reconnectTimerId)
                self.cleanup()
                return
            }
            if (self.conectionObj.status(self.conectionObj.IF_EPOSDEVICE) == self.conectionObj.RECONNECTING) {
                self.connectBySocketIo(self.RECONNECT_TIMEOUT)
            }
            self.reconnectTryCount++
        }, self.RECONNECT_TIMEOUT)
        if (this.reconnectTryCount == 0 && this.onreconnecting != null) {
            this.onreconnecting()
        }
    },
    checkEposPrintService: function (deviceId, deviceType, callback) {
        var OK = "OK"
        var SSL_CONNECT_OK = "SSL_CONNECT_OK"
        var ERROR_TIMEOUT = "ERROR_TIMEOUT"
        var ERROR_PARAMETER = "ERROR_PARAMETER"
        var ERROR_SYSTEM = "SYSTEM_ERROR"
        var postUrl = null
        var printUrl = this.conectionObj.getAddressWithProtocol() + "/cgi-bin/epos/service.cgi?devid=" + deviceId + "&timeout=10000"
        var displayUrl = this.conectionObj.getAddressWithProtocol() + "/cgi-bin/eposDisp/service.cgi?devid=" + deviceId + "&timeout=10000"
        var postData = null
        var printData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>'
        var displayData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>'
        var xhr = null
        var tid
        var success
        if (deviceType == this.DEVICE_TYPE_DISPLAY) {
            postUrl = displayUrl
            postData = displayData
        } else {
            postUrl = printUrl
            postData = printData
        }
        if (window.XDomainRequest) {
            try {
                xhr = new XDomainRequest()
                xhr.open("POST", postUrl)
                xhr.onload = function () {
                    if (/response/.test(xhr.responseText)) {
                        success = /success\s*=\s*"\s*(1|true)\s*"/.test(xhr.responseText)
                        if (success) {
                            callback(OK)
                        } else {
                            callback(ERROR_PARAMETER)
                        }
                    } else {
                        callback(ERROR_PARAMETER)
                    }
                }
                xhr.onerror = function () {
                    callback(ERROR_PARAMETER)
                }
                xhr.ontimeout = function () {
                    callback(ERROR_TIMEOUT)
                }
                xhr.onprogress = function () { }
                xhr.send(postData)
            } catch (e) {
                callback(ERROR_PARAMETER)
            }
        } else {
            try {
                xhr = new XMLHttpRequest()
                xhr.open("POST", postUrl, true)
                xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
                xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT")
                xhr.setRequestHeader("SOAPAction", '""')
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        clearTimeout(tid)
                        if ((xhr.status == 200) && (xhr.responseXML)) {
                            var res = xhr.responseXML.getElementsByTagName("response")
                            if (res.length <= 0) {
                                success = false
                            } else {
                                success = /^(1|true)$/.test(res[0].getAttribute("success"))
                            }
                            if (success) {
                                callback(OK)
                            } else {
                                callback(ERROR_PARAMETER)
                            }
                        } else {
                            callback(ERROR_PARAMETER)
                        }
                    }
                }
                tid = setTimeout(function () {
                    xhr.abort()
                    callback(ERROR_TIMEOUT)
                }, 5000)
                xhr.timeout = 10000
                xhr.send(postData)
            } catch (e) {
                callback(ERROR_PARAMETER)
            }
        }
    }
}