function ePOSBuilder() {
    this.message = ""
    this.halftone = 0
    this.brightness = 1
    this.force = false
    this.FONT_A = "font_a"
    this.FONT_B = "font_b"
    this.FONT_C = "font_c"
    this.FONT_D = "font_d"
    this.FONT_E = "font_e"
    this.FONT_SPECIAL_A = "special_a"
    this.FONT_SPECIAL_B = "special_b"
    this.ALIGN_LEFT = "left"
    this.ALIGN_CENTER = "center"
    this.ALIGN_RIGHT = "right"
    this.COLOR_NONE = "none"
    this.COLOR_1 = "color_1"
    this.COLOR_2 = "color_2"
    this.COLOR_3 = "color_3"
    this.COLOR_4 = "color_4"
    this.FEED_PEELING = "peeling"
    this.FEED_CUTTING = "cutting"
    this.FEED_CURRENT_TOF = "current_tof"
    this.FEED_NEXT_TOF = "next_tof"
    this.MODE_MONO = "mono"
    this.MODE_GRAY16 = "gray16"
    this.BARCODE_UPC_A = "upc_a"
    this.BARCODE_UPC_E = "upc_e"
    this.BARCODE_EAN13 = "ean13"
    this.BARCODE_JAN13 = "jan13"
    this.BARCODE_EAN8 = "ean8"
    this.BARCODE_JAN8 = "jan8"
    this.BARCODE_CODE39 = "code39"
    this.BARCODE_ITF = "itf"
    this.BARCODE_CODABAR = "codabar"
    this.BARCODE_CODE93 = "code93"
    this.BARCODE_CODE128 = "code128"
    this.BARCODE_GS1_128 = "gs1_128"
    this.BARCODE_GS1_DATABAR_OMNIDIRECTIONAL = "gs1_databar_omnidirectional"
    this.BARCODE_GS1_DATABAR_TRUNCATED = "gs1_databar_truncated"
    this.BARCODE_GS1_DATABAR_LIMITED = "gs1_databar_limited"
    this.BARCODE_GS1_DATABAR_EXPANDED = "gs1_databar_expanded"
    this.BARCODE_CODE128_AUTO = "code128_auto"
    this.HRI_NONE = "none"
    this.HRI_ABOVE = "above"
    this.HRI_BELOW = "below"
    this.HRI_BOTH = "both"
    this.SYMBOL_PDF417_STANDARD = "pdf417_standard"
    this.SYMBOL_PDF417_TRUNCATED = "pdf417_truncated"
    this.SYMBOL_QRCODE_MODEL_1 = "qrcode_model_1"
    this.SYMBOL_QRCODE_MODEL_2 = "qrcode_model_2"
    this.SYMBOL_QRCODE_MICRO = "qrcode_micro"
    this.SYMBOL_MAXICODE_MODE_2 = "maxicode_mode_2"
    this.SYMBOL_MAXICODE_MODE_3 = "maxicode_mode_3"
    this.SYMBOL_MAXICODE_MODE_4 = "maxicode_mode_4"
    this.SYMBOL_MAXICODE_MODE_5 = "maxicode_mode_5"
    this.SYMBOL_MAXICODE_MODE_6 = "maxicode_mode_6"
    this.SYMBOL_GS1_DATABAR_STACKED = "gs1_databar_stacked"
    this.SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL = "gs1_databar_stacked_omnidirectional"
    this.SYMBOL_GS1_DATABAR_EXPANDED_STACKED = "gs1_databar_expanded_stacked"
    this.SYMBOL_AZTECCODE_FULLRANGE = "azteccode_fullrange"
    this.SYMBOL_AZTECCODE_COMPACT = "azteccode_compact"
    this.SYMBOL_DATAMATRIX_SQUARE = "datamatrix_square"
    this.SYMBOL_DATAMATRIX_RECTANGLE_8 = "datamatrix_rectangle_8"
    this.SYMBOL_DATAMATRIX_RECTANGLE_12 = "datamatrix_rectangle_12"
    this.SYMBOL_DATAMATRIX_RECTANGLE_16 = "datamatrix_rectangle_16"
    this.LEVEL_0 = "level_0"
    this.LEVEL_1 = "level_1"
    this.LEVEL_2 = "level_2"
    this.LEVEL_3 = "level_3"
    this.LEVEL_4 = "level_4"
    this.LEVEL_5 = "level_5"
    this.LEVEL_6 = "level_6"
    this.LEVEL_7 = "level_7"
    this.LEVEL_8 = "level_8"
    this.LEVEL_L = "level_l"
    this.LEVEL_M = "level_m"
    this.LEVEL_Q = "level_q"
    this.LEVEL_H = "level_h"
    this.LEVEL_DEFAULT = "default"
    this.LINE_THIN = "thin"
    this.LINE_MEDIUM = "medium"
    this.LINE_THICK = "thick"
    this.LINE_THIN_DOUBLE = "thin_double"
    this.LINE_MEDIUM_DOUBLE = "medium_double"
    this.LINE_THICK_DOUBLE = "thick_double"
    this.DIRECTION_LEFT_TO_RIGHT = "left_to_right"
    this.DIRECTION_BOTTOM_TO_TOP = "bottom_to_top"
    this.DIRECTION_RIGHT_TO_LEFT = "right_to_left"
    this.DIRECTION_TOP_TO_BOTTOM = "top_to_bottom"
    this.CUT_NO_FEED = "no_feed"
    this.CUT_FEED = "feed"
    this.CUT_RESERVE = "reserve"
    this.DRAWER_1 = "drawer_1"
    this.DRAWER_2 = "drawer_2"
    this.PULSE_100 = "pulse_100"
    this.PULSE_200 = "pulse_200"
    this.PULSE_300 = "pulse_300"
    this.PULSE_400 = "pulse_400"
    this.PULSE_500 = "pulse_500"
    this.PATTERN_NONE = "none"
    this.PATTERN_0 = "pattern_0"
    this.PATTERN_1 = "pattern_1"
    this.PATTERN_2 = "pattern_2"
    this.PATTERN_3 = "pattern_3"
    this.PATTERN_4 = "pattern_4"
    this.PATTERN_5 = "pattern_5"
    this.PATTERN_6 = "pattern_6"
    this.PATTERN_7 = "pattern_7"
    this.PATTERN_8 = "pattern_8"
    this.PATTERN_9 = "pattern_9"
    this.PATTERN_10 = "pattern_10"
    this.PATTERN_A = "pattern_a"
    this.PATTERN_B = "pattern_b"
    this.PATTERN_C = "pattern_c"
    this.PATTERN_D = "pattern_d"
    this.PATTERN_E = "pattern_e"
    this.PATTERN_ERROR = "error"
    this.PATTERN_PAPER_END = "paper_end"
    this.LAYOUT_RECEIPT = "receipt"
    this.LAYOUT_RECEIPT_BM = "receipt_bm"
    this.LAYOUT_LABEL = "label"
    this.LAYOUT_LABEL_BM = "label_bm"
    this.HALFTONE_DITHER = 0
    this.HALFTONE_ERROR_DIFFUSION = 1
    this.HALFTONE_THRESHOLD = 2
}
ePOSBuilder.prototype.addText = function (data) {
    this.message += "<text>" + escapeMarkup(data) + "</text>"
    return this
}
ePOSBuilder.prototype.addTextLang = function (lang) {
    this.message += '<text lang="' + lang + '"/>'
    return this
}
ePOSBuilder.prototype.addTextAlign = function (align) {
    var s = ""
    s += getEnumAttr("align", align, regexAlign)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextRotate = function (rotate) {
    var s = ""
    s += getBoolAttr("rotate", rotate)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextLineSpace = function (linespc) {
    var s = ""
    s += getUByteAttr("linespc", linespc)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextFont = function (font) {
    var s = ""
    s += getEnumAttr("font", font, regexFont)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextSmooth = function (smooth) {
    var s = ""
    s += getBoolAttr("smooth", smooth)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextDouble = function (dw, dh) {
    var s = ""
    if (dw !== undefined) {
        s += getBoolAttr("dw", dw)
    }
    if (dh !== undefined) {
        s += getBoolAttr("dh", dh)
    }
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextSize = function (width, height) {
    var s = ""
    if (width !== undefined) {
        s += getIntAttr("width", width, 1, 8)
    }
    if (height !== undefined) {
        s += getIntAttr("height", height, 1, 8)
    }
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextStyle = function (reverse, ul, em, color) {
    var s = ""
    if (reverse !== undefined) {
        s += getBoolAttr("reverse", reverse)
    }
    if (ul !== undefined) {
        s += getBoolAttr("ul", ul)
    }
    if (em !== undefined) {
        s += getBoolAttr("em", em)
    }
    if (color !== undefined) {
        s += getEnumAttr("color", color, regexColor)
    }
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextPosition = function (x) {
    var s = ""
    s += getUShortAttr("x", x)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addTextVPosition = function (y) {
    var s = ""
    s += getUShortAttr("y", y)
    this.message += "<text" + s + "/>"
    return this
}
ePOSBuilder.prototype.addFeedUnit = function (unit) {
    var s = ""
    s += getUByteAttr("unit", unit)
    this.message += "<feed" + s + "/>"
    return this
}
ePOSBuilder.prototype.addFeedLine = function (line) {
    var s = ""
    s += getUByteAttr("line", line)
    this.message += "<feed" + s + "/>"
    return this
}
ePOSBuilder.prototype.addFeed = function () {
    this.message += "<feed/>"
    return this
}
ePOSBuilder.prototype.addFeedPosition = function (pos) {
    var s = ""
    s += getEnumAttr("pos", pos, regexFeed)
    this.message += "<feed" + s + "/>"
    return this
}
ePOSBuilder.prototype.addImage = function (context, x, y, width, height, color, mode) {
    var s = "",
        ht = this.halftone,
        br = this.brightness,
        imgdata, raster
    getUShortAttr("x", x)
    getUShortAttr("y", y)
    s += getUShortAttr("width", width)
    s += getUShortAttr("height", height)
    if (color !== undefined) {
        s += getEnumAttr("color", color, regexColor)
    }
    if (mode !== undefined) {
        s += getEnumAttr("mode", mode, regexMode)
    }
    if (isNaN(ht) || ht < 0 || ht > 2) {
        throw new Error('Property "halftone" is invalid')
    }
    if (isNaN(br) || br < 0.1 || br > 10) {
        throw new Error('Property "brightness" is invalid')
    }
    imgdata = context.getImageData(x, y, width, height)
    raster = (mode == this.MODE_GRAY16) ? toGrayImage(imgdata, br) : toMonoImage(imgdata, ht, br)
    this.message += "<image" + s + ">" + toBase64Binary(raster) + "</image>"
    return this
}
ePOSBuilder.prototype.addLogo = function (key1, key2) {
    var s = ""
    s += getUByteAttr("key1", key1)
    s += getUByteAttr("key2", key2)
    this.message += "<logo" + s + "/>"
    return this
}
ePOSBuilder.prototype.addBarcode = function (data, type, hri, font, width, height) {
    var s = ""
    s += getEnumAttr("type", type, regexBarcode)
    if (hri !== undefined) {
        s += getEnumAttr("hri", hri, regexHri)
    }
    if (font !== undefined) {
        s += getEnumAttr("font", font, regexFont)
    }
    if (width !== undefined) {
        s += getUByteAttr("width", width)
    }
    if (height !== undefined) {
        s += getUByteAttr("height", height)
    }
    this.message += "<barcode" + s + ">" + escapeControl(escapeMarkup(data)) + "</barcode>"
    return this
}
ePOSBuilder.prototype.addSymbol = function (data, type, level, width, height, size) {
    var s = ""
    s += getEnumAttr("type", type, regexSymbol)
    if (level !== undefined) {
        s += getEnumIntAttr("level", level, regexLevel, 0, 255)
    }
    if (width !== undefined) {
        s += getUByteAttr("width", width)
    }
    if (height !== undefined) {
        s += getUByteAttr("height", height)
    }
    if (size !== undefined) {
        s += getUShortAttr("size", size)
    }
    this.message += "<symbol" + s + ">" + escapeControl(escapeMarkup(data)) + "</symbol>"
    return this
}
ePOSBuilder.prototype.addHLine = function (x1, x2, style) {
    var s = ""
    s += getUShortAttr("x1", x1)
    s += getUShortAttr("x2", x2)
    if (style !== undefined) {
        s += getEnumAttr("style", style, regexLine)
    }
    this.message += "<hline" + s + "/>"
    return this
}
ePOSBuilder.prototype.addVLineBegin = function (x, style) {
    var s = ""
    s += getUShortAttr("x", x)
    if (style !== undefined) {
        s += getEnumAttr("style", style, regexLine)
    }
    this.message += "<vline-begin" + s + "/>"
    return this
}
ePOSBuilder.prototype.addVLineEnd = function (x, style) {
    var s = ""
    s += getUShortAttr("x", x)
    if (style !== undefined) {
        s += getEnumAttr("style", style, regexLine)
    }
    this.message += "<vline-end" + s + "/>"
    return this
}
ePOSBuilder.prototype.addPageBegin = function () {
    this.message += "<page>"
    return this
}
ePOSBuilder.prototype.addPageEnd = function () {
    this.message += "</page>"
    return this
}
ePOSBuilder.prototype.addPageArea = function (x, y, width, height) {
    var s = ""
    s += getUShortAttr("x", x)
    s += getUShortAttr("y", y)
    s += getUShortAttr("width", width)
    s += getUShortAttr("height", height)
    this.message += "<area" + s + "/>"
    return this
}
ePOSBuilder.prototype.addPageDirection = function (dir) {
    var s = ""
    s += getEnumAttr("dir", dir, regexDirection)
    this.message += "<direction" + s + "/>"
    return this
}
ePOSBuilder.prototype.addPagePosition = function (x, y) {
    var s = ""
    s += getUShortAttr("x", x)
    s += getUShortAttr("y", y)
    this.message += "<position" + s + "/>"
    return this
}
ePOSBuilder.prototype.addPageLine = function (x1, y1, x2, y2, style) {
    var s = ""
    s += getUShortAttr("x1", x1)
    s += getUShortAttr("y1", y1)
    s += getUShortAttr("x2", x2)
    s += getUShortAttr("y2", y2)
    if (style !== undefined) {
        s += getEnumAttr("style", style, regexLine)
    }
    this.message += "<line" + s + "/>"
    return this
}
ePOSBuilder.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
    var s = ""
    s += getUShortAttr("x1", x1)
    s += getUShortAttr("y1", y1)
    s += getUShortAttr("x2", x2)
    s += getUShortAttr("y2", y2)
    if (style !== undefined) {
        s += getEnumAttr("style", style, regexLine)
    }
    this.message += "<rectangle" + s + "/>"
    return this
}
ePOSBuilder.prototype.addRotateBegin = function () {
    this.message += "<rotate-begin/>"
    return this
}
ePOSBuilder.prototype.addRotateEnd = function () {
    this.message += "<rotate-end/>"
    return this
}
ePOSBuilder.prototype.addCut = function (type) {
    var s = ""
    if (type !== undefined) {
        s += getEnumAttr("type", type, regexCut)
    }
    this.message += "<cut" + s + "/>"
    return this
}
ePOSBuilder.prototype.addPulse = function (drawer, time) {
    var s = ""
    if (drawer !== undefined) {
        s += getEnumAttr("drawer", drawer, regexDrawer)
    }
    if (time !== undefined) {
        s += getEnumAttr("time", time, regexPulse)
    }
    this.message += "<pulse" + s + "/>"
    return this
}
ePOSBuilder.prototype.addSound = function (pattern, repeat, cycle) {
    var s = ""
    if (pattern !== undefined) {
        s += getEnumAttr("pattern", pattern, regexPattern)
    }
    if (repeat !== undefined) {
        s += getUByteAttr("repeat", repeat)
    }
    if (cycle !== undefined) {
        s += getUShortAttr("cycle", cycle)
    }
    this.message += "<sound" + s + "/>"
    return this
}
ePOSBuilder.prototype.addLayout = function (type, width, height, margin_top, margin_bottom, offset_cut, offset_label) {
    var s = ""
    s += getEnumAttr("type", type, regexLayout)
    if (width !== undefined) {
        s += getUShortAttr("width", width)
    }
    if (height !== undefined) {
        s += getUShortAttr("height", height)
    }
    if (margin_top !== undefined) {
        s += getShortAttr("margin-top", margin_top)
    }
    if (margin_bottom !== undefined) {
        s += getShortAttr("margin-bottom", margin_bottom)
    }
    if (offset_cut !== undefined) {
        s += getShortAttr("offset-cut", offset_cut)
    }
    if (offset_label !== undefined) {
        s += getShortAttr("offset-label", offset_label)
    }
    this.message += "<layout" + s + "/>"
    return this
}
ePOSBuilder.prototype.addRecovery = function () {
    this.message += "<recovery/>"
    return this
}
ePOSBuilder.prototype.addReset = function () {
    this.message += "<reset/>"
    return this
}
ePOSBuilder.prototype.addCommand = function (data) {
    this.message += "<command>" + toHexBinary(data) + "</command>"
    return this
}
ePOSBuilder.prototype.toString = function () {
    var s = ""
    if (this.force) {
        s += getBoolAttr("force", true)
    }
    return '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"' + s + ">" + this.message + "</epos-print>"
}