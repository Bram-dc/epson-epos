function MICRReader2(parent) {
    this.parent = parent
}
MICRReader2.prototype = new MICRReader()
MICRReader2.prototype.waitTime = 500
MICRReader2.prototype.read = function (ignoreerror, font) {
    if ((typeof (this.timeout) != "number") || (this.timeout < 5000) || (this.timeout > 900000)) {
        this.timeout = 60000
    }
    var micrWaitTime = this.waitTime
    if ((typeof (this.waitTime) != "number") || (this.waitTime < 0) || (this.waitTime > 6400)) {
        micrWaitTime = 500
    }
    var data = {
        type: "micrread",
        ignoreerror: ignoreerror,
        font: font,
        timeout: this.timeout,
        waittime: micrWaitTime
    }
    return this.parent.send(data)
}
MICRReader2.prototype.cleaning = function () {
    var micrWaitTime = this.waitTime
    this.timeout = 60000
    if ((typeof (this.waitTime) != "number") || (this.waitTime < 0) || (this.waitTime > 6400)) {
        micrWaitTime = 500
    }
    var data = {
        type: "micrcleaning",
        timeout: this.timeout,
        waittime: micrWaitTime
    }
    return this.parent.send(data)
}