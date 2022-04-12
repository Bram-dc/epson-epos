

function toHexBinary(s) {
    var l = s.length,
        r = new Array(l),
        i
    for (i = 0; i < l; i++) {
        r[i] = ("0" + s.charCodeAt(i).toString(16)).slice(-2)
    }
    return r.join("")
}

function toBase64Binary(s) {
    var l = s.length,
        r = new Array((l + 2) / 3 << 2),
        t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        p = (3 - l % 3) % 3,
        j = 0,
        i = 0,
        n
    s += "\x00\x00"
    while (i < l) {
        n = s.charCodeAt(i++) << 16 | s.charCodeAt(i++) << 8 | s.charCodeAt(i++)
        r[j++] = t.charAt(n >> 18 & 63)
        r[j++] = t.charAt(n >> 12 & 63)
        r[j++] = t.charAt(n >> 6 & 63)
        r[j++] = t.charAt(n & 63)
    }
    while (p--) {
        r[--j] = "="
    }
    return r.join("")
}

function toMonoImage(imgdata, s, g) {
    var x = String.fromCharCode,
        m8 = [
            [2, 130, 34, 162, 10, 138, 42, 170],
            [194, 66, 226, 98, 202, 74, 234, 106],
            [50, 178, 18, 146, 58, 186, 26, 154],
            [242, 114, 210, 82, 250, 122, 218, 90],
            [14, 142, 46, 174, 6, 134, 38, 166],
            [206, 78, 238, 110, 198, 70, 230, 102],
            [62, 190, 30, 158, 54, 182, 22, 150],
            [254, 126, 222, 94, 246, 118, 214, 86]
        ],
        d = imgdata.data,
        w = imgdata.width,
        h = imgdata.height,
        r = new Array((w + 7 >> 3) * h),
        n = 0,
        p = 0,
        q = 0,
        t = 128,
        e = new Array(),
        e1, e2, b, v, f, i, j
    if (s == 1) {
        i = w
        while (i--) {
            e.push(0)
        }
    }
    for (j = 0; j < h; j++) {
        e1 = 0
        e2 = 0
        i = 0
        while (i < w) {
            b = i & 7
            if (s == 0) {
                t = m8[j & 7][b]
            }
            v = Math.pow(((d[p++] * 0.29891 + d[p++] * 0.58661 + d[p++] * 0.11448) * d[p] / 255 + 255 - d[p++]) / 255, 1 / g) * 255 | 0
            if (s == 1) {
                v += e[i] + e1 >> 4
                f = v - (v < t ? 0 : 255)
                if (i > 0) {
                    e[i - 1] += f
                }
                e[i] = f * 7 + e2
                e1 = f * 5
                e2 = f * 3
            }
            if (v < t) {
                n |= 128 >> b
            }
            i++
            if (b == 7 || i == w) {
                r[q++] = x(n == 16 ? 32 : n)
                n = 0
            }
        }
    }
    return r.join("")
}

function toGrayImage(imgdata, g) {
    var x = String.fromCharCode,
        m4 = [
            [0, 9, 2, 11],
            [13, 4, 15, 6],
            [3, 12, 1, 10],
            [16, 7, 14, 5]
        ],
        thermal = [0, 7, 13, 19, 23, 27, 31, 35, 40, 44, 49, 52, 54, 55, 57, 59, 61, 62, 64, 66, 67, 69, 70, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 83, 84, 85, 86, 86, 87, 88, 88, 89, 90, 90, 91, 91, 92, 93, 93, 94, 94, 95, 96, 96, 97, 98, 98, 99, 99, 100, 101, 101, 102, 102, 103, 103, 104, 104, 105, 105, 106, 106, 107, 107, 108, 108, 109, 109, 110, 110, 111, 111, 112, 112, 112, 113, 113, 114, 114, 115, 115, 116, 116, 117, 117, 118, 118, 119, 119, 120, 120, 120, 121, 121, 122, 122, 123, 123, 123, 124, 124, 125, 125, 125, 126, 126, 127, 127, 127, 128, 128, 129, 129, 130, 130, 130, 131, 131, 132, 132, 132, 133, 133, 134, 134, 135, 135, 135, 136, 136, 137, 137, 137, 138, 138, 139, 139, 139, 140, 140, 141, 141, 141, 142, 142, 143, 143, 143, 144, 144, 145, 145, 146, 146, 146, 147, 147, 148, 148, 148, 149, 149, 150, 150, 150, 151, 151, 152, 152, 152, 153, 153, 154, 154, 155, 155, 155, 156, 156, 157, 157, 158, 158, 159, 159, 160, 160, 161, 161, 161, 162, 162, 163, 163, 164, 164, 165, 165, 166, 166, 166, 167, 167, 168, 168, 169, 169, 170, 170, 171, 171, 172, 173, 173, 174, 175, 175, 176, 177, 178, 178, 179, 180, 180, 181, 182, 182, 183, 184, 184, 185, 186, 186, 187, 189, 191, 193, 195, 198, 200, 202, 255],
        d = imgdata.data,
        w = imgdata.width,
        h = imgdata.height,
        r = new Array((w + 1 >> 1) * h),
        n = 0,
        p = 0,
        q = 0,
        b, v, v1, i, j
    for (j = 0; j < h; j++) {
        i = 0
        while (i < w) {
            b = i & 1
            v = thermal[Math.pow(((d[p++] * 0.29891 + d[p++] * 0.58661 + d[p++] * 0.11448) * d[p] / 255 + 255 - d[p++]) / 255, 1 / g) * 255 | 0]
            v1 = v / 17 | 0
            if (m4[j & 3][i & 3] < v % 17) {
                v1++
            }
            n |= v1 << ((1 - b) << 2)
            i++
            if (b == 1 || i == w) {
                r[q++] = x(n)
                n = 0
            }
        }
    }
    return r.join("")
}

function escapeMarkup(s) {
    var markup = /[<>&'"\t\n\r]/g
    if (markup.test(s)) {
        s = s.replace(markup, function (c) {
            var r = ""
            switch (c) {
                case "<":
                    r = "&lt;"
                    break
                case ">":
                    r = "&gt;"
                    break
                case "&":
                    r = "&amp;"
                    break
                case "'":
                    r = "&apos;"
                    break
                case '"':
                    r = "&quot;"
                    break
                case "\t":
                    r = "&#9;"
                    break
                case "\n":
                    r = "&#10;"
                    break
                case "\r":
                    r = "&#13;"
                    break
                default:
                    break
            }
            return r
        })
    }
    return s
}

function escapeControl(s) {
    var control = /[\\\x00-\x1f\x7f-\xff]/g
    if (control.test(s)) {
        s = s.replace(control, function (c) {
            return (c == "\\") ? "\\\\" : "\\x" + ("0" + c.charCodeAt(0).toString(16)).slice(-2)
        })
    }
    return s
}

function getEnumAttr(name, value, regex) {
    if (!regex.test(value)) {
        throw new Error('Parameter "' + name + '" is invalid')
    }
    return " " + name + '="' + value + '"'
}

function getBoolAttr(name, value) {
    return " " + name + '="' + !!value + '"'
}

function getIntAttr(name, value, min, max) {
    if (isNaN(value) || value < min || value > max) {
        throw new Error('Parameter "' + name + '" is invalid')
    }
    return " " + name + '="' + value + '"'
}

function getUByteAttr(name, value) {
    return getIntAttr(name, value, 0, 255)
}

function getUShortAttr(name, value) {
    return getIntAttr(name, value, 0, 65535)
}

function getShortAttr(name, value) {
    return getIntAttr(name, value, -32768, 32767)
}

function getEnumIntAttr(name, value, regex, min, max) {
    if (!regex.test(value)) {
        if (isNaN(value) || value < min || value > max) {
            throw new Error('Parameter "' + name + '" is invalid')
        }
    }
    return " " + name + '="' + value + '"'
}