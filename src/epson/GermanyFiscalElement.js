function GermanyFiscalElement(deviceID, isCrypto) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
    this.ongfereceive = null
    this.onerror = null
}
GermanyFiscalElement.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    operate: function (jsonString, timeout) {
        var data = {
            type: "operate",
            timeout: timeout,
            requestdata: jsonString
        }
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) {
            throw e
        }
        return sequence
    },
    client_operateresult: function (data) {
        if (this.ongfereceive == null) {
            return
        }
        if (data.resultformat == "Base64-encoded") {
            try {
                data.resultdata = window.atob(data.resultdata)
                var uint8array = new Uint8Array(data.resultdata.length)
                for (var i = 0; i < data.resultdata.length; i++) {
                    uint8array[i] = data.resultdata.charCodeAt(i)
                }
                var inflate = new Zlib.Inflate(uint8array)
                var charData = inflate.decompress()
                data.resultdata = []
                for (var j = 0; j < charData.length; j++) {
                    data.resultdata = data.resultdata + String.fromCharCode(charData[j])
                }
            } catch (e) {
                if (this.onerror) {
                    this.onerror(e)
                }
                return
            }
        }
        try {
            this.ongfereceive(this.getResultObject(data))
        } catch (e) {
            if (this.onerror) {
                this.onerror(e)
            }
        }
        return
    },
    getResultObject: function (data) {
        return ({
            success: data.success,
            code: data.code,
            resultdata: data.resultdata,
        })
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