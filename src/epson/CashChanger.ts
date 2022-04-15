import MessageFactory from '../MessageFactory'
import Connection from './Connection'

const enum CashChangerConfig {
    LEFT_CASH = 'CONFIG_LEFT_CASH',
    COUNT_MODE = 'CONFIG_COUNT_MODE',
}

const enum CashChangerCountMode {
    MANUAL_INPUT = 'MODE_MANUAL_INPUT',
    AUTOCOUNT = 'MODE_AUTO_COUNT',
}

const enum CashChangerDeposit {
    CHANGE = 'DEPOSIT_CHANGE',
    NOCHANGE = 'DEPOSIT_NOCHANGE',
    REPAY = 'DEPOSIT_REPAY',
}

const enum CashChangerCollect {
    ALL_CASH = 'ALL_CASH',
    PART_OF_CASH = 'PART_OF_CASH',
}

export default class CashChanger {
    deviceID: string
    isCrypto: boolean
    connectionObj: Connection | null = null
    oncashcounts: ((data: string) => void) | null = null
    onstatuschange: ((data: string) => void) | null = null

    constructor(deviceID: string, isCrypto: boolean) {

        this.deviceID = deviceID
        this.isCrypto = isCrypto

    }


    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    client_oncashcounts(data: string) {

        try {

            this.oncashcounts?.(data)

        } catch { }

    }

    client_onstatuschange(data: string) {

        try {

            this.onstatuschange?.(data)

        } catch { }

    }

    client_ondeposit(data: string) {

        try {

            this.ondeposit?.(data)

        } catch { }

    }

    client_ondispense(data: string) {

        try {

            this.ondispense?.(data)

        } catch { }

    }

    client_oncollect(data: string) {

        try {

            this.oncollect?.(data)

        } catch { }

    }

    client_onconfigchange(data: string) {

        try {

            this.onconfigchange?.(data)

        } catch { }

    }

    client_oncommandreply(data: string) {
        try {
            if (this.oncommandreply == null) {
                return
            }
            if (typeof data.command != '') { } else {
                let hexData = data.data
                hexData = hexData.replace(/[0-9a-fA-F]{2}/g, function (c) {
                    const hexNum = parseInt(c, 16)
                    return String.fromCharCode(hexNum)
                })
                data.data = hexData
            }
            this.oncommandreply(data)
        } catch { }

    }

    client_ondirectio(data: string) {

        try {

            this.ondirectio?.(data)

        } catch { }

    }

    client_onstatusupdate(data: string) {

        try {

            this.onstatusupdate(data)

        } catch { }

    }

    readCashCounts() {

        return this.send({
            type: 'readcashcounts',
        })

    }

    beginDeposit() {

        return this.send({
            type: 'begindeposit',
        })

    }

    pauseDeposit() {

        return this.send({
            type: 'pausedeposit',
        })

    }

    restartDeposit() {

        return this.send({
            type: 'restartdeposit',
        })

    }

    endDeposit(cmd) {

        return this.send({
            type: 'enddeposit',
            cmd: cmd,
        })

    }

    dispenseCash(data: object | string) {

        if (typeof data === 'object')
            return this.send({
                ...data,
                type: 'dispensecash',
            })

        return this.send({
            type: 'dispensecash',
            cash: data,
        })

    }

    dispenseChange(cash) {
        let data_
        if (typeof cash == 'object') {
            data_ = cash
            data_.type = 'dispensechange'
        } else {
            data_ = {
                type: 'dispensechange',
                cash: cash,
            }
        }
        return this.send(data_)
    }

    openDrawer() {

        return this.send({
            type: 'opendrawer',
        })

    }

    collectCash(collectMode) {
        const data = {
            type: 'collectcash',
            collectmode: collectMode,
        }
        return this.send(data)
    }

    setConfig(config, value) {
        let data = null
        switch (config) {
            case this.CONFIG_COUNT_MODE:
                data = {
                    type: 'setconfig',
                    config: config,
                    mode: value.mode,
                }
                break
            case this.CONFIG_LEFT_CASH:
                if ((value.bills == null) || (value.bills == '')) {
                    value.bills = '0'
                }
                if ((value.coins == null) || (value.coins == '')) {
                    value.coins = '0'
                }
                data = {
                    type: 'setconfig',
                    config: config,
                    bills: value.bills,
                    coins: value.coins,
                }
                break
            default:
                break
        }
        let sq = -1
        if (data != null) {
            sq = this.send(data)
        }
        return sq
    }

    sendCommand(command) {
        let data
        if (typeof command == 'object') {
            data = command
            data.type = 'sendcommand'
        } else {
            data = {
                type: 'sendcommand',
                command: toHexBinary(command),
            }
        }
        return this.send(data)
    }

    callEvent(eventName, data) {
        const eventReq = data
        eventReq.type = eventName
        return this.send(eventReq)
    }

    send(data: any) {
        const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        let sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch { }
        sequence
    }

}