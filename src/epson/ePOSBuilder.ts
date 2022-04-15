import { regexAlign, regexBarcode, regexColor, regexCut, regexDirection, regexDrawer, regexFeed, regexFont, regexHri, regexLayout, regexLevel, regexLine, regexMode, regexPattern, regexPulse, regexSymbol } from '../constants/regex'
import { escapeControl, escapeMarkup, getBoolAttr, getEnumAttr, getEnumIntAttr, getIntAttr, getShortAttr, getUByteAttr, getUShortAttr, toBase64Binary, toGrayImage, toHexBinary, toMonoImage } from '../functions/misc'

const enum Font {
    A = 'font_a',
    B = 'font_b',
    C = 'font_c',
    D = 'font_d',
    E = 'font_e',
    SPECIAL_A = 'special_a',
    SPECIAL_B = 'special_b',
}

const enum Align {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

const enum Color {
    NONE = 'none',
    ONE = 'color_1',
    TWO = 'color_2',
    THREE = 'color_3',
    FOUR = 'color_4',
}

const enum Feed {
    PEELING = 'peeling',
    CUTTING = 'cutting',
    CURRENT_TOF = 'current_tof',
    NEXT_TOF = 'next_tof',
}

const enum Mode {
    MONO = 'mono',
    GRAY16 = 'gray16',
}

const enum BarcodeType {
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

const enum BarcodeHRI {
    NONE = 'none',
    ABOVE = 'above',
    BELOW = 'below',
    BOTH = 'both',
}

const enum BarcodeSymbol {
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

const enum SymbolLevel {
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

const enum Line {
    THIN = 'thin',
    MEDIUM = 'medium',
    THICK = 'thick',
    THIN_DOUBLE = 'thin_double',
    MEDIUM_DOUBLE = 'medium_double',
    THICK_DOUBLE = 'thick_double',
}

const enum PageDirection {
    LEFT_TO_RIGHT = 'left_to_right',
    BOTTOM_TO_TOP = 'bottom_to_top',
    RIGHT_TO_LEFT = 'right_to_left',
    TOP_TO_BOTTOM = 'top_to_bottom',
}

const enum Cut {
    NO_FEED = 'no_feed',
    FEED = 'feed',
    RESERVE = 'reserve',
}

const enum Drawer {
    DRAWER_1 = 'drawer_1',
    DRAWER_2 = 'drawer_2',
}

const enum Pulse {
    PULSE_100 = 'pulse_100',
    PULSE_200 = 'pulse_200',
    PULSE_300 = 'pulse_300',
    PULSE_400 = 'pulse_400',
    PULSE_500 = 'pulse_500',
}

const enum SoundPattern {
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

const enum PaperType {
    RECEIPT = 'receipt',
    RECEIPT_BM = 'receipt_bm',
    LABEL = 'label',
    LABEL_BM = 'label_bm',
}

const enum Halftone {
    DITHER = 0,
    ERROR_DIFFUSION = 1,
    THRESHOLD = 2,
}

export default class ePOSBuilder {
    message = ''
    halftone = Halftone.DITHER
    brightness = 1
    force = false

    constructor() {

        //

    }

    addText(data: string) {

        this.message += '<text>' + escapeMarkup(data) + '</text>'

        return this

    }

    addTextLang(lang: string) {

        this.message += '<text lang="' + lang + '"/>'

        return this

    }

    addTextAlign(align: Align) {

        let s = ''
        s += getEnumAttr('align', align, regexAlign)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextRotate(rotate: boolean) {

        let s = ''
        s += getBoolAttr('rotate', rotate)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextLineSpace(linespc: number) {

        let s = ''
        s += getUByteAttr('linespc', linespc)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextFont(font: Font) {
        let s = ''
        s += getEnumAttr('font', font, regexFont)
        this.message += '<text' + s + '/>'
        return this
    }

    addTextSmooth(smooth: boolean) {

        let s = ''
        s += getBoolAttr('smooth', smooth)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextDouble(dw?: boolean, dh?: boolean) {

        let s = ''
        if (dw !== undefined)
            s += getBoolAttr('dw', dw)

        if (dh !== undefined)
            s += getBoolAttr('dh', dh)


        this.message += '<text' + s + '/>'

        return this

    }

    addTextSize(width?: number, height?: number) {

        let s = ''
        if (width !== undefined)
            s += getIntAttr('width', width, 1, 8)

        if (height !== undefined)
            s += getIntAttr('height', height, 1, 8)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextStyle(reverse?: boolean, ul?: boolean, em?: boolean, color?: Color) {

        let s = ''
        if (reverse !== undefined)
            s += getBoolAttr('reverse', reverse)

        if (ul !== undefined)
            s += getBoolAttr('ul', ul)

        if (em !== undefined)
            s += getBoolAttr('em', em)

        if (color !== undefined)
            s += getEnumAttr('color', color, regexColor)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextPosition(x: number) {

        let s = ''
        s += getUShortAttr('x', x)

        this.message += '<text' + s + '/>'

        return this

    }

    addTextVPosition(y: number) {

        let s = ''
        s += getUShortAttr('y', y)

        this.message += '<text' + s + '/>'

        return this

    }

    addFeedUnit(unit: number) {

        let s = ''
        s += getUByteAttr('unit', unit)

        this.message += '<feed' + s + '/>'

        return this

    }

    addFeedLine(line: number) {

        let s = ''
        s += getUByteAttr('line', line)

        this.message += '<feed' + s + '/>'

        return this

    }

    addFeed() {

        this.message += '<feed/>'

        return this

    }

    addFeedPosition(pos: Feed) {

        let s = ''
        s += getEnumAttr('pos', pos, regexFeed)

        this.message += '<feed' + s + '/>'

        return this

    }

    addImage(context: any, x: number, y: number, width: number, height: number, color?: Color, mode?: Mode) { // eslint-disable-line @typescript-eslint/no-explicit-any

        let s = ''

        const ht = this.halftone
        const br = this.brightness

        getUShortAttr('x', x)
        getUShortAttr('y', y)

        s += getUShortAttr('width', width)
        s += getUShortAttr('height', height)

        if (color !== undefined)
            s += getEnumAttr('color', color, regexColor)

        if (mode !== undefined)
            s += getEnumAttr('mode', mode, regexMode)

        if (isNaN(ht) || ht < 0 || ht > 2)
            throw new Error('Property "halftone" is invalid')

        if (isNaN(br) || br < 0.1 || br > 10)
            throw new Error('Property "brightness" is invalid')

        const imgdata = context.getImageData(x, y, width, height)

        const raster = (mode === Mode.GRAY16) ? toGrayImage(imgdata, br) : toMonoImage(imgdata, ht, br)

        this.message += '<image' + s + '>' + toBase64Binary(raster) + '</image>'

        return this

    }

    addLogo(key1: number, key2: number) {

        let s = ''

        s += getUByteAttr('key1', key1)
        s += getUByteAttr('key2', key2)

        this.message += '<logo' + s + '/>'

        return this

    }

    addBarcode(data: string, type: BarcodeType, hri?: BarcodeHRI, font?: Font, width?: number, height?: number) {

        let s = ''

        s += getEnumAttr('type', type, regexBarcode)

        if (hri !== undefined)
            s += getEnumAttr('hri', hri, regexHri)

        if (font !== undefined)
            s += getEnumAttr('font', font, regexFont)

        if (width !== undefined)
            s += getUByteAttr('width', width)

        if (height !== undefined)
            s += getUByteAttr('height', height)

        this.message += '<barcode' + s + '>' + escapeControl(escapeMarkup(data)) + '</barcode>'

        return this

    }

    addSymbol(data: string, type: BarcodeSymbol, level?: SymbolLevel, width?: number, height?: number, size?: number) {
        let s = ''
        s += getEnumAttr('type', type, regexSymbol)
        if (level !== undefined) {
            s += getEnumIntAttr('level', level, regexLevel, 0, 255)
        }
        if (width !== undefined) {
            s += getUByteAttr('width', width)
        }
        if (height !== undefined) {
            s += getUByteAttr('height', height)
        }
        if (size !== undefined) {
            s += getUShortAttr('size', size)
        }
        this.message += '<symbol' + s + '>' + escapeControl(escapeMarkup(data)) + '</symbol>'
        return this
    }

    addHLine(x1: number, x2: number, style?: Line) {
        let s = ''
        s += getUShortAttr('x1', x1)
        s += getUShortAttr('x2', x2)
        if (style !== undefined) {
            s += getEnumAttr('style', style, regexLine)
        }
        this.message += '<hline' + s + '/>'
        return this
    }

    addVLineBegin(x: number, style?: Line) {
        let s = ''
        s += getUShortAttr('x', x)
        if (style !== undefined) {
            s += getEnumAttr('style', style, regexLine)
        }
        this.message += '<vline-begin' + s + '/>'
        return this
    }

    addVLineEnd(x: number, style?: Line) {
        let s = ''
        s += getUShortAttr('x', x)
        if (style !== undefined) {
            s += getEnumAttr('style', style, regexLine)
        }
        this.message += '<vline-end' + s + '/>'
        return this
    }

    addPageBegin() {
        this.message += '<page>'
        return this
    }

    addPageEnd() {
        this.message += '</page>'
        return this
    }

    addPageArea(x: number, y: number, width: number, height: number) {
        let s = ''
        s += getUShortAttr('x', x)
        s += getUShortAttr('y', y)
        s += getUShortAttr('width', width)
        s += getUShortAttr('height', height)
        this.message += '<area' + s + '/>'
        return this
    }

    addPageDirection(dir: PageDirection) {
        let s = ''
        s += getEnumAttr('dir', dir, regexDirection)
        this.message += '<direction' + s + '/>'
        return this
    }

    addPagePosition(x: number, y: number) {
        let s = ''
        s += getUShortAttr('x', x)
        s += getUShortAttr('y', y)
        this.message += '<position' + s + '/>'
        return this
    }

    addPageLine(x1: number, y1: number, x2: number, y2: number, style?: Line) {

        let s = ''

        s += getUShortAttr('x1', x1)
        s += getUShortAttr('y1', y1)
        s += getUShortAttr('x2', x2)
        s += getUShortAttr('y2', y2)

        if (style !== undefined)
            s += getEnumAttr('style', style, regexLine)

        this.message += '<line' + s + '/>'

        return this

    }

    addPageRectangle(x1: number, y1: number, x2: number, y2: number, style?: Line) {

        let s = ''

        s += getUShortAttr('x1', x1)
        s += getUShortAttr('y1', y1)
        s += getUShortAttr('x2', x2)
        s += getUShortAttr('y2', y2)

        if (style !== undefined)
            s += getEnumAttr('style', style, regexLine)

        this.message += '<rectangle' + s + '/>'

        return this

    }

    addRotateBegin() {
        this.message += '<rotate-begin/>'

        return this

    }

    addRotateEnd() {

        this.message += '<rotate-end/>'

        return this

    }

    addCut(type?: Cut) {

        let s = ''

        if (type !== undefined)
            s += getEnumAttr('type', type, regexCut)

        this.message += '<cut' + s + '/>'

        return this

    }

    addPulse(drawer?: Drawer, time?: Pulse) {

        let s = ''

        if (drawer !== undefined)
            s += getEnumAttr('drawer', drawer, regexDrawer)

        if (time !== undefined)
            s += getEnumAttr('time', time, regexPulse)

        this.message += '<pulse' + s + '/>'

        return this

    }

    addSound(pattern?: SoundPattern, repeat?: number, cycle?: number) {

        let s = ''

        if (pattern !== undefined)
            s += getEnumAttr('pattern', pattern, regexPattern)

        if (repeat !== undefined)
            s += getUByteAttr('repeat', repeat)

        if (cycle !== undefined)
            s += getUShortAttr('cycle', cycle)

        this.message += '<sound' + s + '/>'

        return this

    }

    addLayout(type: PaperType, width?: number, height?: number, margin_top?: number, margin_bottom?: number, offset_cut?: number, offset_label?: number) {

        let s = ''

        s += getEnumAttr('type', type, regexLayout)

        if (width !== undefined)
            s += getUShortAttr('width', width)

        if (height !== undefined)
            s += getUShortAttr('height', height)

        if (margin_top !== undefined)
            s += getShortAttr('margin-top', margin_top)

        if (margin_bottom !== undefined)
            s += getShortAttr('margin-bottom', margin_bottom)

        if (offset_cut !== undefined)
            s += getShortAttr('offset-cut', offset_cut)

        if (offset_label !== undefined)
            s += getShortAttr('offset-label', offset_label)

        this.message += '<layout' + s + '/>'

        return this

    }

    addRecovery() {

        this.message += '<recovery/>'

        return this

    }

    addReset() {

        this.message += '<reset/>'

        return this

    }

    addCommand(data: string) {

        this.message += '<command>' + toHexBinary(data) + '</command>'

        return this

    }

    toString() {

        let s = ''

        if (this.force)
            s += getBoolAttr('force', true)

        return '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"' + s + '>' + this.message + '</epos-print>'

    }

}