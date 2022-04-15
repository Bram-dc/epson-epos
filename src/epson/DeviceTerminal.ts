import MessageFactory from '../MessageFactory'
import Connection from './Connection'

export default class DeviceTerminal {
    deviceID: string
    isCrypto: boolean
    onshutdown: ((data: Record<string, unknown>) => void) | null = null
    onrestart: ((data: Record<string, unknown>) => void) | null = null
    connectionObj: Connection | null = null

    constructor(deviceID: string, isCrypto: boolean) {

        this.deviceID = deviceID
        this.isCrypto = isCrypto

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    shutdown(password: string, callback: (data: Record<string, unknown>) => void) {

        this.onshutdown = callback

        const data = {
            type: 'shutdown',
            password: password,
        }

        return this.send(data)
    }

    client_onshutdown(data: Record<string, unknown>) {

        try {

            this.onshutdown?.(data)

        } catch { }

    }

    restart(password: string, callback: (data: Record<string, unknown>) => void) {

        this.onrestart = callback

        const data = {
            type: 'restart',
            password: password,
        }

        return this.send(data)
    }

    client_onrestart(data: Record<string, unknown>) {

        try {

            this.onrestart?.(data)

        } catch { }

    }

    send(data: Record<string, unknown>) {

        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)

        let sequence = -1

        try {

            this.connectionObj!.emit(eposmsg)

            sequence = eposmsg.sequence

        } catch { }

        return sequence

    }

}