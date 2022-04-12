function Keyboard(deviceID, isCrypto) {
    this.VK_CANCEL = 3
    this.VK_BACK = 8
    this.VK_TAB = 9
    this.VK_RETURN = 13
    this.VK_SHIFT = 16
    this.VK_CONTROL = 17
    this.VK_MENU = 18
    this.VK_PAUSE = 19
    this.VK_CAPITAL = 20
    this.VK_KANA = 21
    this.VK_ESCAPE = 27
    this.VK_CONVERT = 28
    this.VK_NONCONVERT = 29
    this.VK_SPACE = 32
    this.VK_PRIOR = 33
    this.VK_NEXT = 34
    this.VK_END = 35
    this.VK_HOME = 36
    this.VK_LEFT = 37
    this.VK_UP = 38
    this.VK_RIGHT = 39
    this.VK_DOWN = 40
    this.VK_INSERT = 45
    this.VK_DELETE = 46
    this.VK_0 = 48
    this.VK_1 = 49
    this.VK_2 = 50
    this.VK_3 = 51
    this.VK_4 = 52
    this.VK_5 = 53
    this.VK_6 = 54
    this.VK_7 = 55
    this.VK_8 = 56
    this.VK_9 = 57
    this.VK_A = 65
    this.VK_B = 66
    this.VK_C = 67
    this.VK_D = 68
    this.VK_E = 69
    this.VK_F = 70
    this.VK_G = 71
    this.VK_H = 72
    this.VK_I = 73
    this.VK_J = 74
    this.VK_K = 75
    this.VK_L = 76
    this.VK_M = 77
    this.VK_N = 78
    this.VK_O = 79
    this.VK_P = 80
    this.VK_Q = 81
    this.VK_R = 82
    this.VK_S = 83
    this.VK_T = 84
    this.VK_U = 85
    this.VK_V = 86
    this.VK_W = 87
    this.VK_X = 88
    this.VK_Y = 89
    this.VK_Z = 90
    this.VK_LWIN = 91
    this.VK_RWIN = 92
    this.VK_APPS = 93
    this.VK_NUMPAD0 = 96
    this.VK_NUMPAD1 = 97
    this.VK_NUMPAD2 = 98
    this.VK_NUMPAD3 = 99
    this.VK_NUMPAD4 = 100
    this.VK_NUMPAD5 = 101
    this.VK_NUMPAD6 = 102
    this.VK_NUMPAD7 = 103
    this.VK_NUMPAD8 = 104
    this.VK_NUMPAD9 = 105
    this.VK_MULTIPLY = 106
    this.VK_ADD = 107
    this.VK_SEPARATOR = 108
    this.VK_SUBTRACT = 109
    this.VK_DECIMAL = 110
    this.VK_DIVIDE = 111
    this.VK_F1 = 112
    this.VK_F2 = 113
    this.VK_F3 = 114
    this.VK_F4 = 115
    this.VK_F5 = 116
    this.VK_F6 = 117
    this.VK_F7 = 118
    this.VK_F8 = 119
    this.VK_F9 = 120
    this.VK_F10 = 121
    this.VK_F11 = 122
    this.VK_F12 = 123
    this.VK_NUMLOCK = 144
    this.VK_SCROLL = 145
    this.VK_LSHIFT = 160
    this.VK_RSHIFT = 161
    this.VK_LCONTROL = 162
    this.VK_RCONTROL = 163
    this.VK_LMENU = 164
    this.VK_RMENU = 165
    this.VK_OEM_1 = 186
    this.VK_OEM_PLUS = 187
    this.VK_OEM_COMMA = 188
    this.VK_OEM_MINUS = 189
    this.VK_OEM_PERIOD = 190
    this.VK_OEM_2 = 191
    this.VK_OEM_3 = 192
    this.VK_OEM_4 = 219
    this.VK_OEM_5 = 220
    this.VK_OEM_6 = 221
    this.VK_OEM_7 = 222
    this.VK_OEM_102 = 226
    this.VK_OEM_ATTN = 240
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.connectionObj = null
}
Keyboard.prototype = {
    setConnectionObject: function (connectionObj) {
        this.connectionObj = connectionObj
    },
    client_onkeypress: function (data) {
        try {
            if (this.onkeypress == null) {
                return
            }
            this.onkeypress(data)
        } catch (e) { }
        return
    },
    client_onstring: function (data) {
        try {
            if (this.onstring == null) {
                return
            }
            this.onstring(data)
        } catch (e) { }
        return
    },
    setPrefix: function (keycodes) {
        var data = {
            type: "setprefix"
        }
        if (typeof keycodes == "object") {
            if ((keycodes.length == 0)) {
                return -1
            }
            data.keycodes = keycodes
        } else {
            if ((keycodes == null) || (keycodes == "")) {
                return -1
            }
            data.keycodes = [keycodes]
        }
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    },
    callEvent: function (eventName, data) {
        var eventReq = data
        eventReq.type = eventName
        var eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, eventReq, this.isCrypto)
        var sequence = -1
        try {
            this.connectionObj.emit(eposmsg)
            sequence = eposmsg.sequence
        } catch (e) { }
        return sequence
    }
}