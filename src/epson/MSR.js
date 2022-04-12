function MSR(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
MSR.prototype = {
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