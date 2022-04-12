function CommBoxManager() {
    this.ERROR_OK = "OK"
    this.ERROR_BOX_COUNT_OVER = "BOX_COUNT_OVER"
    this.ERROR_BOX_CLIENT_OVER = "BOX_CLIENT_OVER"
    this.ERROR_MEMBERID_ALREADY_USED = "MEMBERID_ALREADY_USED"
    this.ERROR_ALREADY_OPENED = "ALREADY_OPENED"
    this.ERROR_NOT_OPENED = "NOT_OPENED"
    this.ERROR_PARAMETER_ERROR = "PARAMETER_ERROR"
    this.ERROR_SYSTEM_ERROR = "SYSTEM_ERROR"
    this.callbackInfo = new callbackInfo()
    this.commBoxList = new Array()
    this.connectionObj = null
}
CommBoxManager.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    openCommBox: function (boxID, option, callback) {
        var memberID = ""
        if (option != null && option.memberID != null) {
            memberID = option.memberID
        }
        var data = {
            box_id: boxID,
            member_id: memberID
        }
        var eposmsg = MessageFactory.getOpenCommBoxMessage(data)
        if (!this.connectionObj.isUsableDeviceIF()) {
            callback(null, this.ERROR_SYSTEM_ERROR, eposmsg.sequence)
            return eposmsg.sequence
        }
        this.connectionObj.emit(eposmsg)
        this.callbackInfo.addCallback(callback, eposmsg.sequence)
        return eposmsg.sequence
    },
    closeCommBox: function (boxObj, callback) {
        var data = {
            box_id: boxID
        }
        var eposmsg = MessageFactory.getCloseCommBoxMessage(data)
        try {
            var boxID = boxObj.getBoxId()
            data.box_id = boxID
            eposmsg = MessageFactory.getCloseCommBoxMessage(data)
            if (!this.isOpened(boxID)) {
                if (callback != null) {
                    callback(this.ERROR_NOT_OPENED, eposmsg.sequence)
                }
                return eposmsg.sequence
            }
            this.connectionObj.emit(eposmsg)
        } catch (e) {
            if (callback != null) {
                callback(this.ERROR_PARAMETER_ERROR, eposmsg.sequence)
            }
        }
        this.callbackInfo.addCallback(callback, eposmsg.sequence)
        return eposmsg.sequence
    },
    client_opencommbox: function (data, sq) {
        var boxID = data.box_id
        var code = data.code
        var commBoxObj = null
        if (code == this.ERROR_OK && this.getCommBox(boxID) == null) {
            commBoxObj = new CommBox(boxID, this, this.callbackInfo)
        }
        if (commBoxObj != null) {
            this.commBoxList.push(commBoxObj)
        }
        var openCommBoxCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)
        if (openCommBoxCB != null) {
            openCommBoxCB(commBoxObj, code, sq)
        }
        return
    },
    client_closecommbox: function (data, sq) {
        var boxID = data.box_id
        var code = data.code
        this.removeCommBox(boxID)
        var closeCommBoxCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)
        if (closeCommBoxCB != null) {
            closeCommBoxCB(code, sq)
        }
        return
    },
    executeCommDataCallback: function (data, sq) {
        var boxID = data.box_id
        var commBoxObj = this.getCommBox(boxID)
        var method = "client_" + data.type
        try {
            eval("commBoxObj." + method + "(data, sq)")
        } catch (e) {
            throw new Error("")
        }
        return
    },
    getCommBox: function (boxID) {
        var commBoxObj = null
        for (var i = 0; i < this.commBoxList.length; i++) {
            if (this.commBoxList[i].getBoxId() == boxID) {
                commBoxObj = this.commBoxList[i]
                break
            }
        }
        return commBoxObj
    },
    removeCommBox: function (boxID) {
        var result = false
        for (var i = 0; i < this.commBoxList.length; i++) {
            if (this.commBoxList[i].getBoxId() == boxID) {
                this.commBoxList.splice(i, 1)
                result = true
                break
            }
        }
        return result
    },
    isOpened: function (boxID) {
        var result = false
        for (var i = 0; i < this.commBoxList.length; i++) {
            if (this.commBoxList[i].getBoxId() == boxID) {
                result = true
                break
            }
        }
        return result
    }
}