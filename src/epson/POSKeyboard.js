function POSKeyboard(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
POSKeyboard.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    client_onkeypress: function (data) {
        try {
            if (this.onkeypress == null) {
                return
            }
            this.onkeypress(data)
        } catch (e) { }
        return
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