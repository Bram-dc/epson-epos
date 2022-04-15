import base64 from '../functions/base64'
import blowfish from '../functions/blowfish'
import md5 from '../functions/md5'

export default class ePosCrypto {
    pubkey_c = ''
    secretKey = ''

    constructor() {

        //

    }

    genClientKeys(arg_prime_s, arg_pubkey_s) {

        const g = str2bigInt('2', 10)
        const prime_c = str2bigInt(arg_prime_s, 16)
        const privkey_c = randBigInt(64, 0)

        this.pubkey_c = powMod(g, privkey_c, prime_c)

        const intPubkey = str2bigInt(arg_pubkey_s, 16)
        const modNum = powMod(intPubkey, privkey_c, prime_c)
        const strModNum = bigInt2str(modNum, 16)

        let strSecretKey = strModNum.toLowerCase()

        while (strSecretKey.length < 192) {
            strSecretKey = '0' + strSecretKey
        }

        this.secretKey = md5.bin(strSecretKey)

    }

    bfEncrypt(data: string) {

        try {

            const enc_req = {
                data: data,
                key: this.secretKey,
                mode: 'cbc',
                round: 16,
                iv: blowfish.mkIV(),
            }

            const enc_data = blowfish.encrypt(enc_req)

            return base64.encode(enc_data)

        } catch {

            return ''

        }

    }

    bfDecrypt(data: string) {

        try {

            return blowfish.decrypt({
                data: base64.decode(data),
                key: this.secretKey,
                mode: 'cbc',
            })

        } catch {

            return ''

        }

    }

}