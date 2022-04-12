function callbackInfo() {
    this.callbackInfoList = new Object()
}
callbackInfo.prototype = {
    addCallback: function (callback, sq) {
        this.callbackInfoList[sq] = callback
    },
    removeCallback: function (sq) {
        for (var i in this.callbackInfoList) {
            if (i == sq) {
                delete this.callbackInfoList[i]
                return
            }
        }
    },
    getCallback: function (sq) {
        if (this.callbackInfoList[sq] != null) {
            return this.callbackInfoList[sq]
        }
        return null
    }
}