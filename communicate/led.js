class LED {
    constructor(port, socket) {
        this.port = port;
        this.socket = socket;
    }

    turnOn(){
        var json = {
			"port": this.port, //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
            "value": true
        }
        this.socket.emit("LED", json)
    }

    turnOff(){
        var json = {
			"port": this.port, //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
            "value": false
        }
        this.socket.emit("LED", json)
    }
}
module.exports = LED