import MessageFactory from '../MessageFactory'
import Connection from './Connection'

export default class GermanyFiscalElement {
    deviceID: string
    isCrypto: boolean
    connectionObj: Connection | null = null
    ongfereceive = null
    onerror = null

    constructor(deviceID: string, isCrypto: boolean) {

        this.deviceID = deviceID
        this.isCrypto = isCrypto

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    operate(jsonString: string, timeout: number) {

        const data = {
            type: 'operate',
            timeout: timeout,
            requestdata: jsonString,
        }

        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)

        let sequence = -1

        this.connectionObj!.emit(eposmsg)
        sequence = eposmsg.sequence

        return sequence

    }

    client_operateresult(data) {
        if (this.ongfereceive == null) {
            return
        }
        if (data.resultformat == 'Base64-encoded') {
            try {
                data.resultdata = window.atob(data.resultdata)
                const uint8array = new Uint8Array(data.resultdata.length)
                for (let i = 0; i < data.resultdata.length; i++) {
                    uint8array[i] = data.resultdata.charCodeAt(i)
                }
                const inflate = new Zlib.Inflate(uint8array)
                const charData = inflate.decompress()
                data.resultdata = []
                for (let j = 0; j < charData.length; j++) {
                    data.resultdata = data.resultdata + String.fromCharCode(charData[j])
                }
            } catch (e) {
                if (this.onerror) {
                    this.onerror(e)
                }
                return
            }
        }
        try {
            this.ongfereceive(this.getResultObject(data))
        } catch (e) {
            if (this.onerror) {
                this.onerror(e)
            }
        }
        return
    }

    getResultObject(data) {
        return ({
            success: data.success,
            code: data.code,
            resultdata: data.resultdata,
        })
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