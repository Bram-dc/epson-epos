export default class callbackInfo {
    private callbackInfoList: { [sq: string]: () => void }

    constructor() {

        this.callbackInfoList = {}

    }

    addCallback(callback: (...args: any[]) => void, sq: number) {

        this.callbackInfoList[String(sq)] = callback

    }

    removeCallback(sq: number) {

        for (const i in this.callbackInfoList) {

            if (i === String(sq)) {

                delete this.callbackInfoList[i]

                return

            }

        }

    }

    getCallback(sq: number) {

        if (this.callbackInfoList[String(sq)] !== undefined)
            return this.callbackInfoList[String(sq)]

        return null

    }

}