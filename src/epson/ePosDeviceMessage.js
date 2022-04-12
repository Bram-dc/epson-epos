function ePosDeviceMessage() {
    this.REQUEST = {
        CONNECT: "connect",
        PUBKEY: "pubkey",
        ADMININFO: "admin_info",
        RECONNECT: "reconnect",
        DISCONNECT: "disconnect",
        OPENDEVICE: "open_device",
        CLOSEDEVICE: "close_device",
        DEVICEDATA: "device_data",
        SERVICEDATA: "service_data",
        ERROR: "error",
        OPENCOMMBOX: "open_commbox",
        CLOSECOMMBOX: "close_commbox",
        COMMDATA: "commbox_data"
    }
    this.request = null
    this.sequence = 0
    this.deviceId = ""
    this.serviceId = ""
    this.data = {}
    this.isCrypto = "0"
    this.code = ""
    this.data_id = 0
}
ePosDeviceMessage.prototype = {
    toTransmissionForm: function () {
        var message = null
        switch (this.request) {
            case this.REQUEST.PUBKEY:
            case this.REQUEST.ADMININFO:
            case this.REQUEST.RECONNECT:
            case this.REQUEST.DISCONNECT:
                message = [this.request, this.data]
                break
            case this.REQUEST.OPENDEVICE:
            case this.REQUEST.CLOSEDEVICE:
                message = [this.request, this.deviceId, this.data, this.data_id]
                break
            case this.REQUEST.DEVICEDATA:
                message = [this.request, this.sequence, this.deviceId, this.data, this.data_id]
                break
            case this.REQUEST.SERVICEDATA:
                message = [this.request, this.sequence, this.serviceId, this.isCrypto, this.data, this.data_id]
                break
            case this.REQUEST.OPENCOMMBOX:
            case this.REQUEST.CLOSECOMMBOX:
            case this.REQUEST.COMMDATA:
                message = [this.request, this.sequence, this.data, this.data_id]
                break
            default:
                message = null
        }
        return message
    },
}