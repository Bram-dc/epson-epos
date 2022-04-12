function DeviceObjectSelector() {
    this.type2objectMap = {
        type_scanner: "Scanner",
        type_keyboard: "Keyboard",
        type_poskeyboard: "POSKeyboard",
        type_msr: "MSR",
        type_cat: "CAT",
        type_cash_changer: "CashChanger",
        type_printer: "Printer",
        type_display: "Display",
        type_simple_serial: "SimpleSerial",
        type_hybrid_printer: "HybridPrinter",
        type_hybrid_printer2: "HybridPrinter2",
        type_dt: "DeviceTerminal",
        type_other_peripheral: "OtherPeripheral",
        type_storage: "GermanyFiscalElement"
    }
    this.connectionObj = null
}
DeviceObjectSelector.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    isSelectable: function (deviceType) {
        if (this.connectionObj.isUsableDeviceIF()) {
            return true
        } else {
            if (deviceType == "type_printer" && this.connectionObj.isUsablePrintIF()) {
                return true
            } else {
                if (deviceType == "type_display" && this.connectionObj.isUsableDisplayIF()) {
                    return true
                }
            }
        }
        return false
    },
    select: function (deviceId, deviceType, specificDevice, isCrypto, ePOSDeviceContext) {
        var deviceObjectName = ""
        if (typeof (specificDevice) == "string") {
            deviceObjectName = specificDevice
        } else {
            deviceObjectName = this.type2objectMap[deviceType]
        }
        var templateObject = null
        try {
            templateObject = eval(deviceObjectName)
        } catch (e) {
            throw new Error("ERROR_PARAMETER")
        }
        if (typeof (templateObject) != "function") {
            throw new Error("ERROR_PARAMETER")
        }
        if ((deviceObjectName == "Printer") || (deviceObjectName == "Display") || (deviceObjectName == "HybridPrinter") || (deviceObjectName == "HybridPrinter2")) {
            return new templateObject(deviceId, isCrypto, ePOSDeviceContext)
        } else {
            return new templateObject(deviceId, isCrypto)
        }
    }
}