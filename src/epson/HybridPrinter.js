function HybridPrinter(deviceID, isCrypto, ePOSDeviceContext) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.ePosDev = ePOSDeviceContext
    this.connectionObj = null
    this.ReceiptPrinter
    this.SlipPrinter
    this.EndorsePrinter
    this.MICRReader
    this.force = false
    this.onstatuschange
    this.ononline
    this.onoffline
    this.onpoweroff
    this.oncoveropen
    this.onpaperok
    this.onpapernearend
    this.onpaperend
    this.ondrawerclosed
    this.ondraweropen
    this.ASB_NO_RESPONSE = 1
    this.ASB_PRINT_SUCCESS = 2
    this.ASB_DRAWER_KICK = 4
    this.ASB_OFF_LINE = 8
    this.ASB_COVER_OPEN = 32
    this.ASB_PAPER_FEED = 64
    this.ASB_WAIT_ON_LINE = 256
    this.ASB_PANEL_SWITCH = 512
    this.ASB_MECHANICAL_ERR = 1024
    this.ASB_AUTOCUTTER_ERR = 2048
    this.ASB_UNRECOVER_ERR = 8192
    this.ASB_AUTORECOVER_ERR = 16384
    this.ASB_RECEIPT_NEAR_END = 131072
    this.ASB_RECEIPT_END = 524288
    this.ASB_TOF_NOPAPER = 2097152
    this.ASB_BOF_NOPAPER = 4194304
    this.ASB_SLIP_NO_SELECT = 16777216
    this.ASB_SLIP_IMPOSSIBLE_PRINT = 33554432
    this.ASB_SPOOLER_IS_STOPPED = 2147483648
    this.SUCCESS = "SUCCESS"
    this.CANCEL = "CANCEL"
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER"
    this.ERROR_COMMAND = "ERROR_COMMAND"
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND"
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY"
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED"
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN"
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT"
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL"
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE"
    this.ERROR_BADPORT = "ERROR_BADPORT"
    this.SYSTEM_ERROR = "SYSTEM_ERROR"
    this.init(deviceID)
}
HybridPrinter.prototype = {
    init: function (deviceID) {
        var obj = this
        obj.deviceID = deviceID
        obj.ReceiptPrinter = new ReceiptPrinter(this)
        obj.SlipPrinter = new SlipPrinter(this)
        obj.EndorsePrinter = new EndorsePrinter(this)
        obj.MICRReader = new MICRReader(this)
        obj.ReceiptPrinter.onstatuschange = function (status) {
            if (obj.onstatuschange != null) {
                obj.onstatuschange(status)
            }
        }
        obj.ReceiptPrinter.ononline = function () {
            if (obj.ononline != null) {
                obj.ononline()
            }
        }
        obj.ReceiptPrinter.onoffline = function () {
            if (obj.onoffline != null) {
                obj.onoffline()
            }
        }
        obj.ReceiptPrinter.onpoweroff = function () {
            if (obj.onpoweroff != null) {
                obj.onpoweroff()
            }
        }
        obj.ReceiptPrinter.oncoveropen = function () {
            if (obj.oncoveropen != null) {
                obj.oncoveropen()
            }
        }
        obj.ReceiptPrinter.onpaperok = function () {
            if (obj.onpaperok != null) {
                obj.onpaperok()
            }
        }
        obj.ReceiptPrinter.onpapernearend = function () {
            if (obj.onpapernearend != null) {
                obj.onpapernearend()
            }
        }
        obj.ReceiptPrinter.onpaperend = function () {
            if (obj.onpaperend != null) {
                obj.onpaperend()
            }
        }
        obj.ReceiptPrinter.ondrawerclosed = function () {
            if (obj.ondrawerclosed != null) {
                obj.ondrawerclosed()
            }
        }
        obj.ReceiptPrinter.ondraweropen = function () {
            if (obj.ondraweropen != null) {
                obj.ondraweropen()
            }
        }
    },
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
        this.ReceiptPrinter.setConnectionObject(this.connectionObj)
    },
    lock: function () {
        var data = {
            type: "lock"
        }
        return this.send(data)
    },
    unlock: function () {
        var data = {
            type: "unlock"
        }
        return this.send(data)
    },
    eject: function () {
        var data = {
            type: "eject"
        }
        return this.send(data)
    },
    recover: function () {
        return this.ReceiptPrinter.recover()
    },
    reset: function () {
        this.ReceiptPrinter.force = this.force
        var ret = this.ReceiptPrinter.reset()
        this.force = false
        return ret
    },
    startMonitor: function () {
        return this.ReceiptPrinter.startMonitor()
    },
    stopMonitor: function () {
        return this.ReceiptPrinter.stopMonitor()
    },
    client_onreceive: function (res, sq) {
        switch (res.eventtype) {
            case "slipprint":
            case "slipcancel":
                this.SlipPrinter.fireOnReceive(res, sq)
                break
            case "endorseprint":
            case "endorsecancel":
                this.EndorsePrinter.fireOnReceive(res, sq)
                break
            case "micrread":
            case "micrcleaning":
            case "micrcancel":
                this.MICRReader.fireOnReceive(res, sq)
                break
            case "print":
                var tmp = res
                tmp.eventtype = this.ReceiptPrinter.methodName
                this.fireOnReceive(tmp, sq)
                break
            default:
                this.fireOnReceive(res, sq)
                break
        }
    },
    client_onxmlresult: function (res, sq) {
        this.ReceiptPrinter.fireOnReceive(res, sq)
    },
    fireOnReceive: function (res, sq) {
        if (this.onreceive == null) {
            return
        }
        if (res == null) {
            return
        }
        this.onreceive({
            eventtype: res.eventtype,
            success: res.success,
            code: res.code,
            status: res.status
        }, sq)
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