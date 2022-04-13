import { CommBoxManagerResult } from '../functions/enums'
import MessageFactory from '../MessageFactory'
import callbackInfo from './callbackInfo'
import Connection from './Connection'

export default class CommBoxManager {
    callbackInfo = new callbackInfo()
    commBoxList = []
    connectionObj: Connection | null = null

    constructor() {

        //

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    openCommBox(boxID: string, option: { memberID: string } | null, callback: () => void) {

        let memberID = ''

        if (option !== null && option.memberID !== null)
            memberID = option.memberID

        const data = {
            box_id: boxID,
            member_id: memberID,
        }

        const eposmsg = MessageFactory.getOpenCommBoxMessage(data)

        if (this.connectionObj === null || !this.connectionObj.isUsableDeviceIF()) {
            callback(null, CommBoxManagerResult.SYSTEM_ERROR, eposmsg.sequence)
            return eposmsg.sequence
        }

        this.connectionObj.emit(eposmsg)

        this.callbackInfo.addCallback(callback, String(eposmsg.sequence))

        return eposmsg.sequence

    }

    closeCommBox(boxObj, callback) {
        const data = {
            box_id: boxID,
        }
        let eposmsg = MessageFactory.getCloseCommBoxMessage(data)
        try {
            var boxID = boxObj.getBoxId()
            data.box_id = boxID
            eposmsg = MessageFactory.getCloseCommBoxMessage(data)
            if (!this.isOpened(boxID)) {
                if (callback != null) {
                    callback(this.ERROR_NOT_OPENED, eposmsg.sequence)
                }
                return eposmsg.sequence
            }
            this.connectionObj.emit(eposmsg)
        } catch (e) {
            if (callback != null) {
                callback(this.ERROR_PARAMETER_ERROR, eposmsg.sequence)
            }
        }
        this.callbackInfo.addCallback(callback, eposmsg.sequence)
        return eposmsg.sequence
    }

    client_opencommbox(data, sq) {
        const boxID = data.box_id
        const code = data.code
        let commBoxObj = null
        if (code == this.ERROR_OK && this.getCommBox(boxID) == null) {
            commBoxObj = new CommBox(boxID, this, this.callbackInfo)
        }
        if (commBoxObj != null) {
            this.commBoxList.push(commBoxObj)
        }
        const openCommBoxCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)
        if (openCommBoxCB != null) {
            openCommBoxCB(commBoxObj, code, sq)
        }
        return
    }

    client_closecommbox(data, sq) {
        const boxID = data.box_id
        const code = data.code
        this.removeCommBox(boxID)
        const closeCommBoxCB = this.callbackInfo.getCallback(sq)
        this.callbackInfo.removeCallback(sq)
        if (closeCommBoxCB != null) {
            closeCommBoxCB(code, sq)
        }
        return
    }

    executeCommDataCallback(data, sq) {
        const boxID = data.box_id
        const commBoxObj = this.getCommBox(boxID)
        const method = 'client_' + data.type
        try {
            eval('commBoxObj.' + method + '(data, sq)')
        } catch (e) {
            throw new Error('')
        }
        return
    }

    getCommBox(boxID) {
        let commBoxObj = null
        for (let i = 0; i < this.commBoxList.length; i++) {
            if (this.commBoxList[i].getBoxId() == boxID) {
                commBoxObj = this.commBoxList[i]
                break
            }
        }
        return commBoxObj
    }

    removeCommBox(boxID) {
        let result = false
        for (let i = 0; i < this.commBoxList.length; i++) {
            if (this.commBoxList[i].getBoxId() == boxID) {
                this.commBoxList.splice(i, 1)
                result = true
                break
            }
        }
        return result
    }

    isOpened(boxID) {
        let result = false
        for (let i = 0; i < this.commBoxList.length; i++) {
            if (this.commBoxList[i].getBoxId() == boxID) {
                result = true
                break
            }
        }
        return result
    }

}