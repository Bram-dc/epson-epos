function DeviceTerminal(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.onshutdown = null
    this.onrestart = null
    this.connectionObj = null
}
DeviceTerminal.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    shutdown: function (password, callback) {
        this.onshutdown = callback
        var data = {
            type: "shutdown",
            password: password
        }
        return this.send(data)
    },
    client_onshutdown: function (data) {
        try {
            if (typeof (this.onshutdown) != "function") {
                return
            }
            this.onshutdown(data)
        } catch (e) { }
        return
    },
    restart: function (password, callback) {
        this.onrestart = callback
        var data = {
            type: "restart",
            password: password
        }
        return this.send(data)
    },
    client_onrestart: function (data) {
        try {
            if (typeof (this.onrestart) != "function") {
                return
            }
            this.onrestart(data)
        } catch (e) { }
        return
    },
    send: function (data) {
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    }
}