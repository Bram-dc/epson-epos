import MessageFactory from '../MessageFactory'
import Connection from './Connection'

export default class SimpleSerial {
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

    sendCommand(command: string) {

        const data = {
            type: 'sendcommand',
            command: toHexBinary(command),
        }

        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)

        let sequence = -1

        try {

            this.connectionObj!.emit(eposmsg)

            sequence = eposmsg.sequence

        } catch { }

        return sequence

    }

    client_oncommandreply(data) {

        try {

            if (this.oncommandreply === null)
                return

            let hexData = data.data
            hexData = hexData.replace(/[0-9a-fA-F]{2}/g, c => {
                const hexNum = parseInt(c, 16)
                return String.fromCharCode(hexNum)
            })

            data.data = hexData

            this.oncommandreply(data)

        } catch { }

    }

}