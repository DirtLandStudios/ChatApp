"use strict";
// Create WebSocket connection.
var Ip = "";
var Port = "";
var UserName;
const socket = new WebSocket(`wss://${Ip}:${Port}`, "ChatApp");
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send(UserName);
});
function get_message(message) {
}
function send_message(message) {
    socket.send(message);
}
// Listen for messages
socket.addEventListener('message', get_message);
//message form: {message, user}
