import ePosCrypto from './epson/ePosCrypto'
import ePosDeviceMessage from './epson/ePosDeviceMessage'
import { DeviceMessageRequest } from './functions/enums'

const PUBKEY_TEST_TEXT = 'hello'
const cipher = new ePosCrypto()

let sequence = 0
const getNextSequence = () => {

    sequence++

    if (Number.MAX_VALUE === sequence)
        sequence = 1

    return sequence

}

export default class MessageFactory {

    static parseRequestMessage(message: DeviceMessage) {

        let eposmsg: ePosDeviceMessage | null = new ePosDeviceMessage()

        eposmsg.request = message[0]

        switch (eposmsg.request) {

            case DeviceMessageRequest.CONNECT:
                eposmsg.data = message[1] as Record<string, unknown>
                break
            case DeviceMessageRequest.PUBKEY:
            case DeviceMessageRequest.ADMININFO:
            case DeviceMessageRequest.RECONNECT:
            case DeviceMessageRequest.DISCONNECT:
                eposmsg.code = message[1] as string
                eposmsg.data = message[2] as Record<string, unknown>
                break
            case DeviceMessageRequest.OPENDEVICE:
            case DeviceMessageRequest.CLOSEDEVICE:
                eposmsg.deviceId = message[1] as string
                eposmsg.code = message[2] as string
                eposmsg.data = message[3] as Record<string, unknown>
                eposmsg.data_id = message[4] as number
                break
            case DeviceMessageRequest.DEVICEDATA:
                eposmsg.sequence = message[1] as number
                eposmsg.deviceId = message[2] as string
                eposmsg.data = message[3] as Record<string, unknown>
                eposmsg.data_id = message[4] as number
                break
            case DeviceMessageRequest.SERVICEDATA:
                eposmsg.sequence = message[1] as number
                eposmsg.serviceId = message[2] as string
                eposmsg.isCrypto = message[3] as boolean
                eposmsg.data = message[4] as Record<string, unknown>
                eposmsg.data_id = message[5] as number
                break
            case DeviceMessageRequest.OPENCOMMBOX:
            case DeviceMessageRequest.CLOSECOMMBOX:
            case DeviceMessageRequest.COMMDATA:
                eposmsg.sequence = message[1] as number
                eposmsg.data = message[2] as Record<string, unknown>
                eposmsg.data_id = message[3] as number
                break
            case DeviceMessageRequest.ERROR:
                eposmsg.sequence = message[1] as number
                eposmsg.deviceId = message[2] as string
                eposmsg.code = message[3] as string
                eposmsg.data = message[4] as Record<string, unknown>
                eposmsg.data_id = message[5] as number
                break
            default:
                eposmsg = null

        }

        return eposmsg

    }

    static getPubkeyMessage(prime: number, key: string) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.PUBKEY

        cipher.genClientKeys(prime, key)

        const testData = cipher.bfEncrypt(PUBKEY_TEST_TEXT)

        let pubkey = bigInt2str(cipher.pubkey_c, 16)

        while (pubkey.length < 192) {
            pubkey = '0' + pubkey
        }

        eposmsg.data = {
            key: pubkey,
            testData: testData,
        }

        return eposmsg

    }

    static getAdminInfoMessage() {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.ADMININFO
        eposmsg.data = {}

        return eposmsg

    }

    static getReconnectMessage(prevId: string, curId: string, dataId: string) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.RECONNECT
        eposmsg.data = {
            old_client_id: prevId,
            new_client_id: curId,
            received_id: dataId,
        }

        return eposmsg

    }

    static getDisconnectMessage(connectionId: string) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.DISCONNECT
        eposmsg.data = {
            client_id: connectionId,
        }

        return eposmsg

    }

    static getOpenDeviceMessage(deviceId: string, deviceType: string, isCrypto: boolean, isBufferEnable: boolean) {

        const eposmsg = new ePosDeviceMessage()

        let deviceTypeName = deviceType
        if (deviceTypeName === 'type_hybrid_printer2')
            deviceTypeName = 'type_hybrid_printer'

        eposmsg.request = DeviceMessageRequest.OPENDEVICE
        eposmsg.deviceId = deviceId
        eposmsg.data = {
            type: deviceTypeName,
            crypto: isCrypto,
            buffer: isBufferEnable,
        }

        return eposmsg

    }

    static getCloseDeviceMessage(deviceId: string) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.CLOSEDEVICE
        eposmsg.deviceId = deviceId
        eposmsg.data = {}

        return eposmsg

    }

    static getDeviceDataMessage(deviceId: string, data: Record<string, unknown>, crypto: boolean) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.DEVICEDATA
        eposmsg.sequence = getNextSequence()
        eposmsg.deviceId = deviceId

        eposmsg.data = crypto ? cipher.bfEncrypt(JSON.stringify(data)) : data

        return eposmsg

    }

    static getServiceMessage(serviceId: string, isCrypto: boolean, data: Record<string, unknown>) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.SERVICEDATA
        eposmsg.sequence = getNextSequence()
        eposmsg.serviceId = serviceId
        eposmsg.isCrypto = isCrypto

        eposmsg.data = isCrypto ? cipher.bfEncrypt(JSON.stringify(data)) : data

        return eposmsg

    }

    static getOpenCommBoxMessage(data: Record<string, unknown>) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.OPENCOMMBOX
        eposmsg.sequence = getNextSequence()
        eposmsg.data = data

        return eposmsg

    }

    static getCloseCommBoxMessage(data: Record<string, unknown>) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.CLOSECOMMBOX
        eposmsg.sequence = getNextSequence()
        eposmsg.data = data

        return eposmsg

    }

    static getCommBoxDataMessage(data: Record<string, unknown>) {

        const eposmsg = new ePosDeviceMessage()

        eposmsg.request = DeviceMessageRequest.COMMDATA
        eposmsg.sequence = getNextSequence()
        eposmsg.data = data

        return eposmsg

    }

    static decrypt(data: Record<string, unknown>) {

        const decryptoData = cipher.bfDecrypt(data)

        return JSON.parse(decryptoData)

    }

}