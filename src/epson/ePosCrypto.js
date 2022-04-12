function ePosCrypto() {
    this.pubkey_c = ""
    this.secretKey = ""
}
ePosCrypto.prototype = {
    genClientKeys: function (arg_prime_s, arg_pubkey_s) {
        var g = str2bigInt("2", 10)
        var prime_c = str2bigInt(arg_prime_s, 16)
        var privkey_c = randBigInt(64, 0)
        this.pubkey_c = powMod(g, privkey_c, prime_c)
        var intPubkey = str2bigInt(arg_pubkey_s, 16)
        var modNum = powMod(intPubkey, privkey_c, prime_c)
        var strModNum = bigInt2str(modNum, 16)
        var strSecretKey = strModNum.toLowerCase()
        while (strSecretKey.length < 192) {
            strSecretKey = "0" + strSecretKey
        }
        this.secretKey = md5.bin(strSecretKey)
    },
    bfEncrypt: function (data) {
        try {
            var enc_req = {
                data: data,
                key: this.secretKey,
                mode: "cbc",
                round: 16,
                iv: blowfish.mkIV()
            }
            var enc_data = blowfish.encrypt(enc_req)
            var cdata = base64.encode(enc_data)
        } catch (e) {
            return ""
        }
        return cdata
    },
    bfDecrypt: function (data) {
        try {
            var dec_req = {
                data: base64.decode(data),
                key: this.secretKey,
                mode: "cbc"
            }
            var ddata = blowfish.decrypt(dec_req)
        } catch (e) {
            return ""
        }
        return ddata
    }
}