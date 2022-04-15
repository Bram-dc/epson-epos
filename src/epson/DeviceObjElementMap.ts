import DeviceObjElement from './DeviceObjElement'

export default class DeviceObjElementMap {
    elementList: DeviceObjElement[] = []

    constructor() {

        //

    }

    add(element: DeviceObjElement) {

        this.elementList.push(element)

    }

    get(deviceId: string) {

        let element = null

        for (let i = 0; i < this.elementList.length; i++) {

            if (this.elementList[i].deviceId === deviceId) {

                element = this.elementList[i]
                break

            }

        }

        return element

    }

    getByObj(deviceObject: DeviceObjElement) {

        let element = null

        for (let i = 0; i < this.elementList.length; i++) {

            if (this.elementList[i].deviceObject === deviceObject) {

                element = this.elementList[i]
                break

            }

        }

        return element

    }

    remove(deviceId: string) {

        for (let i = 0; i < this.elementList.length; i++) {

            if (this.elementList[i].deviceId == deviceId) {

                this.elementList.splice(i, 1)
                break

            }

        }

    }

    removeAll() {

        this.elementList = []

    }

    getElementList() {

        return this.elementList

    }

}