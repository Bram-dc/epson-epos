function CommBox(boxID, commBoxManager, callbackInfo) {
    this.ERROR_OK = "OK"
    this.ERROR_NOT_OPENED = "NOT_OPENED"
    this.ERROR_MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND"
    this.ERROR_SYSTEM_ERROR = "SYSTEM_ERROR"
    this.boxID = boxID
    this.commBoxManager = commBoxManager
    this.callbackInfo = callbackInfo
    this.onreceive = null
    this.connectionObj = this.commBoxManager.connectionObj
}
CommBox.prototype = {
    getCommHistory: function (option, callback) {
        var _option = (typeof (option) == "function") ? null : option
        var _callback = (typeof (option) == "function") ? option : callback
        var allHistory = ((_option == null) || (_option.allHistory == null)) ? false : option.allHistory
        var data = {
            type: "getcommhistory",
            box_id: this.boxID,
            all_history: allHistory
        }
        var eposmsg = MessageFactory.getCommBoxDataMessage(data)
        if (!this.commBoxManager.isOpened(this.getBoxId())) {
            if (_callback != null) {
                _callback(this.ERROR_NOT_OPENED, null, eposmsg.sequence)
            }
            return eposmsg.sequence
        }
        this.callbackInfo.addCallback(_callback, eposmsg.sequence)
        this.connectionObj.emit(eposmsg)
        return eposmsg.sequence
    },
    send: function (message, memberID, callback) {
        var data = {
            type: "send",
            box_id: this.boxID,
            message: message,
            member_id: memberID
        }
        var eposmsg = MessageFactory.getCommBoxDataMessage(data)
        if (!this.commBoxManager.isOpened(this.getBoxId())) {
            if (callback != null) {
                callback(this.ERROR_NOT_OPENED, 0, eposmsg.sequence)
            }
            return eposmsg.sequence
        }
        this.callbackInfo.addCallback(callback, eposmsg.sequence)
        this.connectionObj.emit(eposmsg)
        return eposmsg.sequence
    },
    client_getcommhistory: function (data, sq) {
        var code = data.code
        var historyList = data.history_list
        var getCommHistoryCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)
        if (getCommHistoryCB != null) {
            getCommHistoryCB(code, historyList, sq)
        }
        return
    },
    client_send: function (data, sq) {
        var code = data.code
        var count = data.count
        var sendCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)
        if (sendCB != null) {
            sendCB(code, count, sq)
        }
        return
    },
    client_onreceive: function (data, sq) {
        var rcvData = new Object()
        rcvData.senderId = data.sender_id
        rcvData.receiverId = data.receiver_id
        rcvData.message = data.message
        if (this.onreceive != null) {
            this.onreceive(rcvData)
        }
        return
    },
    getBoxId: function () {
        return this.boxID
    }
}