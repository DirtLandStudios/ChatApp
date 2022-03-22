// Create WebSocket connection.
var Ip;
var Port;
var UserName;
const socket = new WebSocket(`wss://${Ip}:${Port}`, "ChatApp");

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send(UserName);
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    event.data
});
//message form: {message, user}