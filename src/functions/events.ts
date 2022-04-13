import ePOSPrint from '../epson/ePOSPrint'
import { ASB, DrawerOpenLevel } from './enums'

export const fireReceiveEvent = (epos: ePOSPrint, success: boolean, code: string, status: number, battery: number, printjobid?: string) => {

    if (code === 'EX_ENPC_TIMEOUT')
        code = 'ERROR_DEVICE_BUSY'

    epos.onreceive?.({
        success: success,
        code: code,
        status: status,
        battery: battery,
        printjobid: printjobid,
    })

}

export const fireStatusEvent = (epos: ePOSPrint, status: number, battery: number) => {

    if (status === 0 || status === ASB.NO_RESPONSE)
        status = epos.status | ASB.NO_RESPONSE

    const diff = epos.status == 0 ? ~0 : epos.status ^ status
    const difb = epos.status == 0 ? ~0 : epos.battery ^ battery

    epos.status = status
    epos.battery = battery

    if (diff)
        epos.onstatuschange?.(status)

    if (difb)
        epos.onbatterystatuschange?.(battery)

    if (diff & (ASB.NO_RESPONSE | ASB.OFF_LINE))
        if (status & ASB.NO_RESPONSE) {

            epos.onpoweroff?.()

        } else {

            if (status & ASB.OFF_LINE) {

                epos.onoffline?.()

            } else {

                epos.ononline?.()

            }

        }


    if (diff & ASB.COVER_OPEN)
        if (!(status & ASB.NO_RESPONSE)) {
            if (status & ASB.COVER_OPEN) {

                epos.oncoveropen?.()

            } else {

                epos.oncoverok?.()

            }
        }

    if (diff & (ASB.RECEIPT_END | ASB.RECEIPT_NEAR_END))
        if (!(status & ASB.NO_RESPONSE)) {
            if (status & ASB.RECEIPT_END) {

                epos.onpaperend?.()

            } else {
                if (status & ASB.RECEIPT_NEAR_END) {

                    epos.onpapernearend?.()

                } else {

                    epos.onpaperok?.()

                }
            }
        }

    if (diff & ASB.DRAWER_KICK)
        if (!(status & ASB.NO_RESPONSE))
            if (status & ASB.DRAWER_KICK) {
                if (epos.drawerOpenLevel === DrawerOpenLevel.HIGH) {

                    epos.ondraweropen?.()

                } else {

                    epos.ondrawerclosed?.()

                }

                epos.onbatterylow?.()

            } else {
                if (epos.drawerOpenLevel === DrawerOpenLevel.HIGH) {

                    epos.ondrawerclosed?.()

                } else {

                    epos.ondraweropen?.()

                }

                epos.onbatteryok?.()

            }


}

export const fireErrorEvent = (epos: ePOSPrint, status: number, responseText: string) => {

    epos.onerror?.({
        status: status,
        responseText: responseText,
    })

}

export const updateStatus = (epos: ePOSPrint) => {

    let delay = epos.interval

    if (epos.enabled) {

        if (isNaN(delay) || delay < 1000)
            delay = 3000

        epos.intervalid = setTimeout(() => {

            delete epos.intervalid

            if (epos.enabled)
                epos.send()

        }, delay)

    }

    delete epos.intervalxhr

}