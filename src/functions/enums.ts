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