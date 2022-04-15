import MessageFactory from '../MessageFactory'
import Connection from './Connection'

export default class OtherPeripheral {
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

    send(methodName: string, data: any) {
        const _data = {}
        for (const key in data) {
            _data[key] = data[key]
        }
        _data.type = methodName
        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, _data, this.isCrypto)
        let sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    }

    client_onreceive(data) {
        try {
            const eventData = data
            delete eventData.type
            this.onreceive(data.type, eventData)
        } catch (e) { }
        return
    }

    callEvent(eventName, data) {

        const eventReq = {
            type: eventName,
            data: data,
        }
        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        let sequence = -1

        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }

        return sequence

    }

}