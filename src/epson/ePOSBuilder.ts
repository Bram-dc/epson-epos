import { regexAlign, regexBarcode, regexColor, regexCut, regexDirection, regexDrawer, regexFeed, regexFont, regexHri, regexLayout, regexLevel, regexLine, regexMode, regexPattern, regexPulse, regexSymbol } from '../constants/regex'
import { Align, Barcode, Color, Cut, Direction, Drawer, Feed, Font, HRI, Paper, Level, Line, Mode, Pattern, Pulse, Symbol_ } from '../functions/enums'
import { escapeControl, escapeMarkup, getBoolAttr, getEnumAttr, getEnumIntAttr, getIntAttr, getShortAttr, getUByteAttr, getUShortAttr, toBase64Binary, toGrayImage, toHexBinary, toMonoImage } from '../functions/misc'

export default class ePOSBuilder {
    message = ''
    halftone = 0
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
        const ht = this.halftone,
            br = this.brightness
        getUShortAttr('x', x)
        getUShortAttr('y', y)
        s += getUShortAttr('width', width)
        s += getUShortAttr('height', height)
        if (color !== undefined) {
            s += getEnumAttr('color', color, regexColor)
        }
        if (mode !== undefined) {
            s += getEnumAttr('mode', mode, regexMode)
        }
        if (isNaN(ht) || ht < 0 || ht > 2) {
            throw new Error('Property "halftone" is invalid')
        }
        if (isNaN(br) || br < 0.1 || br > 10) {
            throw new Error('Property "brightness" is invalid')
        }
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

    addBarcode(data: string, type: Barcode, hri?: HRI, font?: Font, width?: number, height?: number) {
        let s = ''
        s += getEnumAttr('type', type, regexBarcode)
        if (hri !== undefined) {
            s += getEnumAttr('hri', hri, regexHri)
        }
        if (font !== undefined) {
            s += getEnumAttr('font', font, regexFont)
        }
        if (width !== undefined) {
            s += getUByteAttr('width', width)
        }
        if (height !== undefined) {
            s += getUByteAttr('height', height)
        }
        this.message += '<barcode' + s + '>' + escapeControl(escapeMarkup(data)) + '</barcode>'
        return this
    }

    addSymbol(data: string, type: Symbol_, level?: Level, width?: number, height?: number, size?: number) {
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

    addPageDirection(dir: Direction) {
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
        if (style !== undefined) {
            s += getEnumAttr('style', style, regexLine)
        }
        this.message += '<line' + s + '/>'
        return this
    }

    addPageRectangle(x1: number, y1: number, x2: number, y2: number, style?: Line) {
        let s = ''
        s += getUShortAttr('x1', x1)
        s += getUShortAttr('y1', y1)
        s += getUShortAttr('x2', x2)
        s += getUShortAttr('y2', y2)
        if (style !== undefined) {
            s += getEnumAttr('style', style, regexLine)
        }
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
        if (type !== undefined) {
            s += getEnumAttr('type', type, regexCut)
        }
        this.message += '<cut' + s + '/>'
        return this
    }

    addPulse(drawer?: Drawer, time?: Pulse) {
        let s = ''
        if (drawer !== undefined) {
            s += getEnumAttr('drawer', drawer, regexDrawer)
        }
        if (time !== undefined) {
            s += getEnumAttr('time', time, regexPulse)
        }
        this.message += '<pulse' + s + '/>'
        return this
    }

    addSound(pattern?: Pattern, repeat?: number, cycle?: number) {

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

    addLayout(type: Paper, width?: number, height?: number, margin_top?: number, margin_bottom?: number, offset_cut?: number, offset_label?: number) {

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