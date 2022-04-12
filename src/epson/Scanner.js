function Scanner(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
Scanner.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    client_ondata: function (data) {
        try {
            if (this.ondata == null) {
                return
            }
            this.ondata(data)
        } catch (e) { }
        return
    },
    client_onbinarydata: function (data) {
        try {
            if (this.onbinarydata == null) {
                return
            }
            this.onbinarydata(data)
        } catch (e) { }
        return
    },
    client_setbinarymode: function (data) {
        try {
            if (this.onbinarymode == null) {
                return
            }
            this.onbinarymode(data)
        } catch (e) { }
        return
    },
    setBinaryMode: function (enable) {
        var str = ""
        if (enable == true) {
            str = "true"
        } else {
            str = "false"
        }
        var data = {
            type: "setbinarymode",
            binarymode: str
        }
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    },
    callEvent: function (eventName, data) {
        var eventReq = data
        eventReq.type = eventName
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, eventReq, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    }
}