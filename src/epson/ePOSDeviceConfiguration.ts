const CGI_PATH = '/epson_eposdevice/getDeviceList.cgi'

const INTERVAL = 500
const TIMEOUT = 60 * 1000

const WEBSOCKET_PORT = 8008
const SSLWEBSOCKET_PORT = 8043

const RESULT_OK = 'OK'
const UNKNOWN = 'unknown'
const ONLINE = 'online'
const OFFLINE = 'offline'

export default class ePOSDeviceConfiguration {
    address: string
    cb = null
    message = null

    constructor(address: string) {

        this.address = address

    }

    getRegisterdDevices(type, callback) {

        this.cb = callback

        var self = this
        var xhr = null
        var protocol = window.location.protocol + '//'
        var param = '?group=' + type
        var url = protocol + this.address + CGI_PATH + param

        xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.setRequestHeader('Pragma', 'no-cache')
        xhr.setRequestHeader('Cache-Control', 'no-cache')
        xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT')
        xhr.onreadystatechange() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    self.message = self.RESULT_OK
                    var jsonObj = JSON.parse(xhr.responseText)
                    self.checkDevice(jsonObj, function (resultList) {
                        for (var key in resultList) {
                            for (var i = 0; i < jsonObj.length; i++) {
                                if (jsonObj[i].deviceId != key) {
                                    continue
                                }
                                jsonObj[i].status = resultList[key]
                            }
                        }
                        if (self.cb != null) {
                            self.cb(self, jsonObj)
                            self.cb = null
                        }
                    })
                } else {
                    self.message = 'Failed to get device list.'
                    if (self.cb != null) {
                        self.cb(self, null)
                        self.cb = null
                    }
                }
            }
        }
        xhr.send(null)
    }
    checkDevice(obj, callback) {
        var self = this
        var protocol = window.location.protocol
        var port = (protocol.match(/^(https:)/)) ? this.SSLWEBSOCKET_PORT : this.WEBSOCKET_PORT
        var ePosDev = new epson.ePOSDevice()
        var resultList = []
        for (var i = 0; i < obj.length; i++) {
            resultList[obj[i].deviceId] = self.UNKNOWN
        }
        ePosDev.onerror(sq, deviceId, result) {
            if (deviceId != '') {
                resultList[deviceId] = self.OFFLINE
            }
        }
        ePosDev.connect(this.address, port, function (data) {
            if ((data == 'OK') || (data == 'SSL_CONNECT_OK')) {
                for (var i = 0; i < obj.length; i++) {
                    ePosDev.createDevice(obj[i].deviceId, obj[i].deviceType, {}, function (data, code) {
                        resultList[data.deviceID] = (code == 'OK') ? self.ONLINE : self.OFFLINE
                        ePosDev.deleteDevice(data, null)
                    })
                }
            }
        })
        var timer
        timer = window.setInterval(function () {
            for (var key in resultList) {
                if (resultList[key] == self.UNKNOWN) {
                    return
                }
            }
            clearInterval(timer)
            if (callback != null) {
                callback(resultList)
            }
        }, self.INTERVAL)
        window.setTimeout(function () {
            clearInterval(timer)
            if (callback != null) {
                callback(resultList)
            }
        }, self.TIMEOUT)
    }

}