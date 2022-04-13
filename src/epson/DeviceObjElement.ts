export default class DeviceObjElement {
    deviceId: string
    isCrypto: boolean
    deviceObject: any
    callback: () => void

    constructor(deviceId: string, isCrypto: boolean, deviceObject: any, callback: () => void) {

        this.deviceId = deviceId
        this.isCrypto = isCrypto
        this.deviceObject = deviceObject
        this.callback = callback

    }

}