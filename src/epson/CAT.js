function CAT(deviceID, isCrypto) {
    this.SUE_LOGSTATUS_OK = 0
    this.SUE_LOGSTATUS_NEARFULL = 1
    this.SUE_LOGSTATUS_FULL = 2
    this.SUE_POWER_ONLINE = 2001
    this.SUE_POWER_OFF_OFFLINE = 2004
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.timeout = 0
    this.trainingMode = false
    this.connectionObj = null
}
CAT.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    authorizeSales: function (data) {
        var _data = {
            service: data.service,
            total_amount: data.totalAmount,
            amount: data.amount,
            tax: data.tax,
            sequence: data.sequence,
            additional_security_information: data.additionalSecurityInformation,
        }
        _data.type = "authorizesales"
        _data.training = this.trainingMode
        _data.timeout = this.timeout
        return this.send(_data)
    },
    authorizeVoid: function (data) {
        var _data = {
            service: data.service,
            total_amount: data.totalAmount,
            amount: data.amount,
            tax: data.tax,
            sequence: data.sequence,
            additional_security_information: data.additionalSecurityInformation
        }
        _data.type = "authorizevoid"
        _data.training = this.trainingMode
        _data.timeout = this.timeout
        return this.send(_data)
    },
    authorizeRefund: function (data) {
        var _data = {
            service: data.service,
            total_amount: data.totalAmount,
            amount: data.amount,
            tax: data.tax,
            sequence: data.sequence,
            additional_security_information: data.additionalSecurityInformation
        }
        _data.type = "authorizerefund"
        _data.training = this.trainingMode
        _data.timeout = this.timeout
        return this.send(_data)
    },
    authorizeCompletion: function (data) {
        var _data = {
            service: data.service,
            total_amount: data.totalAmount,
            amount: data.amount,
            tax: data.tax,
            sequence: data.sequence,
            additional_security_information: data.additionalSecurityInformation
        }
        _data.type = "authorizecompletion"
        _data.training = this.trainingMode
        _data.timeout = this.timeout
        return this.send(_data)
    },
    accessDailyLog: function (data) {
        var _data = {
            service: data.service,
            total_amount: data.totalAmount,
            sequence: data.sequence,
            dailylog_type: data.dailylogType,
            additional_security_information: data.additionalSecurityInformation
        }
        _data.type = "accessdailylog"
        _data.training = this.trainingMode
        _data.timeout = this.timeout
        return this.send(_data)
    },
    sendCommand: function (data) {
        var _data = {
            service: data.service,
            command: data.command,
            data: data.data,
            string: data.string,
            additional_security_information: data.additionalSecurityInformation
        }
        _data.type = "sendcommand"
        _data.training = this.trainingMode
        return this.send(_data)
    },
    checkConnection: function (data) {
        var _data = {
            type: "checkconnection",
            additional_security_information: data.additionalSecurityInformation
        }
        _data.timeout = this.timeout
        return this.send(_data)
    },
    clearOutput: function () {
        var _data = {
            type: "clearoutput"
        }
        return this.send(_data)
    },
    send: function (data) {
        var tmp = this.deviceID
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    },
    client_onauthorizesales: function (data) {
        try {
            if (this.onauthorizesales == null) {
                return
            }
            this.onauthorizesales(this.getResultObject(data))
        } catch (e) { }
        return
    },
    client_onauthorizevoid: function (data) {
        try {
            if (this.onauthorizevoid == null) {
                return
            }
            this.onauthorizevoid(this.getResultObject(data))
        } catch (e) { }
        return
    },
    client_onauthorizerefund: function (data) {
        try {
            if (this.onauthorizerefund == null) {
                return
            }
            this.onauthorizerefund(this.getResultObject(data))
        } catch (e) { }
        return
    },
    client_onauthorizecompletion: function (data) {
        try {
            if (this.onauthorizecompletion == null) {
                return
            }
            this.onauthorizecompletion(this.getResultObject(data))
        } catch (e) { }
        return
    },
    client_onaccessdailylog: function (data) {
        try {
            if (this.onaccessdailylog == null) {
                return
            }
            this.onaccessdailylog(this.getDailyLogObject(data))
        } catch (e) { }
        return
    },
    client_oncommandreply: function (data) {
        try {
            if (this.oncommandreply == null) {
                return
            }
            this.oncommandreply(this.getCommandReplyObject(data))
        } catch (e) { }
        return
    },
    client_oncheckconnection: function (data) {
        try {
            if (this.oncheckconnection == null) {
                return
            }
            this.oncheckconnection(data)
        } catch (e) { }
        return
    },
    client_onclearoutput: function (data) {
        try {
            if (this.onclearoutput == null) {
                return
            }
            this.onclearoutput(data)
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
    getResultObject: function (data) {
        return ({
            status: data.status,
            sequence: data.sequence,
            service: data.service,
            accountNumber: data.account_number,
            settledAmount: data.settled_amount,
            slipNumber: data.slip_number,
            kid: data.kid,
            approvalCode: data.approval_code,
            transactionNumber: data.transaction_number,
            paymentCondition: data.payment_condition,
            voidSlipNumber: data.void_slip_number,
            balance: data.balance,
            transactionType: data.transaction_type,
            additionalSecurityInformation: data.additional_security_information
        })
    },
    getDailyLogObject: function (data) {
        var dailylogData = {}
        dailylogData.status = data.status
        dailylogData.service = data.service
        dailylogData.sequence = data.sequence
        var logList = []
        try {
            data.daily_log.forEach(function (log) {
                var logData = {}
                if (log === 0) {
                    throw logList
                }
                logData.kid = log.kid
                logData.salesCount = log.sales_count
                logData.salesAmount = log.sales_amount
                logData.voidCount = log.void_count
                logData.voidAmount = log.void_amount
                logList.push(logData)
            })
        } catch (e) { }
        dailylogData.dailyLog = logList
        return dailylogData
    },
    getCommandReplyObject: function (data) {
        return ({
            status: data.status,
            command: data.command,
            data: data.data,
            string: data.string,
            service: data.service,
            sequence: data.sequence,
            accountNumber: data.account_number,
            settledAmount: data.settled_amount,
            slipNumber: data.slip_number,
            transactionNumber: data.transaction_number,
            paymentCondition: data.payment_condition,
            balance: data.balance,
            additionalSecurityInformation: data.additional_security_information,
        })
    },
    callEvent: function (eventName, data) {
        var eventReq = data
        eventReq.type = eventName
        return this.send(eventReq)
    }
}