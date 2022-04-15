type DeviceMessage = [
    DeviceMessageRequest,
    Record<string, unknown>,
] | [
    DeviceMessageRequest,
    string,
    Record<string, unknown>,
    number,
] | [
    DeviceMessageRequest,
    number,
    string,
    Record<string, unknown>,
    number,
] | [
    DeviceMessageRequest,
    number,
    string,
    boolean,
    Record<string, unknown>,
    number,
] | [
    DeviceMessageRequest,
    number,
    Record<string, unknown>,
    number,
]

type CanvasLayout = {
    width: number
    height: number
    margin_top: number
    margin_bottom: number
    offset_cut: number
    offset_label: number
}