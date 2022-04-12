function ePOSPrint(address) {
    this.address = address
    this.enabled = false
    this.interval = 3000
    this.timeout = 300000
    this.status = 0
    this.battery = 0
    this.drawerOpenLevel = 0
    this.onreceive = null
    this.onerror = null
    this.onstatuschange = null
    this.ononline = null
    this.onoffline = null
    this.onpoweroff = null
    this.oncoverok = null
    this.oncoveropen = null
    this.onpaperok = null
    this.onpaperend = null
    this.onpapernearend = null
    this.ondrawerclosed = null
    this.ondraweropen = null
    this.onbatterylow = null
    this.onbatteryok = null
    this.onbatterystatuschange = null
    this.ASB_NO_RESPONSE = 1
    this.ASB_PRINT_SUCCESS = 2
    this.ASB_DRAWER_KICK = 4
    this.ASB_BATTERY_OFFLINE = 4
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
    this.ASB_BUZZER = 16777216
    this.ASB_WAIT_REMOVE_LABEL = 16777216
    this.ASB_NO_LABEL = 67108864
    this.ASB_SPOOLER_IS_STOPPED = 2147483648
    this.DRAWER_OPEN_LEVEL_LOW = 0
    this.DRAWER_OPEN_LEVEL_HIGH = 1
}
ePOSPrint.prototype = new ePOSBuilder()
ePOSPrint.prototype.constructor = ePOSPrint
ePOSPrint.prototype.open = function () {
    if (!this.enabled) {
        this.enabled = true
        this.status = 0
        this.battery = 0
        this.send()
    }
}
ePOSPrint.prototype.close = function () {
    this.enabled = false
    if (this.intervalid) {
        clearTimeout(this.intervalid)
        delete this.intervalid
    }
    if (this.intervalxhr) {
        this.intervalxhr.abort()
        delete this.intervalxhr
    }
}
ePOSPrint.prototype.getPrintJobStatus = function (printjobid) {
    this.send(printjobid)
}
ePOSPrint.prototype.send = function (request, printjobid) {
    var args = arguments.length,
        epos = this,
        address = epos.address,
        soap, xhr, tid, res, success, code, status, battery
    if (!/^<epos/.test(request)) {
        if (args < 2) {
            printjobid = request
            request = new ePOSBuilder().toString()
        } else {
            address = request
            request = printjobid
            printjobid = arguments[2]
        }
    }
    soap = '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'
    if (printjobid) {
        soap += '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' + printjobid + "</printjobid></parameter></s:Header>"
    }
    soap += "<s:Body>" + request + "</s:Body></s:Envelope>"
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
        if (!("withCredentials" in xhr) && window.XDomainRequest) {
            xhr = new XDomainRequest()
            xhr.open("POST", address, true)
            xhr.onload = function () {
                res = xhr.responseText
                if (/response/.test(res)) {
                    success = /success\s*=\s*"\s*(1|true)\s*"/.test(res)
                    code = res.match(/code\s*=\s*"\s*(\S*)\s*"/) ? RegExp.$1 : ""
                    status = res.match(/status\s*=\s*"\s*(\d+)\s*"/) ? parseInt(RegExp.$1) : 0
                    battery = res.match(/battery\s*=\s*"\s*(\d+)\s*"/) ? parseInt(RegExp.$1) : 0
                    printjobid = res.match(/<printjobid>\s*(\S*)\s*<\/printjobid>/) ? RegExp.$1 : ""
                    if (args > 0) {
                        fireReceiveEvent(epos, success, code, status, battery, printjobid)
                    } else {
                        fireStatusEvent(epos, status, battery)
                    }
                } else {
                    if (args > 0) {
                        fireErrorEvent(epos, 0, xhr.responseText)
                    } else {
                        fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                    }
                }
                if (args < 1) {
                    updateStatus(epos)
                }
            }
            xhr.onerror = function () {
                if (args > 0) {
                    fireErrorEvent(epos, 0, xhr.responseText)
                } else {
                    fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                    updateStatus(epos)
                }
            }
            xhr.onprogress = function () { }
            xhr.ontimeout = xhr.onerror
            xhr.timeout = epos.timeout
            xhr.send(soap)
        } else {
            xhr.open("POST", address, true)
            xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
            xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jan 1970 00:00:00 GMT")
            xhr.setRequestHeader("SOAPAction", '""')
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    clearTimeout(tid)
                    if (xhr.status == 200 && xhr.responseXML) {
                        res = xhr.responseXML.getElementsByTagName("response")
                        if (res.length > 0) {
                            success = /^(1|true)$/.test(res[0].getAttribute("success"))
                            code = res[0].hasAttribute("code") ? res[0].getAttribute("code") : ""
                            status = res[0].hasAttribute("status") ? parseInt(res[0].getAttribute("status")) : 0
                            battery = res[0].hasAttribute("battery") ? parseInt(res[0].getAttribute("battery")) : 0
                            res = xhr.responseXML.getElementsByTagName("printjobid")
                            printjobid = res.length > 0 ? res[0].textContent : ""
                            if (args > 0) {
                                fireReceiveEvent(epos, success, code, status, battery, printjobid)
                            } else {
                                fireStatusEvent(epos, status, battery)
                            }
                        } else {
                            if (args > 0) {
                                fireErrorEvent(epos, xhr.status, xhr.responseText)
                            } else {
                                fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                            }
                        }
                    } else {
                        if (args > 0) {
                            fireErrorEvent(epos, xhr.status, xhr.responseText)
                        } else {
                            fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0)
                        }
                    }
                    if (args < 1) {
                        updateStatus(epos)
                    }
                }
            }
            tid = setTimeout(function () {
                xhr.abort()
            }, epos.timeout)
            xhr.send(soap)
        }
        if (args < 1) {
            epos.intervalxhr = xhr
        }
    } else {
        throw new Error("XMLHttpRequest is not supported")
    }
}