export default class MICRReader2 extends MICRReader {
    waitTime = 500

    constructor(parent: HybridPrinter2) {
        super(parent)

    }

    read(ignoreerror, font) {

        if ((typeof (this.timeout) != 'number') || (this.timeout < 5000) || (this.timeout > 900000)) {
            this.timeout = 60000
        }

        let micrWaitTime = this.waitTime
        if ((typeof (this.waitTime) != 'number') || (this.waitTime < 0) || (this.waitTime > 6400)) {
            micrWaitTime = 500
        }

        const data = {
            type: 'micrread',
            ignoreerror: ignoreerror,
            font: font,
            timeout: this.timeout,
            waittime: micrWaitTime,
        }

        return this.parent.send(data)

    }

    cleaning() {

        let micrWaitTime = this.waitTime

        this.timeout = 60000

        if ((typeof (this.waitTime) != 'number') || (this.waitTime < 0) || (this.waitTime > 6400)) {
            micrWaitTime = 500
        }

        const data = {
            type: 'micrcleaning',
            timeout: this.timeout,
            waittime: micrWaitTime,
        }

        return this.parent.send(data)

    }

}