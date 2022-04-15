import { DeviceMessageRequest } from '../functions/enums'

export default class ePosDeviceMessage {
    request: DeviceMessageRequest | null = null
    sequence = 0
    deviceId = ''
    serviceId = ''
    data: Record<string, unknown> = {}
    isCrypto = false
    code = ''
    data_id = 0

    constructor() {

        //

    }

    toTransmissionForm() {

        let message: DeviceMessage | null = null

        switch (this.request) {

            case DeviceMessageRequest.PUBKEY:
            case DeviceMessageRequest.ADMININFO:
            case DeviceMessageRequest.RECONNECT:
            case DeviceMessageRequest.DISCONNECT:
                message = [this.request, this.data]
                break
            case DeviceMessageRequest.OPENDEVICE:
            case DeviceMessageRequest.CLOSEDEVICE:
                message = [this.request, this.deviceId, this.data, this.data_id]
                break
            case DeviceMessageRequest.DEVICEDATA:
                message = [this.request, this.sequence, this.deviceId, this.data, this.data_id]
                break
            case DeviceMessageRequest.SERVICEDATA:
                message = [this.request, this.sequence, this.serviceId, this.isCrypto, this.data, this.data_id]
                break
            case DeviceMessageRequest.OPENCOMMBOX:
            case DeviceMessageRequest.CLOSECOMMBOX:
            case DeviceMessageRequest.COMMDATA:
                message = [this.request, this.sequence, this.data, this.data_id]
                break
            default:
                message = null

        }

        return message

    }

}