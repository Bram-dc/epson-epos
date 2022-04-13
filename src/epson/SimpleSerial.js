export default class SimpleSerial {



}


function SimpleSerial(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
SimpleSerial.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    sendCommand: function (command) {
        var data = {
            type: "sendcommand",
            command: toHexBinary(command)
        }
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    },
    client_oncommandreply: function (data) {
        try {
            if (this.oncommandreply == null) {
                return
            }
            var hexData = data.data
            hexData = hexData.replace(/[0-9a-fA-F]{2}/g, function (c) {
                var hexNum = parseInt(c, 16)
                return String.fromCharCode(hexNum)
            })
            data.data = hexData
            this.oncommandreply(data)
        } catch (e) { }
        return
    }
}