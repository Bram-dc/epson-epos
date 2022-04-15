import io from 'socket.io-client'
import { ConnectionIFType, ConnectionRequestResult, ConnectionResult, ConnectionStatus, DeviceType } from '../functions/enums'
import MessageFactory from '../MessageFactory'
import CommBoxManager from './CommBoxManager'
import Connection from './Connection'
import CookieIO from './CookieIO'
import DeviceObjectSelector from './DeviceObjectSelector'
import DeviceObjElement from './DeviceObjElement'
import Ofsc from './Ofsc'
import SocketGarbageBox from './SocketGarbageBox'

const IFPORT_EPOSDEVICE = 8008
const IFPORT_EPOSDEVICE_S = 8043

const CONNECT_TIMEOUT = 15000
const RECONNECT_TIMEOUT = 3000

const MAX_RECONNECT_RETRY = 5

export default class ePOSDevice {
    socket = null
    connectionId = null
    reconnectTimerId = null
    reconnectTryCount = 0
    admin = ''
    location = ''
    recievedDataId = 0
    connectStartTime = 0
    waitRetryConnectId = 0
    conectionObj = new Connection()
    commBoxManager = new CommBoxManager()
    devObjSelector = new DeviceObjectSelector()
    devObjElmMap = new DeviceObjElementMap()
    ofsc = new Ofsc()
    cookieIo = new CookieIO()
    gbox = new SocketGarbageBox()
    eposprint = false

    constructor() {

        window.onbeforeunload = () => this.disconnect()

        window.onpagehide = () => this.disconnect()

        this.commBoxManager.setConnectionObject(this.conectionObj)

        this.devObjSelector.setConnectionObject(this.conectionObj)

        this.ofsc.setConnectionObject(this.conectionObj)

    }

    connect(address: string, port: number, callback: (result: ConnectionRequestResult) => void, options: { eposprint: boolean }) {

        if (this.conectionObj.status(ConnectionIFType.IF_EPOSDEVICE) !== ConnectionStatus.DISCONNECT || this.conectionObj.status(ConnectionIFType.IF_EPOSPRINT) !== ConnectionStatus.DISCONNECT)
            this.disconnect()

        this.connectStartTime = (new Date).getTime()

        const protocol = port === IFPORT_EPOSDEVICE ? 'http' : 'https'

        this.conectionObj.setAddress(protocol, address, port)
        this.conectionObj.registCallback(callback)

        this.eposprint = arguments.length >= 4 ? options.eposprint : false

        if (!this.eposprint)
            return this.connectBySocketIo(CONNECT_TIMEOUT, protocol)

        this.conectionObj.probeWebServiceIF(accessTime => {

            const result = this.conectionObj.isUsablePrintIF() ? ConnectionRequestResult.OK : ConnectionRequestResult.ERROR_PARAMETER

            callback(result)

        })

    }

    isConnected() {

        let devIsConnect = false
        let wsIsConnect = false

        switch (this.conectionObj.status(ConnectionIFType.IF_EPOSDEVICE)) {

            case ConnectionStatus.CONNECT:
            case ConnectionStatus.RECONNECTING:
                devIsConnect = true
                break
            case ConnectionStatus.DISCONNECT:
                break

        }

        if (this.conectionObj.status(ConnectionIFType.IF_EPOSPRINT) === ConnectionStatus.CONNECT)
            wsIsConnect = true

        return devIsConnect || wsIsConnect

    }

    disconnect() {

        const eposmsg = MessageFactory.getDisconnectMessage(this.connectionId)

        this.conectionObj.emit(eposmsg)

        this.cleanup()

    }

    createDevice(deviceId, deviceType, options, callback) {

        try {

            if (!this.isConnected())
                throw new Error(ConnectionResult.ERROR_SYSTEM)

            if (this.devObjElmMap.get(deviceId) != null)
                throw new Error(ConnectionResult.ERROR_DEVICE_IN_USE)

            if (!this.devObjSelector.isSelectable(deviceType))
                throw new Error(ConnectionResult.ERROR_DEVICE_NOT_FOUND)

            let isCrypto = false
            let isBufferEnable = false
            if (typeof options === 'boolean') {

                isCrypto = options

            } else {

                if (typeof options.crypto === 'boolean')
                    isCrypto = options.crypto

                if (typeof options.buffer === 'boolean')
                    isBufferEnable = options.buffer

            }

            if (deviceType == DeviceType.DT) {
                isCrypto = true
                deviceId = 'local_dt'
            }

            const deviceObject = this.devObjSelector.select(deviceId, deviceType, options.driver, isCrypto, this)

            deviceObject.setConnectionObject(this.conectionObj)

            const element = new DeviceObjElement(deviceId, isCrypto, deviceObject, callback)

            this.devObjElmMap.add(element)

            if (this.conectionObj.isUsableDeviceIF()) {

                const eposmsg = MessageFactory.getOpenDeviceMessage(deviceId, deviceType, isCrypto, isBufferEnable)

                this.conectionObj.emit(eposmsg)

            } else {

                this.checkEposPrintService(deviceId, deviceType, result => {

                    if (result == this.RESULT_OK) {

                        callback(deviceObject, this.RESULT_OK)

                    } else {

                        callback(null, this.ERROR_DEVICE_NOT_FOUND)

                    }

                })
            }

        } catch (e) {

            let message = e.message

            if (message === null || message === '')
                message = ConnectionResult.ERROR_DEVICE_OPEN

            if (callback !== null)
                callback(null, message)

        }

    }

    deleteDevice(deviceObject, callback) {

        try {
            var element = this.devObjElmMap.getByObj(deviceObject)
            if (element == null) {
                throw new Error(this.ERROR_DEVICE_NOT_OPEN)
            }
            if (this.conectionObj.isUsableDeviceIF()) {
                element.callback = callback
                var eposmsg = MessageFactory.getCloseDeviceMessage(element.deviceId)
                this.conectionObj.emit(eposmsg)
            } else {
                try {
                    deviceObject.finalize()
                } catch (e) { }
                this.devObjElmMap.remove(element.deviceId)
                callback(this.RESULT_OK)
            }
        } catch (e) {
            var message = e.message
            if ((message == null) || (message == '')) {
                message = this.ERROR_DEVICE_CLOSE
            }
            if (callback != null) {
                callback(message)
            }
        }
    }

    getAdmin() {

        return this.admin

    }

    getLocation() {

        return this.location

    }

    sendOfscXml(xml: string, timeout: number, crypto: boolean, callback: (data: string) => void) {

        this.ofsc.send(xml, timeout, crypto, callback)

    }

    getCommBoxManager() {

        if (this.conectionObj.status(ConnectionIFType.IF_EPOSDEVICE) !== ConnectionStatus.CONNECT)
            return null

        return this.commBoxManager

    }

    cleanup() {

        if (this.waitRetryConnectId != 0) {
            clearTimeout(this.waitRetryConnectId)
            this.waitRetryConnectId = 0
        }

        this.connectStartTime = 0
        this.gbox.stock(this.socket)
        this.gbox.dispose()

        let devObjList = this.devObjElmMap.getElementList()

        devObjList.forEach(function (obj) {
            try {
                obj.deviceObject.finalize()
            } catch (e) { }
        })

        devObjList = null

        this.devObjElmMap.removeAll()
        if ((this.ondisconnect != null) && (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) != this.conectionObj.DISCONNECT || this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) != this.conectionObj.DISCONNECT)) {
            this.ondisconnect()
        }
        this.cookieIo.writeId('', this.conectionObj.address_p)
        this.conectionObj.changeStatus(this.conectionObj.IF_ALL, this.conectionObj.DISCONNECT)
        this.socket = null
        this.conectionObj.setSocket(null)
        this.connectionId = null
        this.conectionObj.setAddress('', '', '')
        if (this.reconnectTimerId != null) {
            clearInterval(this.reconnectTimerId)
        }
        this.reconnectTimerId = null
        this.reconnectTryCount = 0
        this.admin = ''
        this.location = ''
        this.recievedDataId = 0
        this.eposprint = false

    }

    connectBySocketIo(timeout) {

        var selfofProb = this.conectionObj
        var url = selfofProb.getSocketIoURL()
        this.socket = io.connect(url, {
            reconnect: false,
            'connect timeout': timeout,
            'force new connection': true,
        })
        this.conectionObj.setSocket(this.socket)
        var self = this
        this.socket.on('connect', function (data) {
            try {
                self.gbox.dispose()
            } catch (e) { }
        })
        this.socket.on('close', function () {
            selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE, tselfofProb.DISCONNECT)
        })
        this.socket.on('disconnect', function (data) {
            try {
                if (selfofProb.status(selfofProb.IF_EPOSDEVICE) == selfofProb.RECONNECTING) {
                    return
                } else {
                    if (self.cookieIo.readId(self.conectionObj.address_p) == '' && self.connectionId == null) {
                        self.cleanup()
                    } else {
                        self.startReconnectAction()
                    }
                }
            } catch (e) { }
        })
        this.socket.on('error', function () {
            try {
                selfofProb.probeWebServiceIF(function (accessTime) {
                    if (selfofProb.isUsablePrintIF()) {
                        self.eposprint = true
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_NONE)
                    } else {
                        selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE, selfofProb.DISCONNECT)
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_TIMEOUT)
                    }
                })
            } catch (e) { }
        })
        this.socket.on('connect_failed', function () {
            try {
                selfofProb.probeWebServiceIF(function (accessTime) {
                    if (selfofProb.isUsablePrintIF()) {
                        self.eposprint = true
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_NONE)
                    } else {
                        selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE, selfofProb.DISCONNECT)
                        selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE, selfofProb.ACCESS_TIMEOUT)
                    }
                })
            } catch (e) { }
        })
        this.socket.on('message', function (data) {
            try {
                var eposmsg = MessageFactory.parseRequestMessage(data)
                if (eposmsg.data_id != '') {
                    self.recievedDataId = eposmsg.data_id
                }
                switch (eposmsg.request) {
                    case eposmsg.REQUEST.CONNECT:
                        self.procConnect(eposmsg)
                        break
                    case eposmsg.REQUEST.PUBKEY:
                        self.procPubkey(eposmsg)
                        break
                    case eposmsg.REQUEST.ADMININFO:
                        self.procAdminInfo(eposmsg)
                        break
                    case eposmsg.REQUEST.RECONNECT:
                        self.procReconnect(eposmsg)
                        break
                    case eposmsg.REQUEST.DISCONNECT:
                        self.procDisconnect(eposmsg)
                        break
                    case eposmsg.REQUEST.OPENDEVICE:
                        self.procOpenDevice(eposmsg)
                        break
                    case eposmsg.REQUEST.CLOSEDEVICE:
                        self.procCloseDevice(eposmsg)
                        break
                    case eposmsg.REQUEST.DEVICEDATA:
                        self.procDeviceData(eposmsg)
                        break
                    case eposmsg.REQUEST.SERVICEDATA:
                        self.procServiceData(eposmsg)
                        break
                    case eposmsg.REQUEST.OPENCOMMBOX:
                        self.procOpenCommBox(eposmsg)
                        break
                    case eposmsg.REQUEST.CLOSECOMMBOX:
                        self.procCloseCommBox(eposmsg)
                        break
                    case eposmsg.REQUEST.COMMDATA:
                        self.procCommBoxData(eposmsg)
                        break
                    case eposmsg.REQUEST.ERROR:
                        self.procError(eposmsg)
                        break
                    default:
                        return
                }
            } catch (e) { }
        })
    }

    procConnect(eposmsg) {

        try {
            if (this.reconnectTimerId != null) {
                clearInterval(this.reconnectTimerId)
                this.reconnectTimerId = null
            }
            var response = null
            var prevConnectionId = this.cookieIo.readId(this.conectionObj.address_p)
            if (eposmsg.data.protocol_version < 2) {
                response = MessageFactory.getPubkeyMessage(eposmsg.data.prime, eposmsg.data.key)
                this.conectionObj.emit(response)
            } else {
                if (this.connectionId != null) {
                    response = MessageFactory.getReconnectMessage(this.connectionId, eposmsg.data.client_id, this.recievedDataId)
                    this.conectionObj.emit(response)
                } else {
                    if (prevConnectionId != '') {
                        response = MessageFactory.getDisconnectMessage(prevConnectionId)
                        this.conectionObj.emit(response)
                        response = MessageFactory.getPubkeyMessage(eposmsg.data.prime, eposmsg.data.key)
                        this.conectionObj.emit(response)
                    } else {
                        response = MessageFactory.getPubkeyMessage(eposmsg.data.prime, eposmsg.data.key)
                        this.conectionObj.emit(response)
                    }
                }
            }
            this.cookieIo.writeId(eposmsg.data.client_id, this.conectionObj.address_p)
            this.connectionId = eposmsg.data.client_id
        } catch (e) {
            this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
            this.cleanup()
        }

    }

    procPubkey(eposmsg) {

        try {
            if (eposmsg.code == 'SHARED_KEY_MISMATCH_ERROR') {
                var mismatchErrTime = new Date().getTime()
                var mismatchTimeout = 0
                if (this.connectStartTime != 0) {
                    mismatchTimeout = mismatchErrTime - this.connectStartTime
                    if (mismatchTimeout < this.CONNECT_TIMEOUT) {
                        var self = this
                        this.gbox.stock(this.socket)
                        this.connectionId = null
                        this.waitRetryConnectId = setTimeout(function () {
                            self.connectBySocketIo(self.CONNECT_TIMEOUT - mismatchTimeout)
                        }, 100)
                    } else {
                        this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_TIMEOUT)
                        this.cleanup()
                    }
                } else {
                    this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_TIMEOUT)
                    this.cleanup()
                }
            } else {
                if (eposmsg.code == 'PARAM_ERROR') {
                    this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
                    this.cleanup()
                } else {
                    var response = MessageFactory.getAdminInfoMessage()
                    this.conectionObj.emit(response)
                }
            }
        } catch (e) {
            this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
            this.cleanup()
        }

    }

    procAdminInfo(eposmsg) {

        if (this.eposprint) {
            return
        }
        if (eposmsg.code != this.RESULT_OK) {
            this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_ERROR)
            return
        }
        this.admin = eposmsg.data.admin_name
        this.location = eposmsg.data.location
        this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.ACCESS_OK)
    }

    procReconnect(eposmsg) {
        if (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) != this.conectionObj.RECONNECTING) {
            return
        }
        if (eposmsg.code == this.RESULT_OK) {
            this.conectionObj.changeStatus(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.CONNECT)
            if (this.onreconnect != null) {
                this.onreconnect()
            }
        } else {
            this.cleanup()
        }
    }

    procDisconnect(eposmsg) {

        //

    }

    procOpenDevice(eposmsg) {
        var deviceId = eposmsg.deviceId
        try {
            var element = this.devObjElmMap.get(deviceId)
            if (eposmsg.code == this.RESULT_OK) {
                if (element.callback != null) {
                    element.callback(element.deviceObject, eposmsg.code)
                }
            } else {
                if (element.callback != null) {
                    element.callback(null, eposmsg.code)
                }
                this.devObjElmMap.remove(deviceId)
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror('0', deviceId, this.ERROR_SYSTEM, null)
            }
        }
    }

    procCloseDevice(eposmsg) {
        var deviceId = eposmsg.deviceId
        try {
            if (eposmsg.code == this.RESULT_OK) {
                var element = this.devObjElmMap.get(deviceId)
                if (element.callback != null) {
                    element.callback(eposmsg.code)
                }
                try {
                    element.deviceObject.finalize()
                } catch (e) { }
                this.devObjElmMap.remove(deviceId)
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror('0', deviceId, this.ERROR_SYSTEM, null)
            }
        }
    }

    procDeviceData(eposmsg) {
        var deviceId = eposmsg.deviceId
        var sequence = eposmsg.sequence
        var data = eposmsg.data
        try {
            var devObjElm = this.devObjElmMap.get(deviceId)
            if (devObjElm.isCrypto) {
                data = MessageFactory.decrypt(data)
            }
            var deviceObject = devObjElm.deviceObject
            var method = 'client_' + data.type
            try {
                if (deviceObject instanceof OtherPeripheral) {
                    deviceObject.client_onreceive(data, sequence)
                } else {
                    eval('deviceObject.' + method + '(data, sequence)')
                }
            } catch (e) {
                eval('deviceObject.' + data.type + '(data, sequence)')
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, deviceId, this.ERROR_SYSTEM, null)
            }
        }
    }

    procServiceData(eposmsg) {
        try {
            switch (eposmsg.serviceId) {
                case 'OFSC':
                    this.ofsc.notify(eposmsg)
                    break
                default:
                    break
            }
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(eposmsg.sequence, eposmsg.serviceId, this.ERROR_SYSTEM, null)
            }
        }
    }

    procOpenCommBox(eposmsg) {
        var sequence = eposmsg.sequence
        try {
            this.commBoxManager.client_opencommbox(eposmsg.data, sequence)
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, '', this.ERROR_SYSTEM, null)
            }
        }
    }

    procCloseCommBox(eposmsg) {
        var sequence = eposmsg.sequence
        try {
            this.commBoxManager.client_closecommbox(eposmsg.data, sequence)
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, '', this.ERROR_SYSTEM, null)
            }
        }
    }

    procCommBoxData(eposmsg) {
        var sequence = eposmsg.sequence
        try {
            this.commBoxManager.executeCommDataCallback(eposmsg.data, sequence)
        } catch (e) {
            if (this.onerror != null) {
                this.onerror(sequence, '', this.ERROR_SYSTEM, null)
            }
        }
    }

    procError(eposmsg) {
        try {
            if (this.onerror != null) {
                this.onerror(eposmsg.sequence, eposmsg.deviceId, eposmsg.code, eposmsg.data)
            }
        } catch (e) { }
    }

    startReconnectAction() {
        if (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) == this.conectionObj.RECONNECTING) {
            return
        }
        this.conectionObj.changeStatus(this.conectionObj.IF_EPOSDEVICE, this.conectionObj.RECONNECTING)
        this.reconnectTryCount = 0
        var self = this
        this.reconnectTimerId = setInterval(function () {
            if (self.socket != null) {
                self.gbox.stock(self.socket)
            }
            if (self.reconnectTryCount == self.MAX_RECONNECT_RETRY) {
                clearInterval(self.reconnectTimerId)
                self.cleanup()
                return
            }
            if (self.conectionObj.status(self.conectionObj.IF_EPOSDEVICE) == self.conectionObj.RECONNECTING) {
                self.connectBySocketIo(self.RECONNECT_TIMEOUT)
            }
            self.reconnectTryCount++
        }, self.RECONNECT_TIMEOUT)
        if (this.reconnectTryCount == 0 && this.onreconnecting != null) {
            this.onreconnecting()
        }
    }

    checkEposPrintService(deviceId, deviceType, callback) {


        var OK = 'OK'
        var SSL_CONNECT_OK = 'SSL_CONNECT_OK'
        var ERROR_TIMEOUT = 'ERROR_TIMEOUT'
        var ERROR_PARAMETER = 'ERROR_PARAMETER'
        var ERROR_SYSTEM = 'SYSTEM_ERROR'
        var postUrl = null
        var printUrl = this.conectionObj.getAddressWithProtocol() + '/cgi-bin/epos/service.cgi?devid=' + deviceId + '&timeout=10000'
        var displayUrl = this.conectionObj.getAddressWithProtocol() + '/cgi-bin/eposDisp/service.cgi?devid=' + deviceId + '&timeout=10000'
        var postData = null
        var printData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>'
        var displayData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>'
        var xhr = null
        var tid
        var success

        if (deviceType == this.DEVICE_TYPE_DISPLAY) {
            postUrl = displayUrl
            postData = displayData
        } else {
            postUrl = printUrl
            postData = printData
        }



        const controller = new AbortController()

        let timedOut = false
        const timeout = setTimeout(() => {
            timedOut = true
            controller.abort()
        }, 5000)

        fetch(postUrl, {
            method: 'POST',
            signal: controller.signal,
            body: postData,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
                'SOAPAction': '""',
            },
        })
            .then(res => {

                clearTimeout(timeout)

                if (res.status === 200) {

                    res.text()
                        .then(text => {

                            const collection = new window
                                .DOMParser()
                                .parseFromString(text, 'text/xml')
                                .getElementsByTagName('response')

                            const success = collection.length ? /^(1|true)$/.test(collection[0].getAttribute('success') ?? '') : false

                            callback(success ? ConnectionRequestResult.OK : ConnectionRequestResult.ERROR_PARAMETER)

                        })
                        .catch(() => callback(ConnectionRequestResult.ERROR_PARAMETER))

                } else {

                    callback(ConnectionRequestResult.ERROR_PARAMETER)

                }

            })
            .catch(() => callback(timedOut ? ConnectionRequestResult.ERROR_TIMEOUT : ConnectionRequestResult.ERROR_PARAMETER))

    }

}