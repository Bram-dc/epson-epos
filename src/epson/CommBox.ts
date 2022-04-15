import { CommBoxResult } from '../functions/enums'
import MessageFactory from '../MessageFactory'
import callbackInfo from './callbackInfo'
import CommBoxManager from './CommBoxManager'

export default class CommBox {
    boxID: string
    commBoxManager: CommBoxManager
    callbackInfo: callbackInfo
    onreceive = null
    connectionObj

    constructor(boxID: string, commBoxManager: CommBoxManager, callbackInfo: callbackInfo) {

        this.boxID = boxID
        this.commBoxManager = commBoxManager
        this.callbackInfo = callbackInfo
        this.connectionObj = commBoxManager.connectionObj

    }

    getCommHistory(option: { allHistory: boolean | null } | null, callback: (result: CommBoxResult, _: number | null, sequence: number) => void) {

        const _option = typeof option === 'function' ? null : option
        const _callback = typeof option === 'function' ? option : callback
        const allHistory = (_option === null || _option.allHistory === null) ? false : option.allHistory
        const data = {
            type: 'getcommhistory',
            box_id: this.boxID,
            all_history: allHistory,
        }

        const eposmsg = MessageFactory.getCommBoxDataMessage(data)

        if (!this.commBoxManager.isOpened(this.getBoxId())) {

            _callback?.(CommBoxResult.NOT_OPENED, null, eposmsg.sequence)

            return eposmsg.sequence
        }

        this.callbackInfo.addCallback(_callback, eposmsg.sequence)
        this.connectionObj!.emit(eposmsg)

        return eposmsg.sequence
    }

    send(message: string, memberID: string, callback: (result: CommBoxResult, _: number | null, sequence: number) => void) {

        const data = {
            type: 'send',
            box_id: this.boxID,
            message: message,
            member_id: memberID,
        }

        const eposmsg = MessageFactory.getCommBoxDataMessage(data)

        if (!this.commBoxManager.isOpened(this.getBoxId())) {

            callback?.(CommBoxResult.NOT_OPENED, 0, eposmsg.sequence)

            return eposmsg.sequence

        }

        this.callbackInfo.addCallback(callback, eposmsg.sequence)

        this.connectionObj!.emit(eposmsg)

        return eposmsg.sequence

    }

    client_getcommhistory(data, sq: number) {
        const code = data.code
        const historyList = data.history_list
        const getCommHistoryCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)

        getCommHistoryCB?.(code, historyList, sq)

        return
    }

    client_send(data, sq: number) {

        const code = data.code
        const count = data.count
        const sendCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)

        sendCB?.(code, count, sq)

    }

    client_onreceive(data, sq) {

        const rcvData = new Object()

        rcvData.senderId = data.sender_id
        rcvData.receiverId = data.receiver_id
        rcvData.message = data.message

        this.onreceive?.(rcvData)

    }

    getBoxId() {

        return this.boxID

    }

}