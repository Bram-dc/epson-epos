import MessageFactory from '../MessageFactory'
import Connection from './Connection'
import ePosDeviceMessage from './ePosDeviceMessage'

const SERVICE_ID = 'OFSC'

export default class Ofsc {
    callback: ((data: string) => void) | null = null
    connectionObj: Connection | null = null

    constructor() {

        //

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    send(xml: string, timeout: number, crypto: string, callback: (data: string) => void) {

        this.callback = callback

        if (this.connectionObj === null)
            return

        try {

            if (this.connectionObj.isUsableDeviceIF()) {

                const data = {
                    type: 'print',
                    timeout: timeout,
                    printdata: xml,
                }

                const eposmsg = MessageFactory.getServiceMessage(SERVICE_ID, crypto, data)

                this.connectionObj.emit(eposmsg)

            }

        } catch { }

    }

    notify(eposmsg: ePosDeviceMessage) {

        let data = null

        if (eposmsg.isCrypto == '1')
            data = MessageFactory.decrypt(eposmsg.data)
        else
            data = eposmsg.data

        this.callback?.(data.resultdata)

    }

    onxmlresult(xml: string) {

        this.callback?.(xml)

    }

}