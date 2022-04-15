import MessageFactory from '../MessageFactory'
import Connection from './Connection'

export default class MSR {
    deviceID: string
    isCrypto: boolean
    connectionObj: Connection | null = null
    ondata: ((data: string) => void) | null = null

    constructor(deviceID: string, isCrypto: boolean) {

        this.deviceID = deviceID
        this.isCrypto = isCrypto

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    client_ondata(data: string) {

        try {

            this.ondata?.(data)

        } catch { }

    }

    callEvent(eventName: string, data: string) {

        const eventReq = data
        eventReq.type = eventName

        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, eventReq, this.isCrypto)

        let sequence = -1

        try {

            this.connectionObj!.emit(eposmsg)

            sequence = eposmsg.sequence

        } catch { }

        return sequence

    }

}