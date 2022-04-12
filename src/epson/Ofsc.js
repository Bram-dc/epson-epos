function Ofsc() {
    this.SERVICE_ID = "OFSC"
    this.callback = null
    this.connectionObj = null
}
Ofsc.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    send: function (xml, timeout, crypto, callback) {
        this.callback = callback
        try {
            if (this.connectionObj.isUsableDeviceIF()) {
                var data = {
                    type: "print",
                    timeout: timeout,
                    printdata: xml
                }
                var eposmsg = MessageFactory.getServiceMessage(this.SERVICE_ID, crypto, data)
                this.connectionObj.emit(eposmsg)
            }
        } catch (e) {
            return
        }
    },
    notify: function (eposmsg) {
        var data = null
        if (eposmsg.isCrypto == "1") {
            data = MessageFactory.decrypt(eposmsg.data)
        } else {
            data = eposmsg.data
        }
        if (this.callback != null) {
            this.callback(data.resultdata)
        }
    },
    onxmlresult: function (xml) {
        if (this.callback != null) {
            this.callback(xml)
        }
    }
}