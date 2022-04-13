const KEY = 'EPSON_EPOSDEVICE_CLIENTID'
const EXPIRES_MINUTES = 5

export default class CookieIO {

    constructor() {

        //

    }

    writeId(value: string, address: string) {

        if (address === '')
            return

        const encodedAddress = encodeURIComponent(address)
        const encodedTitle = encodeURIComponent(document.title)
        const hostname = location.hostname
        const expired = this.getExpiredDate()

        document.cookie = KEY + '_' + hostname + '_' + encodedAddress + '_' + encodedTitle + '=' + encodeURIComponent(value) + '; expires=' + expired

    }

    readId(address: string) {

        let id = ''

        const strCookie = document.cookie + ';'
        const encodedAddress = encodeURIComponent(address)
        const encodedTitle = encodeURIComponent(document.title)
        const hostname = location.hostname
        const searchKey = KEY + '_' + hostname + '_' + encodedAddress + '_' + encodedTitle + '='

        let keyValueFrom = strCookie.indexOf(searchKey)

        if (keyValueFrom != -1) {
            keyValueFrom += searchKey.length
            const keyValueTo = strCookie.indexOf(';', keyValueFrom)
            id = decodeURIComponent(strCookie.substring(keyValueFrom, keyValueTo))
        }

        return id

    }

    getExpiredDate() {

        const expire = new Date()

        const nTime = expire.getTime()

        expire.setTime(nTime + (1000 * 60 * EXPIRES_MINUTES))

        return expire.toUTCString()

    }

}