import ePOSBuilder from './ePOSBuilder'
import ePOSDevice from './ePOSDevice'
import ePOSDeviceConfiguration from './ePOSDeviceConfiguration'
import ePOSPrint from './ePOSBuilder/ePOSPrint'
import CanvasPrint from './ePOSBuilder/ePOSPrint/CanvasPrint'

const epson = {
    ePOSBuilder,
    ePOSPrint,
    CanvasPrint,
    ePOSDevice,
    ePOSDeviceConfiguration,
}

export default epson