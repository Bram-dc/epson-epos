import MessageFactory from '../MessageFactory'

const enum Font { // Also in ePOSBuilder
    A = 'font_a',
    B = 'font_b',
    C = 'font_c',
    D = 'font_d',
    E = 'font_e',
    SPECIAL_A = 'special_a',
    SPECIAL_B = 'special_b',
}

const enum Align { // Also in ePOSBuilder
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

const enum Color { // Also in ePOSBuilder
    NONE = 'none',
    ONE = 'color_1',
    TWO = 'color_2',
    THREE = 'color_3',
    FOUR = 'color_4',
}

const enum Feed { // Also in ePOSBuilder
    PEELING = 'peeling',
    CUTTING = 'cutting',
    CURRENT_TOF = 'current_tof',
    NEXT_TOF = 'next_tof',
}

const enum Mode { // Also in ePOSBuilder
    MONO = 'mono',
    GRAY16 = 'gray16',
}

const enum BarcodeType { // Also in ePOSBuilder
    UPC_A = 'upc_a',
    UPC_E = 'upc_e',
    EAN13 = 'ean13',
    JAN13 = 'jan13',
    EAN8 = 'ean8',
    JAN8 = 'jan8',
    CODE39 = 'code39',
    ITF = 'itf',
    CODABAR = 'codabar',
    CODE93 = 'code93',
    CODE128 = 'code128',
    GS1_128 = 'gs1_128',
    GS1_DATABAR_OMNIDIRECTIONAL = 'gs1_databar_omnidirectional',
    GS1_DATABAR_TRUNCATED = 'gs1_databar_truncated',
    GS1_DATABAR_LIMITED = 'gs1_databar_limited',
    GS1_DATABAR_EXPANDED = 'gs1_databar_expanded',
    CODE128_AUTO = 'code128_auto',
}

const enum BarcodeHRI { // Also in ePOSBuilder
    NONE = 'none',
    ABOVE = 'above',
    BELOW = 'below',
    BOTH = 'both',
}

const enum BarcodeSymbol { // Also in ePOSBuilder
    PDF417_STANDARD = 'pdf417_standard',
    PDF417_TRUNCATED = 'pdf417_truncated',
    QRCODE_MODEL_1 = 'qrcode_model_1',
    QRCODE_MODEL_2 = 'qrcode_model_2',
    QRCODE_MICRO = 'qrcode_micro',
    MAXICODE_MODE_2 = 'maxicode_mode_2',
    MAXICODE_MODE_3 = 'maxicode_mode_3',
    MAXICODE_MODE_4 = 'maxicode_mode_4',
    MAXICODE_MODE_5 = 'maxicode_mode_5',
    MAXICODE_MODE_6 = 'maxicode_mode_6',
    GS1_DATABAR_STACKED = 'gs1_databar_stacked',
    GS1_DATABAR_STACKED_OMNIDIRECTIONAL = 'gs1_databar_stacked_omnidirectional',
    GS1_DATABAR_EXPANDED_STACKED = 'gs1_databar_expanded_stacked',
    AZTECCODE_FULLRANGE = 'azteccode_fullrange',
    AZTECCODE_COMPACT = 'azteccode_compact',
    DATAMATRIX_SQUARE = 'datamatrix_square',
    DATAMATRIX_RECTANGLE_8 = 'datamatrix_rectangle_8',
    DATAMATRIX_RECTANGLE_12 = 'datamatrix_rectangle_12',
    DATAMATRIX_RECTANGLE_16 = 'datamatrix_rectangle_16',
}

const enum SymbolLevel { // Also in ePOSBuilder
    LEVEL_0 = 'level_0',
    LEVEL_1 = 'level_1',
    LEVEL_2 = 'level_2',
    LEVEL_3 = 'level_3',
    LEVEL_4 = 'level_4',
    LEVEL_5 = 'level_5',
    LEVEL_6 = 'level_6',
    LEVEL_7 = 'level_7',
    LEVEL_8 = 'level_8',
    LEVEL_L = 'level_l',
    LEVEL_M = 'level_m',
    LEVEL_Q = 'level_q',
    LEVEL_H = 'level_h',
    LEVEL_DEFAULT = 'default',
}

const enum Line { // Also in ePOSBuilder
    THIN = 'thin',
    MEDIUM = 'medium',
    THICK = 'thick',
    THIN_DOUBLE = 'thin_double',
    MEDIUM_DOUBLE = 'medium_double',
    THICK_DOUBLE = 'thick_double',
}

const enum PageDirection { // Also in ePOSBuilder
    LEFT_TO_RIGHT = 'left_to_right',
    BOTTOM_TO_TOP = 'bottom_to_top',
    RIGHT_TO_LEFT = 'right_to_left',
    TOP_TO_BOTTOM = 'top_to_bottom',
}

const enum Cut { // Also in ePOSBuilder
    NO_FEED = 'no_feed',
    FEED = 'feed',
    RESERVE = 'reserve',
}

const enum Drawer { // Also in ePOSBuilder
    DRAWER_1 = 'drawer_1',
    DRAWER_2 = 'drawer_2',
}

const enum Pulse { // Also in ePOSBuilder
    PULSE_100 = 'pulse_100',
    PULSE_200 = 'pulse_200',
    PULSE_300 = 'pulse_300',
    PULSE_400 = 'pulse_400',
    PULSE_500 = 'pulse_500',
}

const enum SoundPattern { // Also in ePOSBuilder
    NONE = 'none',
    PATTERN_0 = 'pattern_0',
    PATTERN_1 = 'pattern_1',
    PATTERN_2 = 'pattern_2',
    PATTERN_3 = 'pattern_3',
    PATTERN_4 = 'pattern_4',
    PATTERN_5 = 'pattern_5',
    PATTERN_6 = 'pattern_6',
    PATTERN_7 = 'pattern_7',
    PATTERN_8 = 'pattern_8',
    PATTERN_9 = 'pattern_9',
    PATTERN_10 = 'pattern_10',
    PATTERN_A = 'pattern_a',
    PATTERN_B = 'pattern_b',
    PATTERN_C = 'pattern_c',
    PATTERN_D = 'pattern_d',
    PATTERN_E = 'pattern_e',
    ERROR = 'error',
    PAPER_END = 'paper_end',
}

const enum PaperType { // Also in ePOSBuilder
    RECEIPT = 'receipt',
    RECEIPT_BM = 'receipt_bm',
    LABEL = 'label',
    LABEL_BM = 'label_bm',
}

const enum Halftone { // Also in ePOSBuilder
    DITHER = 0,
    ERROR_DIFFUSION = 1,
    THRESHOLD = 2,
}

function HybridPrinter2(deviceID, isCrypto, ePOSDeviceContext) {
    this.deviceID = deviceID
    this.isCrypto = isCrypto
    this.ePosDev = ePOSDeviceContext
    this.connectionObj = null
    this.ReceiptPrinter = null
    this.SlipPrinter2 = null
    this.ValidationPrinter = null
    this.EndorsePrinter2 = null
    this.MICRReader2 = null
    this.currentPrinter = null
    this.isMicrMode = false



    this.ASB_NO_RESPONSE = 1
    this.ASB_PRINT_SUCCESS = 2
    this.ASB_DRAWER_KICK = 4
    this.ASB_OFF_LINE = 8
    this.ASB_COVER_OPEN = 32
    this.ASB_PAPER_FEED = 64
    this.ASB_WAIT_ON_LINE = 256
    this.ASB_PANEL_SWITCH = 512
    this.ASB_MECHANICAL_ERR = 1024
    this.ASB_AUTOCUTTER_ERR = 2048
    this.ASB_UNRECOVER_ERR = 8192
    this.ASB_AUTORECOVER_ERR = 16384
    this.ASB_INSERTION_WAIT_PAPER = 65536
    this.ASB_RECEIPT_NEAR_END = 131072
    this.ASB_REMOVAL_WAIT_PAPER = 262144
    this.ASB_RECEIPT_END = 524288
    this.ASB_TOF_NOPAPER = 2097152
    this.ASB_BOF_NOPAPER = 4194304
    this.ASB_SLIP_NO_SELECT = 16777216
    this.ASB_SLIP_IMPOSSIBLE_PRINT = 33554432
    this.ASB_EJD_NOPAPER = 1073741824
    this.ASB_VALIDATION_NO_SELECT = 67108864
    this.ASB_VALIDATION_IMPOSSIBLE_PRINT = 134217728
    this.ASB_SPOOLER_IS_STOPPED = 2147483648

    this.DRAWER_OPEN_LEVEL_LOW = 0
    this.DRAWER_OPEN_LEVEL_HIGH = 1

    this.SUCCESS = 'SUCCESS'
    this.CANCEL = 'CANCEL'
    this.ERROR_CANCEL_FAILED = 'ERROR_CANCEL_FAILED'
    this.ERROR_PARAMMETER = 'ERROR_PARAMMETER'
    this.ERROR_COMMAND = 'ERROR_COMMAND'
    this.ERROR_DEVICE_NOT_FOUND = 'ERROR_DEVICE_NOT_FOUND'
    this.ERROR_DEVICE_BUSY = 'ERROR_DEVICE_BUSY'
    this.ERROR_NOT_SUPPORTED = 'ERROR_NOT_SUPPORTED'
    this.ERROR_COVER_OPEN = 'ERROR_COVER_OPEN'
    this.ERROR_TIMEOUT = 'ERROR_TIMEOUT'
    this.ERROR_AUTOMATICAL = 'ERROR_AUTOMATICAL'
    this.ERROR_UNRECOVERABLE = 'ERROR_UNRECOVERABLE'
    this.ERROR_BADPORT = 'ERROR_BADPORT'
    this.SYSTEM_ERROR = 'SYSTEM_ERROR'
    this.EPTR_AUTOMATICAL = 'EPTR_AUTOMATICAL'
    this.EPTR_COVER_OPEN = 'EPTR_COVER_OPEN'
    this.EPTR_CUTTER = 'EPTR_CUTTER'
    this.EPTR_MECHANICAL = 'EPTR_MECHANICAL'
    this.EPTR_REC_EMPTY = 'EPTR_REC_EMPTY'
    this.EPTR_UNRECOVERABLE = 'EPTR_UNRECOVERABLE'
    this.EPTR_SCHEMAERROR = 'EPTR_SCHEMAERROR'
    this.EPTR_PRINT_SYSTEM_ERROR = 'EPTR_PRINT_SYSTEM_ERROR'
    this.EPTR_PAPER_PULLED_OUT = 'EPTR_PAPER_PULLED_OUT'
    this.EMICR_ILLEGAL_LENGTH = 'EMICR_ILLEGAL_LENGTH'
    this.EMICR_NO_MICR = 'EMICR_NO_MICR'
    this.EMICR_RECOGNITION = 'EMICR_RECOGNITION'
    this.EMICR_READ = 'EMICR_READ'
    this.EMICR_NOISE_DETECTED = 'EMICR_NOISE_DETECTED'
    this.EMICR_COVER_OPENED = 'EMICR_COVER_OPENED'
    this.EMICR_PAPER_JAM = 'EMICR_PAPER_JAM'
    this.EMICR_PAPER_PULLED_OUT = 'EMICR_PAPER_PULLED_OUT'
    this.DeviceNotFound = 'DeviceNotFound'
    this.EX_TIMEOUT = 'EX_TIMEOUT'
    this.EX_BADPORT = 'EX_BADPORT'
    this.SchemaError = 'SchemaError'
    this.PrintSystemError = 'PrintSystemError'
    this.PAPERTYPE_RECEIPT = 0
    this.PAPERTYPE_SLIP = 1
    this.PAPERTYPE_ENDORSE = 2
    this.PAPERTYPE_VALIDATION = 3
    this.FONT_E13B = 'MICR_E13B'
    this.FONT_CMC7 = 'MICR_CMC7'
    this.halftone = this.HALFTONE_DITHER
    this.brightness = 1
    this.force = false
    this.drawerOpenLevel = this.DRAWER_OPEN_LEVEL_LOW
    this.paperType = this.PAPERTYPE_RECEIPT
    this.interval = 3000
    this.waitTime = 500
    this.enable40cplMode = true
    this.onstatuschange = null
    this.ononline = null
    this.onoffline = null
    this.onpoweroff = null
    this.oncoveropen = null
    this.onpaperok = null
    this.onpapernearend = null
    this.onpaperend = null
    this.ondrawerclosed = null
    this.ondraweropen = null
    this.init(deviceID)
}
HybridPrinter2.prototype.init = function (deviceID) {
    this.deviceID = deviceID
    this.ReceiptPrinter = new ReceiptPrinter(this)
    this.SlipPrinter2 = new SlipPrinter2(this)
    this.ValidationPrinter = new ValidationPrinter(this)
    this.EndorsePrinter2 = new EndorsePrinter2(this)
    this.MICRReader2 = new MICRReader2(this)
    this.currentPrinter = this.ReceiptPrinter
    this.ReceiptPrinter.onstatuschange = function (status) {
        if (this.parent.onstatuschange != null) {
            this.parent.onstatuschange(status)
        }
    }
    this.ReceiptPrinter.ononline = function () {
        if (this.parent.ononline != null) {
            this.parent.ononline()
        }
    }
    this.ReceiptPrinter.onoffline = function () {
        if (this.parent.onoffline != null) {
            this.parent.onoffline()
        }
    }
    this.ReceiptPrinter.onpoweroff = function () {
        if (this.parent.onpoweroff != null) {
            this.parent.onpoweroff()
        }
    }
    this.ReceiptPrinter.oncoveropen = function () {
        if (this.parent.oncoveropen != null) {
            this.parent.oncoveropen()
        }
    }
    this.ReceiptPrinter.oncoverok = function () {
        if (this.parent.oncoverok != null) {
            this.parent.oncoverok()
        }
    }
    this.ReceiptPrinter.onpaperok = function () {
        if (this.parent.onpaperok != null) {
            this.parent.onpaperok()
        }
    }
    this.ReceiptPrinter.onpapernearend = function () {
        if (this.parent.onpapernearend != null) {
            this.parent.onpapernearend()
        }
    }
    this.ReceiptPrinter.onpaperend = function () {
        if (this.parent.onpaperend != null) {
            this.parent.onpaperend()
        }
    }
    this.ReceiptPrinter.ondrawerclosed = function () {
        if (this.parent.ondrawerclosed != null) {
            this.parent.ondrawerclosed()
        }
    }
    this.ReceiptPrinter.ondraweropen = function () {
        if (this.parent.ondraweropen != undefined) {
            this.parent.ondraweropen()
        }
    }
    this.ReceiptPrinter.onreceive = function (res, sq) {
        this.parent.fireOnReceive(res, sq)
    }
    this.SlipPrinter2.onreceive = function (res, sq) {
        this.parent.fireOnReceive(res, sq)
    }
    this.EndorsePrinter2.onreceive = function (res, sq) {
        this.parent.fireOnReceive(res, sq)
    }
    this.ValidationPrinter.onreceive = function (res, sq) {
        this.parent.fireOnReceive(res, sq)
    }
    this.MICRReader2.onreceive = function (res, sq) {
        this.parent.fireOnReceive(res, sq)
    }
}
HybridPrinter2.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj
    this.ReceiptPrinter.setConnectionObject(this.connectionObj)
}
HybridPrinter2.prototype.isValidFunction = function (paperType, supportPaperTypes) {
    let isValid = false
    let index = 0
    if (supportPaperTypes.length != 0) {
        for (index = 0; index < supportPaperTypes.length; index++) {
            if (paperType == supportPaperTypes[index]) {
                isValid = true
                break
            }
        }
    }
    return isValid
}
HybridPrinter2.prototype.addText = function (data) {
    this.currentPrinter.addText.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextLang = function (lang) {
    this.currentPrinter.addTextLang.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextAlign = function (align) {
    this.currentPrinter.addTextAlign.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextRotate = function (rotate) {
    this.currentPrinter.addTextRotate.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextLineSpace = function (linespc) {
    this.currentPrinter.addTextLineSpace.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextFont = function (font) {
    this.currentPrinter.addTextFont.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextSmooth = function (smooth) {
    this.currentPrinter.addTextSmooth.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextDouble = function (dw, dh) {
    this.currentPrinter.addTextDouble.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextSize = function (width, height) {
    this.currentPrinter.addTextSize.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextStyle = function (reverse, ul, em, color) {
    this.currentPrinter.addTextStyle.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextPosition = function (x) {
    this.currentPrinter.addTextPosition.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addTextVPosition = function (y) {
    this.currentPrinter.addTextVPosition.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addFeedUnit = function (unit) {
    this.currentPrinter.addFeedUnit.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addFeedLine = function (line) {
    this.currentPrinter.addFeedLine.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addFeed = function () {
    this.currentPrinter.addFeed.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addFeedPosition = function (pos) {
    this.currentPrinter.addFeedPosition.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addImage = function (context, x, y, width, height, color, mode) {
    this.currentPrinter.halftone = this.halftone
    this.currentPrinter.brightness = this.brightness
    this.currentPrinter.addImage.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addLogo = function (key1, key2) {
    this.currentPrinter.addLogo.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addBarcode = function (data, type, hri, font, width, height) {
    this.currentPrinter.addBarcode.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addSymbol = function (data, type, level, width, height, size) {
    this.currentPrinter.addSymbol.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addHLine = function (x1, x2, style) {
    this.currentPrinter.addHLine.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addVLineBegin = function (x, style) {
    this.currentPrinter.addVLineBegin.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addVLineEnd = function (x, style) {
    this.currentPrinter.addVLineEnd.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPageBegin = function () {
    this.currentPrinter.addPageBegin.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPageEnd = function () {
    this.currentPrinter.addPageEnd.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPageArea = function (x, y, width, height) {
    this.currentPrinter.addPageArea.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPageDirection = function (dir) {
    this.currentPrinter.addPageDirection.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPagePosition = function (x, y) {
    this.currentPrinter.addPagePosition.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPageLine = function (x1, y1, x2, y2, style) {
    this.currentPrinter.addPageLine.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
    this.currentPrinter.addPageRectangle.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addCut = function (type) {
    this.ReceiptPrinter.addCut.apply(this.ReceiptPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addPulse = function (drawer, time) {
    this.currentPrinter.addPulse.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addSound = function (pattern, repeat, cycle) {
    this.currentPrinter.addSound.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addLayout = function (type, width, height, margin_top, margin_bottom, offset_cut, offset_label) {
    this.ReceiptPrinter.addLayout.apply(this.ReceiptPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addRecovery = function () {
    this.ReceiptPrinter.addRecovery.apply(this.ReceiptPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addReset = function () {
    this.ReceiptPrinter.addReset.apply(this.ReceiptPrinter, arguments)
    return this
}
HybridPrinter2.prototype.addCommand = function (data) {
    this.currentPrinter.addCommand.apply(this.currentPrinter, arguments)
    return this
}
HybridPrinter2.prototype.recover = function () {
    this.ReceiptPrinter.recover.apply(this.ReceiptPrinter, arguments)
    return this
}
HybridPrinter2.prototype.reset = function () {
    this.ReceiptPrinter.force = this.force
    const ret = this.ReceiptPrinter.reset.apply(this.ReceiptPrinter, arguments)
    this.force = false
    return ret
}
HybridPrinter2.prototype.setMessage = function (message) {
    this.currentPrinter.message = message
}
HybridPrinter2.prototype.getMessage = function () {
    return this.currentPrinter.message
}
HybridPrinter2.prototype.startMonitor = function () {
    let delay = this.interval
    if ((typeof (this.interval) != 'number') || delay < 1000 || 6000 < delay) {
        delay = 3000
    }
    this.ReceiptPrinter.interval = delay
    return this.ReceiptPrinter.startMonitor()
}
HybridPrinter2.prototype.stopMonitor = function () {
    return this.ReceiptPrinter.stopMonitor()
}
HybridPrinter2.prototype.lock = function () {
    const data = {
        type: 'lock',
    }
    return this.send(data)
}
HybridPrinter2.prototype.unlock = function () {
    const data = {
        type: 'unlock',
    }
    return this.send(data)
}
HybridPrinter2.prototype.selectPaperType = function (paperType) {
    if (this.isValidFunction(paperType, [this.PAPERTYPE_RECEIPT, this.PAPERTYPE_SLIP, this.PAPERTYPE_ENDORSE, this.PAPERTYPE_VALIDATION]) != true) {
        throw new Error('Property "paperType" is invalid')
    }
    switch (paperType) {
        case this.PAPERTYPE_RECEIPT:
            this.currentPrinter = this.ReceiptPrinter
            break
        case this.PAPERTYPE_SLIP:
            this.currentPrinter = this.SlipPrinter2
            break
        case this.PAPERTYPE_ENDORSE:
            this.currentPrinter = this.EndorsePrinter2
            break
        case this.PAPERTYPE_VALIDATION:
            this.currentPrinter = this.ValidationPrinter
            break
        default:
            this.currentPrinter = this.ReceiptPrinter
            break
    }
    this.paperType = paperType
    return this
}
HybridPrinter2.prototype.waitInsertion = function (timeout) {
    if (this.isValidFunction(this.paperType, [this.PAPERTYPE_SLIP, this.PAPERTYPE_ENDORSE, this.PAPERTYPE_VALIDATION]) != true) {
        throw new Error('Property "paperType" is invalid')
    }
    this.currentPrinter.waitTime = this.waitTime
    const ret = this.currentPrinter.waitInsertion.apply(this.currentPrinter, arguments)
    return ret
}
HybridPrinter2.prototype.cancelInsertion = function () {
    let ret = null
    if (this.isMicrMode) {
        ret = this.MICRReader2.cancel.apply(this.MICRReader2, arguments)
    } else {
        if (this.isValidFunction(this.paperType, [this.PAPERTYPE_SLIP, this.PAPERTYPE_ENDORSE, this.PAPERTYPE_VALIDATION]) != true) {
            throw new Error('Property "paperType" is invalid')
        }
        ret = this.currentPrinter.cancel.apply(this.currentPrinter, arguments)
    }
    return ret
}
HybridPrinter2.prototype.ejectPaper = function () {
    const data = {
        type: 'eject',
    }
    return this.send(data)
}
HybridPrinter2.prototype.sendData = function (timeout) {
    this.currentPrinter.isCrypto = this.isCrypto
    if ((typeof (timeout) != 'number') || (timeout < 1) || (timeout > 1000000)) {
        this.currentPrinter.timeout = 0
    } else {
        this.currentPrinter.timeout = timeout
    }
    this.EndorsePrinter2.enable40cplmode(this.enable40cplMode)
    this.currentPrinter.force = this.force
    const ret = this.currentPrinter.send()
    this.force = false
    return ret
}
HybridPrinter2.prototype.print = function (canvas, cut, mode, timeout) {
    if ((typeof (timeout) != 'number') || (timeout < 1) || (timeout > 1000000)) {
        this.ReceiptPrinter.timeout = 0
    } else {
        this.ReceiptPrinter.timeout = timeout
    }
    this.ReceiptPrinter.print.apply(this.ReceiptPrinter, [canvas, cut, mode])
    return this
}
HybridPrinter2.prototype.readMicrData = function (ignoreerror, micrFont, timeout) {
    let ignoreerrorMicr = ignoreerror
    let micrFontMicr = micrFont
    if (typeof (ignoreerror) == 'undefined') {
        ignoreerrorMicr = true
    }
    if (typeof (micrFont) == 'undefined') {
        micrFontMicr = this.FONT_E13B
    }
    this.MICRReader2.timeout = timeout
    this.MICRReader2.waitTime = this.waitTime
    this.MICRReader2.read.apply(this.MICRReader2, [ignoreerrorMicr, micrFontMicr])
    this.isMicrMode = true
    return this
}
HybridPrinter2.prototype.cleanMicrReader = function (timeout) {
    this.MICRReader2.timeout = timeout
    this.MICRReader2.cleaning.apply(this.MICRReader2, [])
    this.isMicrMode = true
    return this
}
HybridPrinter2.prototype.client_onreceive = function (res, sq) {
    switch (res.eventtype) {
        case 'slipprint2':
        case 'slipcancel':
        case 'slipwaitinsertion':
            this.SlipPrinter2.fireOnReceive(res, sq)
            break
        case 'endorseprint2':
        case 'endorsecancel':
        case 'endorsewaitinsertion':
            this.EndorsePrinter2.fireOnReceive(res, sq)
            break
        case 'validationprint2':
        case 'validationcancel':
        case 'validationwaitinsertion':
            this.ValidationPrinter.fireOnReceive(res, sq)
            break
        case 'micrread':
        case 'micrcleaning':
        case 'micrcancel':
            this.MICRReader2.fireOnReceive(res, sq)
            break
        case 'print':
            var tmp = res
            tmp.eventtype = this.ReceiptPrinter.methodName
            this.fireOnReceive(tmp, sq)
            break
        default:
            this.fireOnReceive(res, sq)
            break
    }
}
HybridPrinter2.prototype.client_onxmlresult = function (res, sq) {
    this.ReceiptPrinter.fireOnReceive(res, sq)
}
HybridPrinter2.prototype.fireOnReceive = function (res, sq) {
    if (typeof (this.onreceive) == undefined) {
        return
    }
    if (res == null) {
        return
    }
    let eventtype = res.eventtype
    const success = res.success
    let code = res.code
    const status = res.status
    const data = res.data
    switch (res.eventtype) {
        case 'send':
            eventtype = 'sendData'
            if (code == this.SUCCESS) {
                this.isMicrMode = false
            }
            break
        case 'waitinsertion':
            eventtype = 'waitInsertion'
            if (code == this.SUCCESS) {
                this.isMicrMode = false
            }
            break
        case 'read':
            eventtype = 'readMicrData'
            if (code == this.SUCCESS) {
                this.isMicrMode = true
            }
            break
        case 'cleaning':
            eventtype = 'cleanMicrReader'
            if (code == this.SUCCESS) {
                this.isMicrMode = true
            }
            break
        case 'cancel':
            eventtype = 'cancelInsertion'
            break
        case 'eject':
            eventtype = 'ejectPaper'
            if (code == this.SUCCESS) {
                this.isMicrMode = false
            }
            break
        default:
            break
    }
    switch (code) {
        case 'EX_ENPC_TIMEOUT':
            code = 'ERROR_DEVICE_BUSY'
            break
        case 'CANCEL':
            this.isMicrMode = false
            break
        default:
            break
    }
    this.onreceive({
        method: eventtype,
        success: success,
        code: code,
        status: status,
        data: data,
    }, sq)
}
HybridPrinter2.prototype.callEvent = function (eventName, data) {
    const eventReq = data
    eventReq.type = eventName
    return this.send(eventReq)
}
HybridPrinter2.prototype.send = function (data) {
    const eposmsg = MessageFactory.getDeviceDataMessage(this.deviceID, data, this.isCrypto)
    let sequence = -1
    try {
        this.connectionObj.emit(eposmsg)
        sequence = eposmsg.sequence
    } catch (e) { }
    return sequence
}