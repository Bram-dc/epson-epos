function CookieIO() {
    this.KEY = "EPSON_EPOSDEVICE_CLIENTID"
    this.EXPIRES_MINUTES = 5
}
CookieIO.prototype = {
    writeId: function (value, address) {
        if (address == "") {
            return
        }
        var encodedAddress = encodeURIComponent(address)
        var encodedTitle = encodeURIComponent(document.title)
        var hostname = location.hostname
        var expired = this.getExpiredDate()
        document.cookie = this.KEY + "_" + hostname + "_" + encodedAddress + "_" + encodedTitle + "=" + encodeURIComponent(value) + "; expires=" + expired
    },
    readId: function (address) {
        var id = ""
        var strCookie = document.cookie + ";"
        var encodedAddress = encodeURIComponent(address)
        var encodedTitle = encodeURIComponent(document.title)
        var hostname = location.hostname
        var searchKey = this.KEY + "_" + hostname + "_" + encodedAddress + "_" + encodedTitle + "="
        var keyValueFrom = strCookie.indexOf(searchKey)
        if (keyValueFrom != -1) {
            keyValueFrom += searchKey.length
            var keyValueTo = strCookie.indexOf(";", keyValueFrom)
            id = decodeURIComponent(strCookie.substring(keyValueFrom, keyValueTo))
        }
        return id
    },
    getExpiredDate: function () {
        var expire = new Date()
        var nTime = expire.getTime()
        expire.setTime(nTime + (1000 * 60 * this.EXPIRES_MINUTES))
        return expire.toUTCString()
    }
}