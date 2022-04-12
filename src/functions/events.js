function fireReceiveEvent(epos, success, code, status, battery, printjobid) {
    if (code == "EX_ENPC_TIMEOUT") {
        code = "ERROR_DEVICE_BUSY"
    }
    if (epos.onreceive) {
        epos.onreceive({
            success: success,
            code: code,
            status: status,
            battery: battery,
            printjobid: printjobid
        })
    }
}

function fireStatusEvent(epos, status, battery) {
    var diff, difb
    if (status == 0 || status == epos.ASB_NO_RESPONSE) {
        status = epos.status | epos.ASB_NO_RESPONSE
    }
    diff = epos.status == 0 ? ~0 : epos.status ^ status
    difb = epos.status == 0 ? ~0 : epos.battery ^ battery
    epos.status = status
    epos.battery = battery
    if (diff && epos.onstatuschange) {
        epos.onstatuschange(status)
    }
    if (difb && epos.onbatterystatuschange) {
        epos.onbatterystatuschange(battery)
    }
    if (diff & (epos.ASB_NO_RESPONSE | epos.ASB_OFF_LINE)) {
        if (status & epos.ASB_NO_RESPONSE) {
            if (epos.onpoweroff) {
                epos.onpoweroff()
            }
        } else {
            if (status & epos.ASB_OFF_LINE) {
                if (epos.onoffline) {
                    epos.onoffline()
                }
            } else {
                if (epos.ononline) {
                    epos.ononline()
                }
            }
        }
    }
    if (diff & epos.ASB_COVER_OPEN) {
        if (status & epos.ASB_NO_RESPONSE) { } else {
            if (status & epos.ASB_COVER_OPEN) {
                if (epos.oncoveropen) {
                    epos.oncoveropen()
                }
            } else {
                if (epos.oncoverok) {
                    epos.oncoverok()
                }
            }
        }
    }
    if (diff & (epos.ASB_RECEIPT_END | epos.ASB_RECEIPT_NEAR_END)) {
        if (status & epos.ASB_NO_RESPONSE) { } else {
            if (status & epos.ASB_RECEIPT_END) {
                if (epos.onpaperend) {
                    epos.onpaperend()
                }
            } else {
                if (status & epos.ASB_RECEIPT_NEAR_END) {
                    if (epos.onpapernearend) {
                        epos.onpapernearend()
                    }
                } else {
                    if (epos.onpaperok) {
                        epos.onpaperok()
                    }
                }
            }
        }
    }
    if (diff & epos.ASB_DRAWER_KICK) {
        if (status & epos.ASB_NO_RESPONSE) { } else {
            if (status & epos.ASB_DRAWER_KICK) {
                if (epos.drawerOpenLevel == epos.DRAWER_OPEN_LEVEL_HIGH) {
                    if (epos.ondraweropen) {
                        epos.ondraweropen()
                    }
                } else {
                    if (epos.ondrawerclosed) {
                        epos.ondrawerclosed()
                    }
                }
                if (epos.onbatterylow) {
                    epos.onbatterylow()
                }
            } else {
                if (epos.drawerOpenLevel == epos.DRAWER_OPEN_LEVEL_HIGH) {
                    if (epos.ondrawerclosed) {
                        epos.ondrawerclosed()
                    }
                } else {
                    if (epos.ondraweropen) {
                        epos.ondraweropen()
                    }
                }
                if (epos.onbatteryok) {
                    epos.onbatteryok()
                }
            }
        }
    }
}

function fireErrorEvent(epos, status, responseText) {
    if (epos.onerror) {
        epos.onerror({
            status: status,
            responseText: responseText
        })
    }
}

function updateStatus(epos) {
    var delay = epos.interval
    if (epos.enabled) {
        if (isNaN(delay) || delay < 1000) {
            delay = 3000
        }
        epos.intervalid = setTimeout(function () {
            delete epos.intervalid
            if (epos.enabled) {
                epos.send()
            }
        }, delay)
    }
    delete epos.intervalxhr
}