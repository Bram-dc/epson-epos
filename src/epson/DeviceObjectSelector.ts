import CashChanger from './CashChanger'
import Connection from './Connection'
import DeviceTerminal from './DeviceTerminal'
import GermanyFiscalElement from './GermanyFiscalElement'
import MSR from './MSR'
import OtherPeripheral from './OtherPeripheral'
import Printer from './Printer'
import SimpleSerial from './SimpleSerial'

const type2objectMap = {
    type_scanner: Scanner,
    type_keyboard: Keyboard,
    type_poskeyboard: POSKeyboard,
    type_msr: MSR,
    type_cat: CAT,
    type_cash_changer: CashChanger,
    type_printer: Printer,
    type_display: Display,
    type_simple_serial: SimpleSerial,
    type_hybrid_printer: HybridPrinter,
    type_hybrid_printer2: HybridPrinter2,
    type_dt: DeviceTerminal,
    type_other_peripheral: OtherPeripheral,
    type_storage: GermanyFiscalElement,
}

export default class DeviceObjectSelector {
    connectionObj: Connection | null = null

    constructor() {

        //

    }

    setConnectionObject(connectionObj: Connection) {

        this.connectionObj = connectionObj

    }

    isSelectable(deviceType: keyof typeof type2objectMap) {

        if (this.connectionObj === null)
            return false

        if (this.connectionObj.isUsableDeviceIF())
            return true

        if (deviceType === 'type_printer' && this.connectionObj.isUsablePrintIF())
            return true

        if (deviceType === 'type_display' && this.connectionObj.isUsableDisplayIF())
            return true

        return false
    }

    select(deviceId: string, deviceType: keyof typeof type2objectMap, specificDevice?: (typeof type2objectMap)[keyof typeof type2objectMap], isCrypto?: boolean, ePOSDeviceContext?: any) {

        const templateObject = typeof specificDevice !== undefined ? specificDevice : type2objectMap[deviceType]

        if (typeof templateObject !== 'function')
            throw new Error('ERROR_PARAMETER')

        if (templateObject === Printer || templateObject === Display || templateObject === HybridPrinter || templateObject === HybridPrinter2)
            return new templateObject(deviceId, isCrypto, ePOSDeviceContext)

        return new templateObject(deviceId, isCrypto)

    }

}