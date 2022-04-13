export default class callbackInfo {
    private callbackInfoList: { [sq: string]: () => void }

    constructor() {

        this.callbackInfoList = {}

    }

    addCallback(callback: () => void, sq: string) {

        this.callbackInfoList[sq] = callback

    }

    removeCallback(sq: string) {

        for (const i in this.callbackInfoList) {

            if (i == sq) {
                delete this.callbackInfoList[i]
                return
            }

        }

    }

    getCallback(sq: string) {

        if (this.callbackInfoList[sq] !== undefined)
            return this.callbackInfoList[sq]

        return null

    }

}