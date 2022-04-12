function DeviceObjElementMap() {
    this.elementList = new Array()
}
DeviceObjElementMap.prototype = {
    add: function (element) {
        this.elementList.push(element)
    },
    get: function (deviceId) {
        var element = null
        for (var i = 0; i < this.elementList.length; i++) {
            if (this.elementList[i].deviceId == deviceId) {
                element = this.elementList[i]
                break
            }
        }
        return element
    },
    getByObj: function (deviceObject) {
        var element = null
        for (var i = 0; i < this.elementList.length; i++) {
            if (this.elementList[i].deviceObject == deviceObject) {
                element = this.elementList[i]
                break
            }
        }
        return element
    },
    remove: function (deviceId) {
        for (var i = 0; i < this.elementList.length; i++) {
            if (this.elementList[i].deviceId == deviceId) {
                this.elementList.splice(i, 1)
                break
            }
        }
    },
    removeAll: function () {
        this.elementList = []
    },
    getElementList: function () {
        return this.elementList
    },
}