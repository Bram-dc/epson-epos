import MessageFactory from '../MessageFactory'
import Connection from './Connection'

export default class Scanner {
    deviceID: string
    isCrypto: boolean
    connectionObj: Connection | null = null

    constructor(deviceID: string, isCrypto: boolean) {

        this.deviceID = deviceID
        this.isCrypto = isCrypto

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    client_ondata(data) {

        try {

            this.ondata?.(data)

        } catch { }

    }

    client_onbinarydata(data) {

        try {

            this.onbinarydata?.(data)

        } catch { }

    }

    client_setbinarymode(data) {

        try {

            this.onbinarymode?.(data)

        } catch { }

    }

    setBinaryMode(enable: boolean) {

        const str = enable ? 'true' : 'false'

        const data = {
            type: 'setbinarymode',
            binarymode: str,
        }

        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)

        let sequence = -1

        try {

            this.connectionObj!.emit(eposmsg)

            sequence = eposmsg.sequence

        } catch { }

        return sequence
    }

    callEvent(eventName, data) {
        const eventReq = data
        eventReq.type = eventName
        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, eventReq, this.isCrypto)
        let sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    }

}