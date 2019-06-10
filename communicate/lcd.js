class LCD {
    constructor(socket) {
        this.socket = socket;
    }

    send(message){
        var json = {
			"message": message, //có một phần tử là "led", phần tử này chứa giá trị của mảng led
        }
        this.socket.emit("LCD", json)
    }
}
module.exports = LCD