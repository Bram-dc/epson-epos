// FONT_A = 'font_a'
// FONT_B = 'font_b'
// FONT_C = 'font_c'
// FONT_D = 'font_d'
// FONT_E = 'font_e'
// FONT_SPECIAL_A = 'special_a'
// FONT_SPECIAL_B = 'special_b'

export const enum Font {
    A = 'font_a',
    B = 'font_b',
    C = 'font_c',
    D = 'font_d',
    E = 'font_e',
    SPECIAL_A = 'special_a',
    SPECIAL_B = 'special_b',
}

// ALIGN_LEFT = 'left'
// ALIGN_CENTER = 'center'
// ALIGN_RIGHT = 'right'

export const enum Align {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

// COLOR_NONE = 'none'
// COLOR_1 = 'color_1'
// COLOR_2 = 'color_2'
// COLOR_3 = 'color_3'
// COLOR_4 = 'color_4'

export const enum Color {
    NONE = 'none',
    ONE = 'color_1',
    TWO = 'color_2',
    THREE = 'color_3',
    FOUR = 'color_4',
}

// FEED_PEELING = 'peeling'
// FEED_CUTTING = 'cutting'
// FEED_CURRENT_TOF = 'current_tof'
// FEED_NEXT_TOF = 'next_tof'

export const enum Feed {
    PEELING = 'peeling',
    CUTTING = 'cutting',
    CURRENT_TOF = 'current_tof',
    NEXT_TOF = 'next_tof',
}

// MODE_MONO = 'mono'
// MODE_GRAY16 = 'gray16'

export const enum Mode {
    MONO = 'mono',
    GRAY16 = 'gray16',
}

// BARCODE_UPC_A = 'upc_a'
// BARCODE_UPC_E = 'upc_e'
// BARCODE_EAN13 = 'ean13'
// BARCODE_JAN13 = 'jan13'
// BARCODE_EAN8 = 'ean8'
// BARCODE_JAN8 = 'jan8'
// BARCODE_CODE39 = 'code39'
// BARCODE_ITF = 'itf'
// BARCODE_CODABAR = 'codabar'
// BARCODE_CODE93 = 'code93'
// BARCODE_CODE128 = 'code128'
// BARCODE_GS1_128 = 'gs1_128'
// BARCODE_GS1_DATABAR_OMNIDIRECTIONAL = 'gs1_databar_omnidirectional'
// BARCODE_GS1_DATABAR_TRUNCATED = 'gs1_databar_truncated'
// BARCODE_GS1_DATABAR_LIMITED = 'gs1_databar_limited'
// BARCODE_GS1_DATABAR_EXPANDED = 'gs1_databar_expanded'
// BARCODE_CODE128_AUTO = 'code128_auto'

export const enum Barcode {
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

// HRI_NONE = 'none'
// HRI_ABOVE = 'above'
// HRI_BELOW = 'below'
// HRI_BOTH = 'both'

export const enum HRI {
    NONE = 'none',
    ABOVE = 'above',
    BELOW = 'below',
    BOTH = 'both',
}

// SYMBOL_PDF417_STANDARD = 'pdf417_standard'
// SYMBOL_PDF417_TRUNCATED = 'pdf417_truncated'
// SYMBOL_QRCODE_MODEL_1 = 'qrcode_model_1'
// SYMBOL_QRCODE_MODEL_2 = 'qrcode_model_2'
// SYMBOL_QRCODE_MICRO = 'qrcode_micro'
// SYMBOL_MAXICODE_MODE_2 = 'maxicode_mode_2'
// SYMBOL_MAXICODE_MODE_3 = 'maxicode_mode_3'
// SYMBOL_MAXICODE_MODE_4 = 'maxicode_mode_4'
// SYMBOL_MAXICODE_MODE_5 = 'maxicode_mode_5'
// SYMBOL_MAXICODE_MODE_6 = 'maxicode_mode_6'
// SYMBOL_GS1_DATABAR_STACKED = 'gs1_databar_stacked'
// SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL = 'gs1_databar_stacked_omnidirectional'
// SYMBOL_GS1_DATABAR_EXPANDED_STACKED = 'gs1_databar_expanded_stacked'
// SYMBOL_AZTECCODE_FULLRANGE = 'azteccode_fullrange'
// SYMBOL_AZTECCODE_COMPACT = 'azteccode_compact'
// SYMBOL_DATAMATRIX_SQUARE = 'datamatrix_square'
// SYMBOL_DATAMATRIX_RECTANGLE_8 = 'datamatrix_rectangle_8'
// SYMBOL_DATAMATRIX_RECTANGLE_12 = 'datamatrix_rectangle_12'
// SYMBOL_DATAMATRIX_RECTANGLE_16 = 'datamatrix_rectangle_16'

export const enum Symbol_ {
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

// LEVEL_0 = 'level_0'
// LEVEL_1 = 'level_1'
// LEVEL_2 = 'level_2'
// LEVEL_3 = 'level_3'
// LEVEL_4 = 'level_4'
// LEVEL_5 = 'level_5'
// LEVEL_6 = 'level_6'
// LEVEL_7 = 'level_7'
// LEVEL_8 = 'level_8'
// LEVEL_L = 'level_l'
// LEVEL_M = 'level_m'
// LEVEL_Q = 'level_q'
// LEVEL_H = 'level_h'
// LEVEL_DEFAULT = 'default'

export const enum Level {
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

// LINE_THIN = 'thin'
// LINE_MEDIUM = 'medium'
// LINE_THICK = 'thick'
// LINE_THIN_DOUBLE = 'thin_double'
// LINE_MEDIUM_DOUBLE = 'medium_double'
// LINE_THICK_DOUBLE = 'thick_double'

export const enum Line {
    THIN = 'thin',
    MEDIUM = 'medium',
    THICK = 'thick',
    THIN_DOUBLE = 'thin_double',
    MEDIUM_DOUBLE = 'medium_double',
    THICK_DOUBLE = 'thick_double',
}

// DIRECTION_LEFT_TO_RIGHT = 'left_to_right'
// DIRECTION_BOTTOM_TO_TOP = 'bottom_to_top'
// DIRECTION_RIGHT_TO_LEFT = 'right_to_left'
// DIRECTION_TOP_TO_BOTTOM = 'top_to_bottom'

export const enum Direction {
    LEFT_TO_RIGHT = 'left_to_right',
    BOTTOM_TO_TOP = 'bottom_to_top',
    RIGHT_TO_LEFT = 'right_to_left',
    TOP_TO_BOTTOM = 'top_to_bottom',
}

// CUT_NO_FEED = 'no_feed'
// CUT_FEED = 'feed'
// CUT_RESERVE = 'reserve'

export const enum Cut {
    NO_FEED = 'no_feed',
    FEED = 'feed',
    RESERVE = 'reserve',
}

// DRAWER_1 = 'drawer_1'
// DRAWER_2 = 'drawer_2'

export const enum Drawer {
    DRAWER_1 = 'drawer_1',
    DRAWER_2 = 'drawer_2',
}

// PULSE_100 = 'pulse_100'
// PULSE_200 = 'pulse_200'
// PULSE_300 = 'pulse_300'
// PULSE_400 = 'pulse_400'
// PULSE_500 = 'pulse_500'

export const enum Pulse {
    PULSE_100 = 'pulse_100',
    PULSE_200 = 'pulse_200',
    PULSE_300 = 'pulse_300',
    PULSE_400 = 'pulse_400',
    PULSE_500 = 'pulse_500',
}

// PATTERN_NONE = 'none'
// PATTERN_0 = 'pattern_0'
// PATTERN_1 = 'pattern_1'
// PATTERN_2 = 'pattern_2'
// PATTERN_3 = 'pattern_3'
// PATTERN_4 = 'pattern_4'
// PATTERN_5 = 'pattern_5'
// PATTERN_6 = 'pattern_6'
// PATTERN_7 = 'pattern_7'
// PATTERN_8 = 'pattern_8'
// PATTERN_9 = 'pattern_9'
// PATTERN_10 = 'pattern_10'
// PATTERN_A = 'pattern_a'
// PATTERN_B = 'pattern_b'
// PATTERN_C = 'pattern_c'
// PATTERN_D = 'pattern_d'
// PATTERN_E = 'pattern_e'
// PATTERN_ERROR = 'error'
// PATTERN_PAPER_END = 'paper_end'

export const enum Pattern {
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

// LAYOUT_RECEIPT = 'receipt'
// LAYOUT_RECEIPT_BM = 'receipt_bm'
// LAYOUT_LABEL = 'label'
// LAYOUT_LABEL_BM = 'label_bm'

export const enum Paper {
    RECEIPT = 'receipt',
    RECEIPT_BM = 'receipt_bm',
    LABEL = 'label',
    LABEL_BM = 'label_bm',
}

// HALFTONE_DITHER = 0
// HALFTONE_ERROR_DIFFUSION = 1
// HALFTONE_THRESHOLD = 2

export const enum Halftone {
    DITHER = 0,
    ERROR_DIFFUSION = 1,
    THRESHOLD = 2,
}

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

export const enum ConnectionProbeResult {
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

// CONFIG_LEFT_CASH = 'CONFIG_LEFT_CASH'
// CONFIG_COUNT_MODE = 'CONFIG_COUNT_MODE'

export const enum CashChangerConfig {
    LEFT_CASH = 'CONFIG_LEFT_CASH',
    COUNT_MODE = 'CONFIG_COUNT_MODE',
}

// MODE_MANUAL_INPUT = 'MODE_MANUAL_INPUT'
// MODE_AUTOCOUNT = 'MODE_AUTO_COUNT'

export const enum CashChangerMode {
    MANUAL_INPUT = 'MODE_MANUAL_INPUT',
    AUTOCOUNT = 'MODE_AUTO_COUNT',
}

// DEPOSIT_CHANGE = 'DEPOSIT_CHANGE'
// DEPOSIT_NOCHANGE = 'DEPOSIT_NOCHANGE'
// DEPOSIT_REPAY = 'DEPOSIT_REPAY'

export const enum CashChangerDeposit {
    CHANGE = 'DEPOSIT_CHANGE',
    NOCHANGE = 'DEPOSIT_NOCHANGE',
    REPAY = 'DEPOSIT_REPAY',
}

// COLLECT_ALL_CASH = 'ALL_CASH'
// COLLECT_PART_OF_CASH = 'PART_OF_CASH'

export const enum CashChangerCollect {
    ALL_CASH = 'ALL_CASH',
    PART_OF_CASH = 'PART_OF_CASH',
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