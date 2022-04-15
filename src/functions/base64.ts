const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const u: Record<string, number> = {}
let v = 0

while (v < 64) {

    u[t.charAt(v)] = v

    v++

}

const encode = (d: string) => {

    let i = 0
    let j = 0

    const s = d + '\0\0'
    const l = s.length - 2
    const r = new Array((l + 2) / 3 << 2)

    while (i < l) {

        const n = (s.charCodeAt(i++) & 255) << 16 | (s.charCodeAt(i++) & 255) << 8 | (s.charCodeAt(i++) & 255)

        r[j++] = t.charAt(n >> 18 & 63)
        r[j++] = t.charAt(n >> 12 & 63)
        r[j++] = t.charAt(n >> 6 & 63)
        r[j++] = t.charAt(n & 63)

    }

    while (i > l) {

        r[--j] = '='
        i--

    }

    return r.join('')

}

const decode = (d: string) => {

    let i = 0
    let j = 0

    const s = d.replace(/[^A-Za-z0-9\+\/]/g, '') + 'AAA' // eslint-disable-line no-useless-escape
    const l = s.length - 3
    const r = new Array((l + 3 >> 2) * 3)

    while (i < l) {

        const n = u[s.charAt(i++)] << 18 | u[s.charAt(i++)] << 12 | u[s.charAt(i++)] << 6 | u[s.charAt(i++)]

        r[j++] = String.fromCharCode(n >> 16 & 255)
        r[j++] = String.fromCharCode(n >> 8 & 255)
        r[j++] = String.fromCharCode(n & 255)

    }

    r.length = j - i + l

    return r.join('')

}

const base64 = { encode, decode }

export default base64