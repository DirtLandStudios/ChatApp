"use strict";
var SendButton = document.getElementById("SendButton");
var UserButton = document.getElementById("UsernameButton");
var textbox_toSend = document.getElementById("textbox_toSend");
var TextboxUsername = document.getElementById("TextboxUsername");
var ChatHistory = document.getElementById("ChatHistory");
var Ip = "127.0.0.1";
var Port = "8001";
var UserName = "";
const socket = new WebSocket(`wss://${Ip}:${Port}`);
socket.onmessage = function get_message(_message) {
    _message.data.text().then((text) => {
        console.log(text);
        var incoming = JSON.parse(text);
        var message = `${incoming.user}: ${incoming.message}`;
        var newLI = document.createElement("li");
        newLI.appendChild(document.createTextNode(message));
        ChatHistory.appendChild(newLI);
    });
};
UserButton.addEventListener("click", () => {
    UserName = TextboxUsername.value;
});
SendButton.addEventListener('click', () => {
    console.log("mesage to send " + textbox_toSend.value);
    var Chatmessage = { message: textbox_toSend.value, user: UserName };
    socket.send(JSON.stringify(Chatmessage));
});
