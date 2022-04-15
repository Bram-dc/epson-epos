// ASB_NO_RESPONSE = 1
// ASB_PRINT_SUCCESS = 2
// ASB_DRAWER_KICK = 4
// ASB_BATTERY_OFFLINE = 4
// ASB_OFF_LINE = 8
// ASB_COVER_OPEN = 32
// ASB_PAPER_FEED = 64
// ASB_WAIT_ON_LINE = 256
// ASB_PANEL_SWITCH = 512
// ASB_MECHANICAL_ERR = 1024
// ASB_AUTOCUTTER_ERR = 2048
// ASB_UNRECOVER_ERR = 8192
// ASB_AUTORECOVER_ERR = 16384
// ASB_RECEIPT_NEAR_END = 131072
// ASB_RECEIPT_END = 524288
// ASB_BUZZER = 16777216
// ASB_WAIT_REMOVE_LABEL = 16777216
// ASB_NO_LABEL = 67108864
// ASB_SPOOLER_IS_STOPPED = 2147483648

export const enum ASB {
    NO_RESPONSE = 1,
    PRINT_SUCCESS = 2,
    DRAWER_KICK = 4,
    BATTERY_OFFLINE = 4,
    OFF_LINE = 8,
    COVER_OPEN = 32,
    PAPER_FEED = 64,
    WAIT_ON_LINE = 256,
    PANEL_SWITCH = 512,
    MECHANICAL_ERR = 1024,
    AUTOCUTTER_ERR = 2048,
    UNRECOVER_ERR = 8192,
    AUTORECOVER_ERR = 16384,
    RECEIPT_NEAR_END = 131072,
    RECEIPT_END = 524288,
    BUZZER = 16777216,
    WAIT_REMOVE_LABEL = 16777216,
    NO_LABEL = 67108864,
    SPOOLER_IS_STOPPED = 2147483648,
}

// DRAWER_OPEN_LEVEL_LOW = 0
// DRAWER_OPEN_LEVEL_HIGH = 1

export const enum DrawerOpenLevel {
    LOW = 0,
    HIGH = 1,
}

// SUCCESS = 'SUCCESS'
// CANCEL = 'CANCEL'
// ERROR_PARAMMETER = 'ERROR_PARAMMETER'
// ERROR_COMMAND = 'ERROR_COMMAND'
// ERROR_DEVICE_NOT_FOUND = 'DeviceNotFound'
// ERROR_DEVICE_BUSY = 'ERROR_DEVICE_BUSY'
// ERROR_NOT_SUPPORTED = 'ERROR_NOT_SUPPORTED'
// ERROR_COVER_OPEN = 'EPTR_COVER_OPEN'
// ERROR_TIMEOUT = 'EX_TIMEOUT'
// ERROR_AUTOMATICAL = 'EPTR_AUTOMATICAL'
// ERROR_UNRECOVERABLE = 'EPTR_UNRECOVERABLE'
// ERROR_BADPORT = 'EX_BADPORT'
// SYSTEM_ERROR = 'SYSTEM_ERROR'
// EPTR_CUTTER = 'EPTR_CUTTER'
// EPTR_MECHANICAL = 'EPTR_MECHANICAL'
// EPTR_REC_EMPTY = 'EPTR_REC_EMPTY'
// EPTR_SCHEMAERROR = 'SchemaError'
// EPTR_PRINT_SYSTEM_ERROR = 'PrintSystemError'

export const enum PrintStatus {
    SUCCESS = 'SUCCESS',
    CANCEL = 'CANCEL',
    ERROR_PARAMMETER = 'ERROR_PARAMMETER',
    ERROR_COMMAND = 'ERROR_COMMAND',
    ERROR_DEVICE_NOT_FOUND = 'DeviceNotFound',
    ERROR_DEVICE_BUSY = 'ERROR_DEVICE_BUSY',
    ERROR_NOT_SUPPORTED = 'ERROR_NOT_SUPPORTED',
    ERROR_COVER_OPEN = 'EPTR_COVER_OPEN',
    ERROR_TIMEOUT = 'EX_TIMEOUT',
    ERROR_AUTOMATICAL = 'EPTR_AUTOMATICAL',
    ERROR_UNRECOVERABLE = 'EPTR_UNRECOVERABLE',
    ERROR_BADPORT = 'EX_BADPORT',
    SYSTEM_ERROR = 'SYSTEM_ERROR',
    EPTR_CUTTER = 'EPTR_CUTTER',
    EPTR_MECHANICAL = 'EPTR_MECHANICAL',
    EPTR_REC_EMPTY = 'EPTR_REC_EMPTY',
    EPTR_SCHEMAERROR = 'SchemaError',
    EPTR_PRINT_SYSTEM_ERROR = 'PrintSystemError',
}

// DEVICE_TYPE_SCANNER = "type_scanner"
// DEVICE_TYPE_KEYBOARD = "type_keyboard"
// DEVICE_TYPE_POSKEYBOARD = "type_poskeyboard"
// DEVICE_TYPE_MSR = "type_msr"
// DEVICE_TYPE_CAT = "type_cat"
// DEVICE_TYPE_CASH_CHANGER = "type_cash_changer"
// DEVICE_TYPE_PRINTER = "type_printer"
// DEVICE_TYPE_DISPLAY = "type_display"
// DEVICE_TYPE_SIMPLE_SERIAL = "type_simple_serial"
// DEVICE_TYPE_HYBRID_PRINTER = "type_hybrid_printer"
// DEVICE_TYPE_HYBRID_PRINTER2 = "type_hybrid_printer2"
// DEVICE_TYPE_DT = "type_dt"
// DEVICE_TYPE_OTHER_PERIPHERAL = "type_other_peripheral"
// DEVICE_TYPE_GFE = "type_storage"

export const enum DeviceType {
    SCANNER = 'type_scanner',
    KEYBOARD = 'type_keyboard',
    POSKEYBOARD = 'type_poskeyboard',
    MSR = 'type_msr',
    CAT = 'type_cat',
    CASH_CHANGER = 'type_cash_changer',
    PRINTER = 'type_printer',
    DISPLAY = 'type_display',
    SIMPLE_SERIAL = 'type_simple_serial',
    HYBRID_PRINTER = 'type_hybrid_printer',
    HYBRID_PRINTER2 = 'type_hybrid_printer2',
    DT = 'type_dt',
    OTHER_PERIPHERAL = 'type_other_peripheral',
    GFE = 'type_storage',
}

// RESULT_OK = "OK"
// ERROR_SYSTEM = "SYSTEM_ERROR"
// ERROR_DEVICE_IN_USE = "DEVICE_IN_USE"
// ERROR_DEVICE_OPEN = "DEVICE_OPEN_ERROR"
// ERROR_DEVICE_CLOSE = "DEVICE_CLOSE_ERROR"
// ERROR_DEVICE_NOT_OPEN = "DEVICE_NOT_OPEN"
// ERROR_DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND"
// ERROR_PARAMETER = "ERROR_PARAMETER"

export const enum ConnectionResult {
    OK = 'OK',
    ERROR_SYSTEM = 'SYSTEM_ERROR',
    ERROR_DEVICE_IN_USE = 'DEVICE_IN_USE',
    ERROR_DEVICE_OPEN = 'DEVICE_OPEN_ERROR',
    ERROR_DEVICE_CLOSE = 'DEVICE_CLOSE_ERROR',
    ERROR_DEVICE_NOT_OPEN = 'DEVICE_NOT_OPEN',
    ERROR_DEVICE_NOT_FOUND = 'DEVICE_NOT_FOUND',
    ERROR_PARAMETER = 'ERROR_PARAMETER',
}

// CONNECT = 1
// DISCONNECT = 2
// RECONNECTING = 4

export const enum ConnectionStatus {
    CONNECT = 1,
    DISCONNECT = 2,
    RECONNECTING = 4,
}

// ACCESS_OK = "OK"
// ACCESS_ERROR = "ERROR"
// ACCESS_TIMEOUT = "TIMEOUT"
// ACCESS_NONE = "NONE"

export const enum ConnectionAccessResult {
    OK = 'OK',
    ERROR = 'ERROR',
    TIMEOUT = 'TIMEOUT',
    NONE = 'NONE',
}

// OK = "OK"
// SSL_CONNECT_OK = "SSL_CONNECT_OK"
// ERROR_TIMEOUT = "ERROR_TIMEOUT"
// ERROR_PARAMETER = "ERROR_PARAMETER"
// ERROR_SYSTEM = "SYSTEM_ERROR"

export const enum ConnectionRequestResult {
    OK = 'OK',
    SSL_CONNECT_OK = 'SSL_CONNECT_OK',
    ERROR_TIMEOUT = 'ERROR_TIMEOUT',
    ERROR_PARAMETER = 'ERROR_PARAMETER',
    ERROR_SYSTEM = 'SYSTEM_ERROR',
}

// IF_EPOSDEVICE = 1
// IF_EPOSPRINT = 2
// IF_EPOSDISPLAY = 4
// IF_ALL = 7

export const enum ConnectionIFType {
    IF_EPOSDEVICE = 1,
    IF_EPOSPRINT = 2,
    IF_EPOSDISPLAY = 4,
    IF_ALL = 7,
}

// CONNECT: 'connect'
// PUBKEY: 'pubkey'
// ADMININFO: 'admin_info'
// RECONNECT: 'reconnect'
// DISCONNECT: 'disconnect'
// OPENDEVICE: 'open_device'
// CLOSEDEVICE: 'close_device'
// DEVICEDATA: 'device_data'
// SERVICEDATA: 'service_data'
// ERROR: 'error'
// OPENCOMMBOX: 'open_commbox'
// CLOSECOMMBOX: 'close_commbox'
// COMMDATA: 'commbox_data'

export const enum DeviceMessageRequest {
    CONNECT = 'connect',
    PUBKEY = 'pubkey',
    ADMININFO = 'admin_info',
    RECONNECT = 'reconnect',
    DISCONNECT = 'disconnect',
    OPENDEVICE = 'open_device',
    CLOSEDEVICE = 'close_device',
    DEVICEDATA = 'device_data',
    SERVICEDATA = 'service_data',
    ERROR = 'error',
    OPENCOMMBOX = 'open_commbox',
    CLOSECOMMBOX = 'close_commbox',
    COMMDATA = 'commbox_data',
}

// ERROR_OK = "OK"
// ERROR_NOT_OPENED = "NOT_OPENED"
// ERROR_MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND"
// ERROR_SYSTEM_ERROR = "SYSTEM_ERROR"

export const enum CommBoxResult {
    OK = 'OK',
    NOT_OPENED = 'NOT_OPENED',
    MEMBER_NOT_FOUND = 'MEMBER_NOT_FOUND',
    SYSTEM_ERROR = 'SYSTEM_ERROR',
}

// ERROR_OK = 'OK'
// ERROR_BOX_COUNT_OVER = 'BOX_COUNT_OVER'
// ERROR_BOX_CLIENT_OVER = 'BOX_CLIENT_OVER'
// ERROR_MEMBERID_ALREADY_USED = 'MEMBERID_ALREADY_USED'
// ERROR_ALREADY_OPENED = 'ALREADY_OPENED'
// ERROR_NOT_OPENED = 'NOT_OPENED'
// ERROR_PARAMETER_ERROR = 'PARAMETER_ERROR'
// ERROR_SYSTEM_ERROR = 'SYSTEM_ERROR'

export const enum CommBoxManagerResult {
    OK = 'OK',
    BOX_COUNT_OVER = 'BOX_COUNT_OVER',
    BOX_CLIENT_OVER = 'BOX_CLIENT_OVER',
    MEMBERID_ALREADY_USED = 'MEMBERID_ALREADY_USED',
    ALREADY_OPENED = 'ALREADY_OPENED',
    NOT_OPENED = 'NOT_OPENED',
    PARAMETER_ERROR = 'PARAMETER_ERROR',
    SYSTEM_ERROR = 'SYSTEM_ERROR',
}

// SUE_POWER_ONLINE = 2001
// SUE_POWER_OFF = 2002
// SUE_POWER_OFFLINE = 2003
// SUE_POWER_OFF_OFFLINE = 2004

export const enum SuePower {
    ONLINE = 2001,
    OFF = 2002,
    OFFLINE = 2003,
    OFF_OFFLINE = 2004,
}

// SUE_STATUS_EMPTY = 11
// SUE_STATUS_NEAREMPTY = 12
// SUE_STATUS_EMPTYOK = 13
// SUE_STATUS_FULL = 21
// SUE_STATUS_NEARFULL = 22
// SUE_STATUS_FULLOK = 23
// SUE_STATUS_JAM = 31
// SUE_STATUS_JAMOK = 32

export const enum SueStatus {
    EMPTY = 11,
    NEAREMPTY = 12,
    EMPTYOK = 13,
    FULL = 21,
    NEARFULL = 22,
    FULLOK = 23,
    JAM = 31,
    JAMOK = 32,
}

// DEVICE_GROUP_ALL = 'group_all'
// DEVICE_GROUP_PRINTER = 'group_printer'
// DEVICE_GROUP_DISPLAY = 'group_display'
// DEVICE_GROUP_HID = 'group_hid'
// DEVICE_GROUP_SERIAL = 'group_serial'
// DEVICE_GROUP_OTHER = 'group_other'

export const enum DeviceGroup {
    ALL = 'group_all',
    PRINTER = 'group_printer',
    DISPLAY = 'group_display',
    HID = 'group_hid',
    SERIAL = 'group_serial',
    OTHER = 'group_other',
}

// DEVICE_TYPE_PRINTER = 'type_printer'
// DEVICE_TYPE_HYBRID_PRINTER = 'type_hybrid_printer'
// DEVICE_TYPE_DISPLAY = 'type_display'
// DEVICE_TYPE_KEYBOARD = 'type_keyboard'
// DEVICE_TYPE_SCANNER = 'type_scanner'
// DEVICE_TYPE_MSR = 'type_msr'
// DEVICE_TYPE_CASH_CHANGER = 'type_cash_changer'
// DEVICE_TYPE_SIMPLE_SERIAL = 'type_simple_serial'
// DEVICE_TYPE_CASH_DRAWER = 'type_cash_drawer'
// DEVICE_TYPE_PIN_PAD = 'type_pin_pad'
// DEVICE_TYPE_CAT = 'type_cat'
// DEVICE_TYPE_SMARTCARD_RW = 'type_smartcard_rw'

export const enum DeviceType2 {
    PRINTER = 'type_printer',
    HYBRID_PRINTER = 'type_hybrid_printer',
    DISPLAY = 'type_display',
    KEYBOARD = 'type_keyboard',
    SCANNER = 'type_scanner',
    MSR = 'type_msr',
    CASH_CHANGER = 'type_cash_changer',
    SIMPLE_SERIAL = 'type_simple_serial',
    CASH_DRAWER = 'type_cash_drawer',
    PIN_PAD = 'type_pin_pad',
    CAT = 'type_cat',
    SMARTCARD_RW = 'type_smartcard_rw',
}