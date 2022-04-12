function SocketGarbageBox() {
    this.box = new Array()
}
SocketGarbageBox.prototype = {
    stock: function (socket) {
        if (socket == null) {
            return
        }
        socket.removeAllListeners("connect")
        socket.removeAllListeners("close")
        socket.removeAllListeners("disconnect")
        socket.removeAllListeners("error")
        socket.removeAllListeners("connect_failed")
        socket.removeAllListeners("message")
        var clone = function () { }
        clone.prototype = socket
        this.box.push(clone)
    },
    dispose: function () {
        while (0 < this.box.length) {
            var socket = this.box.pop()
            try {
                socket.disconnect()
                delete socket
            } catch (e) { }
        }
    }
}