var MessageFactory = (function () {
    var PUBKEY_TEST_TEXT = "hello"
    var sequence = 0
    var cipher = new ePosCrypto()
    getNextSequence = function () {
        sequence++
        if (Number.MAX_VALUE == sequence) {
            sequence = 1
        }
        return String(sequence)
    }
    return {
        parseRequestMessage: function (message) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = message[0]
            switch (eposmsg.request) {
                case eposmsg.REQUEST.CONNECT:
                    eposmsg.data = message[1]
                    break
                case eposmsg.REQUEST.PUBKEY:
                case eposmsg.REQUEST.ADMININFO:
                case eposmsg.REQUEST.RECONNECT:
                case eposmsg.REQUEST.DISCONNECT:
                    eposmsg.code = message[1]
                    eposmsg.data = message[2]
                    break
                case eposmsg.REQUEST.OPENDEVICE:
                case eposmsg.REQUEST.CLOSEDEVICE:
                    eposmsg.deviceId = message[1]
                    eposmsg.code = message[2]
                    eposmsg.data = message[3]
                    eposmsg.data_id = message[4]
                    break
                case eposmsg.REQUEST.DEVICEDATA:
                    eposmsg.sequence = message[1]
                    eposmsg.deviceId = message[2]
                    eposmsg.data = message[3]
                    eposmsg.data_id = message[4]
                    break
                case eposmsg.REQUEST.SERVICEDATA:
                    eposmsg.sequence = message[1]
                    eposmsg.serviceId = message[2]
                    eposmsg.isCrypto = message[3]
                    eposmsg.data = message[4]
                    eposmsg.data_id = message[5]
                    break
                case eposmsg.REQUEST.OPENCOMMBOX:
                case eposmsg.REQUEST.CLOSECOMMBOX:
                case eposmsg.REQUEST.COMMDATA:
                    eposmsg.sequence = message[1]
                    eposmsg.data = message[2]
                    eposmsg.data_id = message[3]
                    break
                case eposmsg.REQUEST.ERROR:
                    eposmsg.sequence = message[1]
                    eposmsg.deviceId = message[2]
                    eposmsg.code = message[3]
                    eposmsg.data = message[4]
                    eposmsg.data_id = message[5]
                    break
                default:
                    eposmsg = null
            }
            return eposmsg
        },
        getPubkeyMessage: function (prime, key) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.PUBKEY
            cipher.genClientKeys(prime, key)
            var testData = cipher.bfEncrypt(PUBKEY_TEST_TEXT)
            var pubkey = bigInt2str(cipher.pubkey_c, 16)
            while (pubkey.length < 192) {
                pubkey = "0" + pubkey
            }
            eposmsg.data = {
                key: pubkey,
                testData: testData
            }
            return eposmsg
        },
        getAdminInfoMessage: function () {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.ADMININFO
            eposmsg.data = {}
            return eposmsg
        },
        getReconnectMessage: function (prevId, curId, dataId) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.RECONNECT
            eposmsg.data = {
                old_client_id: prevId,
                new_client_id: curId,
                received_id: dataId
            }
            return eposmsg
        },
        getDisconnectMessage: function (connectionId) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.DISCONNECT
            eposmsg.data = {
                client_id: connectionId
            }
            return eposmsg
        },
        getOpenDeviceMessage: function (deviceId, deviceType, isCrypto, isBufferEnable) {
            var eposmsg = new ePosDeviceMessage()
            var deviceTypeName = deviceType
            if (deviceTypeName == "type_hybrid_printer2") {
                deviceTypeName = "type_hybrid_printer"
            }
            eposmsg.request = eposmsg.REQUEST.OPENDEVICE
            eposmsg.deviceId = deviceId
            eposmsg.data = {
                type: deviceTypeName,
                crypto: isCrypto,
                buffer: isBufferEnable
            }
            return eposmsg
        },
        getCloseDeviceMessage: function (deviceId) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.CLOSEDEVICE
            eposmsg.deviceId = deviceId
            eposmsg.data = {}
            return eposmsg
        },
        getDeviceDataMessage: function (deviceId, data, crypto) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.DEVICEDATA
            eposmsg.sequence = getNextSequence()
            eposmsg.deviceId = deviceId
            if (crypto) {
                eposmsg.data = cipher.bfEncrypt(JSON.stringify(data))
            } else {
                eposmsg.data = data
            }
            return eposmsg
        },
        getServiceMessage: function (serviceId, isCrypt, data) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.SERVICEDATA
            eposmsg.sequence = getNextSequence()
            eposmsg.serviceId = serviceId
            eposmsg.isCrypto = isCrypt
            if (isCrypt) {
                eposmsg.data = cipher.bfEncrypt(JSON.stringify(data))
            } else {
                eposmsg.data = data
            }
            return eposmsg
        },
        getOpenCommBoxMessage: function (data) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.OPENCOMMBOX
            eposmsg.sequence = getNextSequence()
            eposmsg.data = data
            return eposmsg
        },
        getCloseCommBoxMessage: function (data) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.CLOSECOMMBOX
            eposmsg.sequence = getNextSequence()
            eposmsg.data = data
            return eposmsg
        },
        getCommBoxDataMessage: function (data) {
            var eposmsg = new ePosDeviceMessage()
            eposmsg.request = eposmsg.REQUEST.COMMDATA
            eposmsg.sequence = getNextSequence()
            eposmsg.data = data
            return eposmsg
        },
        decrypt: function (data) {
            var decryptoData = cipher.bfDecrypt(data)
            return JSON.parse(decryptoData)
        },
    }
}())