function CashChanger(deviceID, isCrypto) {
    this.CONFIG_LEFT_CASH = "CONFIG_LEFT_CASH"
    this.CONFIG_COUNT_MODE = "CONFIG_COUNT_MODE"
    this.MODE_MANUAL_INPUT = "MODE_MANUAL_INPUT"
    this.MODE_AUTOCOUNT = "MODE_AUTO_COUNT"
    this.DEPOSIT_CHANGE = "DEPOSIT_CHANGE"
    this.DEPOSIT_NOCHANGE = "DEPOSIT_NOCHANGE"
    this.DEPOSIT_REPAY = "DEPOSIT_REPAY"
    this.COLLECT_ALL_CASH = "ALL_CASH"
    this.COLLECT_PART_OF_CASH = "PART_OF_CASH"
    this.SUE_POWER_ONLINE = 2001
    this.SUE_POWER_OFF = 2002
    this.SUE_POWER_OFFLINE = 2003
    this.SUE_POWER_OFF_OFFLINE = 2004
    this.SUE_STATUS_EMPTY = 11
    this.SUE_STATUS_NEAREMPTY = 12
    this.SUE_STATUS_EMPTYOK = 13
    this.SUE_STATUS_FULL = 21
    this.SUE_STATUS_NEARFULL = 22
    this.SUE_STATUS_FULLOK = 23
    this.SUE_STATUS_JAM = 31
    this.SUE_STATUS_JAMOK = 32
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
CashChanger.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    client_oncashcounts: function (data) {
        try {
            if (this.oncashcounts == null) {
                return
            }
            this.oncashcounts(data)
        } catch (e) { }
        return
    },
    client_onstatuschange: function (data) {
        try {
            if (this.onstatuschange == null) {
                return
            }
            this.onstatuschange(data)
        } catch (e) { }
        return
    },
    client_ondeposit: function (data) {
        try {
            if (this.ondeposit == null) {
                return
            }
            this.ondeposit(data)
        } catch (e) { }
        return
    },
    client_ondispense: function (data) {
        try {
            if (this.ondispense == null) {
                return
            }
            this.ondispense(data)
        } catch (e) { }
        return
    },
    client_oncollect: function (data) {
        try {
            if (this.oncollect == null) {
                return
            }
            this.oncollect(data)
        } catch (e) { }
        return
    },
    client_onconfigchange: function (data) {
        try {
            if (this.onconfigchange == null) {
                return
            }
            this.onconfigchange(data)
        } catch (e) { }
        return
    },
    client_oncommandreply: function (data) {
        try {
            if (this.oncommandreply == null) {
                return
            }
            if (typeof data.command != "") { } else {
                var hexData = data.data
                hexData = hexData.replace(/[0-9a-fA-F]{2}/g, function (c) {
                    var hexNum = parseInt(c, 16)
                    return String.fromCharCode(hexNum)
                })
                data.data = hexData
            }
            this.oncommandreply(data)
        } catch (e) { }
        return
    },
    client_ondirectio: function (data) {
        try {
            if (this.ondirectio == null) {
                return
            }
            this.ondirectio(data)
        } catch (e) { }
        return
    },
    client_onstatusupdate: function (data) {
        try {
            if (this.onstatusupdate == null) {
                return
            }
            this.onstatusupdate(data)
        } catch (e) { }
        return
    },
    readCashCounts: function () {
        var data = {
            type: "readcashcounts"
        }
        return this.send(data)
    },
    beginDeposit: function () {
        var data = {
            type: "begindeposit"
        }
        return this.send(data)
    },
    pauseDeposit: function () {
        var data = {
            type: "pausedeposit"
        }
        return this.send(data)
    },
    restartDeposit: function () {
        var data = {
            type: "restartdeposit"
        }
        return this.send(data)
    },
    endDeposit: function (cmd) {
        var data = {
            type: "enddeposit",
            cmd: cmd
        }
        return this.send(data)
    },
    dispenseCash: function (data) {
        var data_
        if (typeof data == "object") {
            data_ = data
            data_.type = "dispensecash"
        } else {
            data_ = {
                type: "dispensecash",
                cash: data
            }
        }
        return this.send(data_)
    },
    dispenseChange: function (cash) {
        var data_
        if (typeof cash == "object") {
            data_ = cash
            data_.type = "dispensechange"
        } else {
            data_ = {
                type: "dispensechange",
                cash: cash
            }
        }
        return this.send(data_)
    },
    openDrawer: function () {
        var data = {
            type: "opendrawer"
        }
        return this.send(data)
    },
    collectCash: function (collectMode) {
        var data = {
            type: "collectcash",
            collectmode: collectMode
        }
        return this.send(data)
    },
    setConfig: function (config, value) {
        var data = null
        switch (config) {
            case this.CONFIG_COUNT_MODE:
                data = {
                    type: "setconfig",
                    config: config,
                    mode: value.mode
                }
                break
            case this.CONFIG_LEFT_CASH:
                if ((value.bills == null) || (value.bills == "")) {
                    value.bills = "0"
                }
                if ((value.coins == null) || (value.coins == "")) {
                    value.coins = "0"
                }
                data = {
                    type: "setconfig",
                    config: config,
                    bills: value.bills,
                    coins: value.coins
                }
                break
            default:
                break
        }
        var sq = -1
        if (data != null) {
            sq = this.send(data)
        }
        return sq
    },
    sendCommand: function (command) {
        var data
        if (typeof command == "object") {
            data = command
            data.type = "sendcommand"
        } else {
            data = {
                type: "sendcommand",
                command: toHexBinary(command)
            }
        }
        return this.send(data)
    },
    callEvent: function (eventName, data) {
        var eventReq = data
        eventReq.type = eventName
        return this.send(eventReq)
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