function OtherPeripheral(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
OtherPeripheral.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    send: function (methodName, data) {
        var _data = {}
        for (var key in data) {
            _data[key] = data[key]
        }
        _data.type = methodName
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, _data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    },
    client_onreceive: function (data) {
        try {
            var eventData = data
            delete eventData.type
            this.onreceive(data.type, eventData)
        } catch (e) { }
        return
    },
    callEvent: function (eventName, data) {
        var eventReq = {
            type: eventName,
            data: data
        }
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    }
}