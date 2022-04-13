import ePOSPrint from './ePOSPrint'
import { Align, Color, Cut, Feed, Paper, Mode } from '../functions/enums'
import Connection from './Connection'

export default class CanvasPrint extends ePOSPrint {
    mode = Mode.MONO
    halftone = 0
    brightness = 1
    align = Align.LEFT
    color = Color.ONE
    paper = Paper.RECEIPT
    feed = Feed.CURRENT_TOF
    cut = false
    layout: CanvasLayout | null = null
    connectionObj: Connection | null = null

    constructor(address?: string) {
        super(address)
    }

    setConnectionObject(connectionObj: Connection) {
        this.connectionObj = connectionObj
    }

    print(...rest: any[]) {
        const args = arguments.length
        const address = this.address,
            layout = this.layout,
            paper = this.paper,
            canvas = rest[0]
        let cut = this.cut,
            mode = this.mode,
            printjobid = undefined
        switch (args) {
            case 2:
                printjobid = rest[1]
                break
            case 3:
                cut = rest[1]
                mode = rest[2]
                break
            case 4:
                cut = rest[1]
                mode = rest[2]
                printjobid = rest[3]
                break
        }
        if (canvas === undefined || canvas === null) {
            throw new Error('Canvas is not supported')
        }
        if (!canvas.getContext) {
            throw new Error('Canvas is not supported')
        }
        if (layout) {
            this.addLayout(paper, layout.width, layout.height, layout.margin_top, layout.margin_bottom, layout.offset_cut, layout.offset_label)
        }
        if (paper != Paper.RECEIPT) {
            this.addFeedPosition(Feed.CURRENT_TOF)
            if (layout) {
                this.addFeedPosition(Feed.NEXT_TOF)
            }
        }
        this.addTextAlign(this.align)
        this.addImage(canvas.getContext('2d'), 0, 0, canvas.width, canvas.height, this.color, mode)
        if (paper !== Paper.RECEIPT) {
            this.addFeedPosition(this.feed)
            if (cut) {
                this.addCut(Cut.NO_FEED)
            }
        } else {
            if (cut) {
                this.addCut(Cut.FEED)
            }
        }
        this.send(address ?? '', this.toString(), printjobid)
    }

    recover() {
        this.force = true
        this.addRecovery()
        this.send(this.address ?? '', this.toString())
    }

    reset() {
        this.addReset()
        this.send(this.address ?? '', this.toString())
    }

}