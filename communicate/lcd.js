class LCD {
    constructor(socket) {
        this.socket = socket;
    }

    send(message1, message2){
        var json = {
			"message-1": message1,
			"message-2": message2
        }
        this.socket.emit("LCD", json)
    }
}
module.exports = LCD
