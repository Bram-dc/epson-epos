function adapterMathRandom() {

    let rand: number | undefined
    try {

        rand = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296

    } catch (e) {

        console.log('GetRandomValues is not supported on your browser')

    }

    return rand

}

function findPrimes(n) {
    let i, s, p, ans
    s = new Array(n)
    for (i = 0; i < n; i++) {
        s[i] = 0
    }
    s[0] = 2
    p = 0
    for (; s[p] < n;) {
        for (i = s[p] * s[p]; i < n; i += s[p]) {
            s[i] = 1
        }
        p++
        s[p] = s[p - 1] + 1
        for (; s[p] < n && s[s[p]]; s[p]++) { }
    }
    ans = new Array(p)
    for (i = 0; i < p; i++) {
        ans[i] = s[i]
    }
    return ans
}

function millerRabinInt(x, b) {
    if (mr_x1.length != x.length) {
        mr_x1 = dup(x)
        mr_r = dup(x)
        mr_a = dup(x)
    }
    copyInt_(mr_a, b)
    return millerRabin(x, mr_a)
}

function millerRabin(x, b) {
    let i, j, k, s
    if (mr_x1.length != x.length) {
        mr_x1 = dup(x)
        mr_r = dup(x)
        mr_a = dup(x)
    }
    copy_(mr_a, b)
    copy_(mr_r, x)
    copy_(mr_x1, x)
    addInt_(mr_r, -1)
    addInt_(mr_x1, -1)
    k = 0
    for (i = 0; i < mr_r.length; i++) {
        for (j = 1; j < mask; j <<= 1) {
            if (x[i] & j) {
                s = (k < mr_r.length + bpe ? k : 0)
                i = mr_r.length
                j = mask
            } else {
                k++
            }
        }
    }
    if (s) {
        rightShift_(mr_r, s)
    }
    powMod_(mr_a, mr_r, x)
    if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
        j = 1
        while (j <= s - 1 && !equals(mr_a, mr_x1)) {
            squareMod_(mr_a, x)
            if (equalsInt(mr_a, 1)) {
                return 0
            }
            j++
        }
        if (!equals(mr_a, mr_x1)) {
            return 0
        }
    }
    return 1
}

function bitSize(x) {
    let j, z, w
    for (j = x.length - 1;
        (x[j] == 0) && (j > 0); j--) { }
    for (z = 0, w = x[j]; w;
        (w >>= 1), z++) { }
    z += bpe * j
    return z
}

function expand(x, n) {
    const ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0)
    copy_(ans, x)
    return ans
}

function randTruePrime(k) {
    const ans = int2bigInt(0, k, 0)
    randTruePrime_(ans, k)
    return trim(ans, 1)
}

function randProbPrime(k) {
    if (k >= 600) {
        return randProbPrimeRounds(k, 2)
    }
    if (k >= 550) {
        return randProbPrimeRounds(k, 4)
    }
    if (k >= 500) {
        return randProbPrimeRounds(k, 5)
    }
    if (k >= 400) {
        return randProbPrimeRounds(k, 6)
    }
    if (k >= 350) {
        return randProbPrimeRounds(k, 7)
    }
    if (k >= 300) {
        return randProbPrimeRounds(k, 9)
    }
    if (k >= 250) {
        return randProbPrimeRounds(k, 12)
    }
    if (k >= 200) {
        return randProbPrimeRounds(k, 15)
    }
    if (k >= 150) {
        return randProbPrimeRounds(k, 18)
    }
    if (k >= 100) {
        return randProbPrimeRounds(k, 27)
    }
    return randProbPrimeRounds(k, 40)
}

function randProbPrimeRounds(k, n) {
    let ans, i, divisible, B
    B = 30000
    ans = int2bigInt(0, k, 0)
    if (primes.length == 0) {
        primes = findPrimes(30000)
    }
    if (rpprb.length != ans.length) {
        rpprb = dup(ans)
    }
    for (; ;) {
        randBigInt_(ans, k, 0)
        ans[0] |= 1
        divisible = 0
        for (i = 0;
            (i < primes.length) && (primes[i] <= B); i++) {
            if (modInt(ans, primes[i]) == 0 && !equalsInt(ans, primes[i])) {
                divisible = 1
                break
            }
        }
        for (i = 0; i < n && !divisible; i++) {
            randBigInt_(rpprb, k, 0)
            while (!greater(ans, rpprb)) {
                randBigInt_(rpprb, k, 0)
            }
            if (!millerRabin(ans, rpprb)) {
                divisible = 1
            }
        }
        if (!divisible) {
            return ans
        }
    }
}

function mod(x, n) {
    const ans = dup(x)
    mod_(ans, n)
    return trim(ans, 1)
}

function addInt(x, n) {
    const ans = expand(x, x.length + 1)
    addInt_(ans, n)
    return trim(ans, 1)
}

function mult(x, y) {
    const ans = expand(x, x.length + y.length)
    mult_(ans, y)
    return trim(ans, 1)
}

function powMod(x, y, n) {
    const ans = expand(x, n.length)
    powMod_(ans, trim(y, 2), trim(n, 2), 0)
    return trim(ans, 1)
}

function sub(x, y) {
    const ans = expand(x, (x.length > y.length ? x.length + 1 : y.length + 1))
    sub_(ans, y)
    return trim(ans, 1)
}

function add(x, y) {
    const ans = expand(x, (x.length > y.length ? x.length + 1 : y.length + 1))
    add_(ans, y)
    return trim(ans, 1)
}

function inverseMod(x, n) {
    const ans = expand(x, n.length)
    let s
    s = inverseMod_(ans, n)
    return s ? trim(ans, 1) : null
}

function multMod(x, y, n) {
    const ans = expand(x, n.length)
    multMod_(ans, y, n)
    return trim(ans, 1)
}

function randTruePrime_(ans, k) {
    let c, m, pm, dd, j, r, B, divisible, z, zz, recSize
    if (primes.length == 0) {
        primes = findPrimes(30000)
    }
    if (pows.length == 0) {
        pows = new Array(512)
        for (j = 0; j < 512; j++) {
            pows[j] = Math.pow(2, j / 511 - 1)
        }
    }
    c = 0.1
    m = 20
    recLimit = 20
    if (s_i2.length != ans.length) {
        s_i2 = dup(ans)
        s_R = dup(ans)
        s_n1 = dup(ans)
        s_r2 = dup(ans)
        s_d = dup(ans)
        s_x1 = dup(ans)
        s_x2 = dup(ans)
        s_b = dup(ans)
        s_n = dup(ans)
        s_i = dup(ans)
        s_rm = dup(ans)
        s_q = dup(ans)
        s_a = dup(ans)
        s_aa = dup(ans)
    }
    if (k <= recLimit) {
        pm = (1 << ((k + 2) >> 1)) - 1
        copyInt_(ans, 0)
        for (dd = 1; dd;) {
            dd = 0
            ans[0] = 1 | (1 << (k - 1)) | Math.floor(adapterMathRandom() * (1 << k))
            for (j = 1;
                (j < primes.length) && ((primes[j] & pm) == primes[j]); j++) {
                if (0 == (ans[0] % primes[j])) {
                    dd = 1
                    break
                }
            }
        }
        carry_(ans)
        return
    }
    B = c * k * k
    if (k > 2 * m) {
        for (r = 1; k - k * r <= m;) {
            r = pows[Math.floor(adapterMathRandom() * 512)]
        }
    } else {
        r = 0.5
    }
    recSize = Math.floor(r * k) + 1
    randTruePrime_(s_q, recSize)
    copyInt_(s_i2, 0)
    s_i2[Math.floor((k - 2) / bpe)] |= (1 << ((k - 2) % bpe))
    divide_(s_i2, s_q, s_i, s_rm)
    z = bitSize(s_i)
    for (; ;) {
        for (; ;) {
            randBigInt_(s_R, z, 0)
            if (greater(s_i, s_R)) {
                break
            }
        }
        addInt_(s_R, 1)
        add_(s_R, s_i)
        copy_(s_n, s_q)
        mult_(s_n, s_R)
        multInt_(s_n, 2)
        addInt_(s_n, 1)
        copy_(s_r2, s_R)
        multInt_(s_r2, 2)
        for (divisible = 0, j = 0;
            (j < primes.length) && (primes[j] < B); j++) {
            if (modInt(s_n, primes[j]) == 0 && !equalsInt(s_n, primes[j])) {
                divisible = 1
                break
            }
        }
        if (!divisible) {
            if (!millerRabinInt(s_n, 2)) {
                divisible = 1
            }
        }
        if (!divisible) {
            addInt_(s_n, -3)
            for (j = s_n.length - 1;
                (s_n[j] == 0) && (j > 0); j--) { }
            for (zz = 0, w = s_n[j]; w;
                (w >>= 1), zz++) { }
            zz += bpe * j
            for (; ;) {
                randBigInt_(s_a, zz, 0)
                if (greater(s_n, s_a)) {
                    break
                }
            }
            addInt_(s_n, 3)
            addInt_(s_a, 2)
            copy_(s_b, s_a)
            copy_(s_n1, s_n)
            addInt_(s_n1, -1)
            powMod_(s_b, s_n1, s_n)
            addInt_(s_b, -1)
            if (isZero(s_b)) {
                copy_(s_b, s_a)
                powMod_(s_b, s_r2, s_n)
                addInt_(s_b, -1)
                copy_(s_aa, s_n)
                copy_(s_d, s_b)
                GCD_(s_d, s_n)
                if (equalsInt(s_d, 1)) {
                    copy_(ans, s_aa)
                    return
                }
            }
        }
    }
}

function randBigInt(n, s) {
    let a, b
    a = Math.floor((n - 1) / bpe) + 2
    b = int2bigInt(0, 0, a)
    randBigInt_(b, n, s)
    return b
}

function randBigInt_(b, n, s) {
    let i, a
    for (i = 0; i < b.length; i++) {
        b[i] = 0
    }
    a = Math.floor((n - 1) / bpe) + 1
    for (i = 0; i < a; i++) {
        b[i] = Math.floor(adapterMathRandom() * (1 << (bpe - 1)))
    }
    b[a - 1] &= (2 << ((n - 1) % bpe)) - 1
    if (s == 1) {
        b[a - 1] |= (1 << ((n - 1) % bpe))
    }
}

function GCD(x, y) {
    let xc, yc
    xc = dup(x)
    yc = dup(y)
    GCD_(xc, yc)
    return xc
}

function GCD_(x, y) {
    let i, xp, yp, A, B, C, D, q, sing
    if (T.length != x.length) {
        T = dup(x)
    }
    sing = 1
    while (sing) {
        sing = 0
        for (i = 1; i < y.length; i++) {
            if (y[i]) {
                sing = 1
                break
            }
        }
        if (!sing) {
            break
        }
        for (i = x.length; !x[i] && i >= 0; i--) { }
        xp = x[i]
        yp = y[i]
        A = 1
        B = 0
        C = 0
        D = 1
        while ((yp + C) && (yp + D)) {
            q = Math.floor((xp + A) / (yp + C))
            qp = Math.floor((xp + B) / (yp + D))
            if (q != qp) {
                break
            }
            t = A - q * C
            A = C
            C = t
            t = B - q * D
            B = D
            D = t
            t = xp - q * yp
            xp = yp
            yp = t
        }
        if (B) {
            copy_(T, x)
            linComb_(x, y, A, B)
            linComb_(y, T, D, C)
        } else {
            mod_(x, y)
            copy_(T, x)
            copy_(x, y)
            copy_(y, T)
        }
    }
    if (y[0] == 0) {
        return
    }
    t = modInt(x, y[0])
    copyInt_(x, y[0])
    y[0] = t
    while (y[0]) {
        x[0] %= y[0]
        t = x[0]
        x[0] = y[0]
        y[0] = t
    }
}

function inverseMod_(x, n) {
    const k = 1 + 2 * Math.max(x.length, n.length)
    if (!(x[0] & 1) && !(n[0] & 1)) {
        copyInt_(x, 0)
        return 0
    }
    if (eg_u.length != k) {
        eg_u = new Array(k)
        eg_v = new Array(k)
        eg_A = new Array(k)
        eg_B = new Array(k)
        eg_C = new Array(k)
        eg_D = new Array(k)
    }
    copy_(eg_u, x)
    copy_(eg_v, n)
    copyInt_(eg_A, 1)
    copyInt_(eg_B, 0)
    copyInt_(eg_C, 0)
    copyInt_(eg_D, 1)
    for (; ;) {
        while (!(eg_u[0] & 1)) {
            halve_(eg_u)
            if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
                halve_(eg_A)
                halve_(eg_B)
            } else {
                add_(eg_A, n)
                halve_(eg_A)
                sub_(eg_B, x)
                halve_(eg_B)
            }
        }
        while (!(eg_v[0] & 1)) {
            halve_(eg_v)
            if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
                halve_(eg_C)
                halve_(eg_D)
            } else {
                add_(eg_C, n)
                halve_(eg_C)
                sub_(eg_D, x)
                halve_(eg_D)
            }
        }
        if (!greater(eg_v, eg_u)) {
            sub_(eg_u, eg_v)
            sub_(eg_A, eg_C)
            sub_(eg_B, eg_D)
        } else {
            sub_(eg_v, eg_u)
            sub_(eg_C, eg_A)
            sub_(eg_D, eg_B)
        }
        if (equalsInt(eg_u, 0)) {
            if (negative(eg_C)) {
                add_(eg_C, n)
            }
            copy_(x, eg_C)
            if (!equalsInt(eg_v, 1)) {
                copyInt_(x, 0)
                return 0
            }
            return 1
        }
    }
}

function inverseModInt(x, n) {
    let a = 1,
        b = 0,
        t
    for (; ;) {
        if (x == 1) {
            return a
        }
        if (x == 0) {
            return 0
        }
        b -= a * Math.floor(n / x)
        n %= x
        if (n == 1) {
            return b
        }
        if (n == 0) {
            return 0
        }
        a -= b * Math.floor(x / n)
        x %= n
    }
}

function inverseModInt_(x, n) {
    return inverseModInt(x, n)
}

function eGCD_(x, y, v, a, b) {
    let g = 0
    const k = Math.max(x.length, y.length)
    if (eg_u.length != k) {
        eg_u = new Array(k)
        eg_A = new Array(k)
        eg_B = new Array(k)
        eg_C = new Array(k)
        eg_D = new Array(k)
    }
    while (!(x[0] & 1) && !(y[0] & 1)) {
        halve_(x)
        halve_(y)
        g++
    }
    copy_(eg_u, x)
    copy_(v, y)
    copyInt_(eg_A, 1)
    copyInt_(eg_B, 0)
    copyInt_(eg_C, 0)
    copyInt_(eg_D, 1)
    for (; ;) {
        while (!(eg_u[0] & 1)) {
            halve_(eg_u)
            if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
                halve_(eg_A)
                halve_(eg_B)
            } else {
                add_(eg_A, y)
                halve_(eg_A)
                sub_(eg_B, x)
                halve_(eg_B)
            }
        }
        while (!(v[0] & 1)) {
            halve_(v)
            if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
                halve_(eg_C)
                halve_(eg_D)
            } else {
                add_(eg_C, y)
                halve_(eg_C)
                sub_(eg_D, x)
                halve_(eg_D)
            }
        }
        if (!greater(v, eg_u)) {
            sub_(eg_u, v)
            sub_(eg_A, eg_C)
            sub_(eg_B, eg_D)
        } else {
            sub_(v, eg_u)
            sub_(eg_C, eg_A)
            sub_(eg_D, eg_B)
        }
        if (equalsInt(eg_u, 0)) {
            if (negative(eg_C)) {
                add_(eg_C, y)
                sub_(eg_D, x)
            }
            multInt_(eg_D, -1)
            copy_(a, eg_C)
            copy_(b, eg_D)
            leftShift_(v, g)
            return
        }
    }
}

function negative(x) {
    return ((x[x.length - 1] >> (bpe - 1)) & 1)
}

function greaterShift(x, y, shift) {
    let i, kx = x.length,
        ky = y.length
    k = ((kx + shift) < ky) ? (kx + shift) : ky
    for (i = ky - 1 - shift; i < kx && i >= 0; i++) {
        if (x[i] > 0) {
            return 1
        }
    }
    for (i = kx - 1 + shift; i < ky; i++) {
        if (y[i] > 0) {
            return 0
        }
    }
    for (i = k - 1; i >= shift; i--) {
        if (x[i - shift] > y[i]) {
            return 1
        } else {
            if (x[i - shift] < y[i]) {
                return 0
            }
        }
    }
    return 0
}

function greater(x, y) {
    let i
    const k = (x.length < y.length) ? x.length : y.length
    for (i = x.length; i < y.length; i++) {
        if (y[i]) {
            return 0
        }
    }
    for (i = y.length; i < x.length; i++) {
        if (x[i]) {
            return 1
        }
    }
    for (i = k - 1; i >= 0; i--) {
        if (x[i] > y[i]) {
            return 1
        } else {
            if (x[i] < y[i]) {
                return 0
            }
        }
    }
    return 0
}

function divide_(x, y, q, r) {
    let kx, ky
    let i, j, y1, y2, c, a, b
    copy_(r, x)
    for (ky = y.length; y[ky - 1] == 0; ky--) { }
    b = y[ky - 1]
    for (a = 0; b; a++) {
        b >>= 1
    }
    a = bpe - a
    leftShift_(y, a)
    leftShift_(r, a)
    for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--) { }
    copyInt_(q, 0)
    while (!greaterShift(y, r, kx - ky)) {
        subShift_(r, y, kx - ky)
        q[kx - ky]++
    }
    for (i = kx - 1; i >= ky; i--) {
        if (r[i] == y[ky - 1]) {
            q[i - ky] = mask
        } else {
            q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1])
        }
        for (; ;) {
            y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky]
            c = y2 >> bpe
            y2 = y2 & mask
            y1 = c + q[i - ky] * y[ky - 1]
            c = y1 >> bpe
            y1 = y1 & mask
            if (c == r[i] ? y1 == r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i]) {
                q[i - ky]--
            } else {
                break
            }
        }
        linCombShift_(r, y, -q[i - ky], i - ky)
        if (negative(r)) {
            addShift_(r, y, i - ky)
            q[i - ky]--
        }
    }
    rightShift_(y, a)
    rightShift_(r, a)
}

function carry_(x) {
    let i, k, c, b
    k = x.length
    c = 0
    for (i = 0; i < k; i++) {
        c += x[i]
        b = 0
        if (c < 0) {
            b = -(c >> bpe)
            c += b * radix
        }
        x[i] = c & mask
        c = (c >> bpe) - b
    }
}

function modInt(x, n) {
    let i, c = 0
    for (i = x.length - 1; i >= 0; i--) {
        c = (c * radix + x[i]) % n
    }
    return c
}

function int2bigInt(t, bits, minSize) {
    let i, k
    k = Math.ceil(bits / bpe) + 1
    k = minSize > k ? minSize : k
    buff = new Array(k)
    copyInt_(buff, t)
    return buff
}

export const str2bigInt = (s, base, minSize) => {

    let d, i, j, x, y, kk
    let k = s.length

    if (base == -1) {

        x = new Array(0)

        for (; ;) {

            y = new Array(x.length + 1)

            for (i = 0; i < x.length; i++) {
                y[i + 1] = x[i]
            }

            y[0] = parseInt(s, 10)

            x = y

            d = s.indexOf(',', 0)

            if (d < 1)
                break

            s = s.substring(d + 1)

            if (s.length == 0)
                break

        }

        if (x.length < minSize) {

            y = new Array(minSize)

            copy_(y, x)

            return y

        }

        return x

    }

    x = int2bigInt(0, base * k, 0)
    for (i = 0; i < k; i++) {
        d = digitsStr.indexOf(s.substring(i, i + 1), 0)
        if (base <= 36 && d >= 36) {
            d -= 26
        }
        if (d >= base || d < 0) {
            break
        }
        multInt_(x, base)
        addInt_(x, d)
    }
    for (k = x.length; k > 0 && !x[k - 1]; k--) { }
    k = minSize > k + 1 ? minSize : k + 1
    y = new Array(k)
    kk = k < x.length ? k : x.length
    for (i = 0; i < kk; i++) {
        y[i] = x[i]
    }
    for (; i < k; i++) {
        y[i] = 0
    }
    return y
}

function equalsInt(x, y) {
    let i
    if (x[0] != y) {
        return 0
    }
    for (i = 1; i < x.length; i++) {
        if (x[i]) {
            return 0
        }
    }
    return 1
}

function equals(x, y) {
    let i
    const k = x.length < y.length ? x.length : y.length
    for (i = 0; i < k; i++) {
        if (x[i] != y[i]) {
            return 0
        }
    }
    if (x.length > y.length) {
        for (; i < x.length; i++) {
            if (x[i]) {
                return 0
            }
        }
    } else {
        for (; i < y.length; i++) {
            if (y[i]) {
                return 0
            }
        }
    }
    return 1
}

function isZero(x) {
    let i
    for (i = 0; i < x.length; i++) {
        if (x[i]) {
            return 0
        }
    }
    return 1
}

function bigInt2str(x, base) {
    let i, t, s = ''
    if (s6.length != x.length) {
        s6 = dup(x)
    } else {
        copy_(s6, x)
    }
    if (base == -1) {
        for (i = x.length - 1; i > 0; i--) {
            s += x[i] + ','
        }
        s += x[0]
    } else {
        while (!isZero(s6)) {
            t = divInt_(s6, base)
            s = digitsStr.substring(t, t + 1) + s
        }
    }
    if (s.length == 0) {
        s = '0'
    }
    return s
}

function dup(x) {
    let i
    buff = new Array(x.length)
    copy_(buff, x)
    return buff
}

function copy_(x, y) {
    let i
    const k = x.length < y.length ? x.length : y.length
    for (i = 0; i < k; i++) {
        x[i] = y[i]
    }
    for (i = k; i < x.length; i++) {
        x[i] = 0
    }
}

function copyInt_(x, n) {
    let i, c
    for (c = n, i = 0; i < x.length; i++) {
        x[i] = c & mask
        c >>= bpe
    }
}

function addInt_(x, n) {
    let i, k, c, b
    x[0] += n
    k = x.length
    c = 0
    for (i = 0; i < k; i++) {
        c += x[i]
        b = 0
        if (c < 0) {
            b = -(c >> bpe)
            c += b * radix
        }
        x[i] = c & mask
        c = (c >> bpe) - b
        if (!c) {
            return
        }
    }
}

function rightShift_(x, n) {
    let i
    const k = Math.floor(n / bpe)
    if (k) {
        for (i = 0; i < x.length - k; i++) {
            x[i] = x[i + k]
        }
        for (; i < x.length; i++) {
            x[i] = 0
        }
        n %= bpe
    }
    for (i = 0; i < x.length - 1; i++) {
        x[i] = mask & ((x[i + 1] << (bpe - n)) | (x[i] >> n))
    }
    x[i] >>= n
}

function halve_(x) {
    let i
    for (i = 0; i < x.length - 1; i++) {
        x[i] = mask & ((x[i + 1] << (bpe - 1)) | (x[i] >> 1))
    }
    x[i] = (x[i] >> 1) | (x[i] & (radix >> 1))
}

function leftShift_(x, n) {
    let i
    const k = Math.floor(n / bpe)
    if (k) {
        for (i = x.length; i >= k; i--) {
            x[i] = x[i - k]
        }
        for (; i >= 0; i--) {
            x[i] = 0
        }
        n %= bpe
    }
    if (!n) {
        return
    }
    for (i = x.length - 1; i > 0; i--) {
        x[i] = mask & ((x[i] << n) | (x[i - 1] >> (bpe - n)))
    }
    x[i] = mask & (x[i] << n)
}

function multInt_(x, n) {
    let i, k, c, b
    if (!n) {
        return
    }
    k = x.length
    c = 0
    for (i = 0; i < k; i++) {
        c += x[i] * n
        b = 0
        if (c < 0) {
            b = -(c >> bpe)
            c += b * radix
        }
        x[i] = c & mask
        c = (c >> bpe) - b
    }
}

function divInt_(x, n) {
    let i, r = 0,
        s
    for (i = x.length - 1; i >= 0; i--) {
        s = r * radix + x[i]
        x[i] = Math.floor(s / n)
        r = s % n
    }
    return r
}

function linComb_(x, y, a, b) {
    let i, c, k, kk
    k = x.length < y.length ? x.length : y.length
    kk = x.length
    for (c = 0, i = 0; i < k; i++) {
        c += a * x[i] + b * y[i]
        x[i] = c & mask
        c >>= bpe
    }
    for (i = k; i < kk; i++) {
        c += a * x[i]
        x[i] = c & mask
        c >>= bpe
    }
}

function linCombShift_(x, y, b, ys) {
    let i, c, k, kk
    k = x.length < ys + y.length ? x.length : ys + y.length
    kk = x.length
    for (c = 0, i = ys; i < k; i++) {
        c += x[i] + b * y[i - ys]
        x[i] = c & mask
        c >>= bpe
    }
    for (i = k; c && i < kk; i++) {
        c += x[i]
        x[i] = c & mask
        c >>= bpe
    }
}

function addShift_(x, y, ys) {
    let i, c, k, kk
    k = x.length < ys + y.length ? x.length : ys + y.length
    kk = x.length
    for (c = 0, i = ys; i < k; i++) {
        c += x[i] + y[i - ys]
        x[i] = c & mask
        c >>= bpe
    }
    for (i = k; c && i < kk; i++) {
        c += x[i]
        x[i] = c & mask
        c >>= bpe
    }
}

function subShift_(x, y, ys) {
    let i, c, k, kk
    k = x.length < ys + y.length ? x.length : ys + y.length
    kk = x.length
    for (c = 0, i = ys; i < k; i++) {
        c += x[i] - y[i - ys]
        x[i] = c & mask
        c >>= bpe
    }
    for (i = k; c && i < kk; i++) {
        c += x[i]
        x[i] = c & mask
        c >>= bpe
    }
}

function sub_(x, y) {
    let i, c, k, kk
    k = x.length < y.length ? x.length : y.length
    for (c = 0, i = 0; i < k; i++) {
        c += x[i] - y[i]
        x[i] = c & mask
        c >>= bpe
    }
    for (i = k; c && i < x.length; i++) {
        c += x[i]
        x[i] = c & mask
        c >>= bpe
    }
}

function add_(x, y) {
    let i, c, k, kk
    k = x.length < y.length ? x.length : y.length
    for (c = 0, i = 0; i < k; i++) {
        c += x[i] + y[i]
        x[i] = c & mask
        c >>= bpe
    }
    for (i = k; c && i < x.length; i++) {
        c += x[i]
        x[i] = c & mask
        c >>= bpe
    }
}

function mult_(x, y) {
    let i
    if (ss.length != 2 * x.length) {
        ss = new Array(2 * x.length)
    }
    copyInt_(ss, 0)
    for (i = 0; i < y.length; i++) {
        if (y[i]) {
            linCombShift_(ss, x, y[i], i)
        }
    }
    copy_(x, ss)
}

function mod_(x, n) {
    if (s4.length != x.length) {
        s4 = dup(x)
    } else {
        copy_(s4, x)
    }
    if (s5.length != x.length) {
        s5 = dup(x)
    }
    divide_(s4, n, s5, x)
}

function multMod_(x, y, n) {
    let i
    if (s0.length != 2 * x.length) {
        s0 = new Array(2 * x.length)
    }
    copyInt_(s0, 0)
    for (i = 0; i < y.length; i++) {
        if (y[i]) {
            linCombShift_(s0, x, y[i], i)
        }
    }
    mod_(s0, n)
    copy_(x, s0)
}

function squareMod_(x, n) {
    let i, j, d, c, kx, kn, k
    for (kx = x.length; kx > 0 && !x[kx - 1]; kx--) { }
    k = kx > n.length ? 2 * kx : 2 * n.length
    if (s0.length != k) {
        s0 = new Array(k)
    }
    copyInt_(s0, 0)
    for (i = 0; i < kx; i++) {
        c = s0[2 * i] + x[i] * x[i]
        s0[2 * i] = c & mask
        c >>= bpe
        for (j = i + 1; j < kx; j++) {
            c = s0[i + j] + 2 * x[i] * x[j] + c
            s0[i + j] = (c & mask)
            c >>= bpe
        }
        s0[i + kx] = c
    }
    mod_(s0, n)
    copy_(x, s0)
}

function trim(x, k) {
    let i, y
    for (i = x.length; i > 0 && !x[i - 1]; i--) { }
    y = new Array(i + k)
    copy_(y, x)
    return y
}

function powMod_(x, y, n) {
    let k1, k2, kn, np
    if (s7.length != n.length) {
        s7 = dup(n)
    }
    if ((n[0] & 1) == 0) {
        copy_(s7, x)
        copyInt_(x, 1)
        while (!equalsInt(y, 0)) {
            if (y[0] & 1) {
                multMod_(x, s7, n)
            }
            divInt_(y, 2)
            squareMod_(s7, n)
        }
        return
    }
    copyInt_(s7, 0)
    for (kn = n.length; kn > 0 && !n[kn - 1]; kn--) { }
    np = radix - inverseModInt(modInt(n, radix), radix)
    s7[kn] = 1
    multMod_(x, s7, n)
    if (s3.length != x.length) {
        s3 = dup(x)
    } else {
        copy_(s3, x)
    }
    for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--) { }
    if (y[k1] == 0) {
        copyInt_(x, 1)
        return
    }
    for (k2 = 1 << (bpe - 1); k2 && !(y[k1] & k2); k2 >>= 1) { }
    for (; ;) {
        if (!(k2 >>= 1)) {
            k1--
            if (k1 < 0) {
                mont_(x, one, n, np)
                return
            }
            k2 = 1 << (bpe - 1)
        }
        mont_(x, x, n, np)
        if (k2 & y[k1]) {
            mont_(x, s3, n, np)
        }
    }
}

function mont_(x, y, n, np) {
    let i, j, c, ui, t, ks
    let kn = n.length
    let ky = y.length
    if (sa.length != kn) {
        sa = new Array(kn)
    }
    copyInt_(sa, 0)
    for (; kn > 0 && n[kn - 1] == 0; kn--) { }
    for (; ky > 0 && y[ky - 1] == 0; ky--) { }
    ks = sa.length - 1
    for (i = 0; i < kn; i++) {
        t = sa[0] + x[i] * y[0]
        ui = ((t & mask) * np) & mask
        c = (t + ui * n[0]) >> bpe
        t = x[i]
        j = 1
        for (; j < ky - 4;) {
            c += sa[j] + ui * n[j] + t * y[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j] + t * y[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j] + t * y[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j] + t * y[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j] + t * y[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
        }
        for (; j < ky;) {
            c += sa[j] + ui * n[j] + t * y[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
        }
        for (; j < kn - 4;) {
            c += sa[j] + ui * n[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
            c += sa[j] + ui * n[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
        }
        for (; j < kn;) {
            c += sa[j] + ui * n[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
        }
        for (; j < ks;) {
            c += sa[j]
            sa[j - 1] = c & mask
            c >>= bpe
            j++
        }
        sa[j - 1] = c & mask
    }
    if (!greater(n, sa)) {
        sub_(sa, n)
    }
    copy_(x, sa)
}