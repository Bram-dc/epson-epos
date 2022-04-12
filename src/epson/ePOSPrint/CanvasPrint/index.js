function CanvasPrint(address) {
    this.address = address
    this.mode = "mono"
    this.halftone = 0
    this.brightness = 1
    this.align = "left"
    this.color = "color_1"
    this.paper = "receipt"
    this.feed = "current_tof"
    this.cut = false
    this.layout = null
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
    this.HALFTONE_DITHER = 0
    this.HALFTONE_ERROR_DIFFUSION = 1
    this.HALFTONE_THRESHOLD = 2
    this.MODE_MONO = "mono"
    this.MODE_GRAY16 = "gray16"
    this.PAPER_RECEIPT = "receipt"
    this.PAPER_RECEIPT_BM = "receipt_bm"
    this.PAPER_LABEL = "label"
    this.PAPER_LABEL_BM = "label_bm"
    this.connectionObj = null
}
CanvasPrint.prototype = new ePOSPrint()
CanvasPrint.prototype.constructor = CanvasPrint
CanvasPrint.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj
}
CanvasPrint.prototype.print = function () {
    var args = arguments.length
    var address = this.address,
        layout = this.layout,
        paper = this.paper
    var canvas = arguments[0],
        cut = this.cut,
        mode = this.mode,
        printjobid = undefined
    switch (args) {
        case 2:
            printjobid = arguments[1]
            break
        case 4:
            printjobid = arguments[3]
        case 3:
            cut = arguments[1]
            mode = arguments[2]
            break
    }
    if ((typeof (canvas) == "undefined") || (canvas == null)) {
        throw new Error("Canvas is not supported")
    }
    if (!canvas.getContext) {
        throw new Error("Canvas is not supported")
    }
    if (layout) {
        this.addLayout(paper, layout.width, layout.height, layout.margin_top, layout.margin_bottom, layout.offset_cut, layout.offset_label)
    }
    if (paper != this.PAPER_RECEIPT) {
        this.addFeedPosition(this.FEED_CURRENT_TOF)
        if (layout) {
            this.addFeedPosition(this.FEED_NEXT_TOF)
        }
    }
    this.addTextAlign(this.align)
    this.addImage(canvas.getContext("2d"), 0, 0, canvas.width, canvas.height, this.color, mode)
    if (paper != this.PAPER_RECEIPT) {
        this.addFeedPosition(this.feed)
        if (cut) {
            this.addCut(this.CUT_NO_FEED)
        }
    } else {
        if (cut) {
            this.addCut(this.CUT_FEED)
        }
    }
    this.send(address, this.toString(), printjobid)
}
CanvasPrint.prototype.recover = function () {
    this.force = true
    this.addRecovery()
    this.send(this.address, this.toString())
}
CanvasPrint.prototype.reset = function () {
    this.addReset()
    this.send(this.address, this.toString())
}