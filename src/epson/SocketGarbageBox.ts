export default class SocketGarbageBox {
    box: SocketIOClient.Socket[] = []

    constructor() {

        //

    }

    stock(socket: SocketIOClient.Socket | null) {

        if (socket === null)
            return

        socket.removeAllListeners()

        const clone = function () {/**/ }
        clone.prototype = socket

        this.box.push(clone as unknown as SocketIOClient.Socket)

    }

    dispose() {

        while (0 < this.box.length) {

            const socket = this.box.pop()

            if (!socket)
                return

            socket.disconnect()

            // Memory leak?
            // delete socket

        }

    }

}