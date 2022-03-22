// Create WebSocket connection.
var Ip: string = "";
var Port: string = "";
var UserName: string;
const socket = new WebSocket(`wss://${Ip}:${Port}`, "ChatApp")

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send(UserName)
});

function get_message(event) {
    console.log('Message from server ', event.data)
    event.data["message"]
}

function send_message(message: string) {
    socket.send(message)
}

// Listen for messages
socket.addEventListener('message', get_message)
//message form: {message, user}