// Create WebSocket connection.
var Ip: string = "localhost";
var Port: string = "8999";
var UserName: string = "";
type ChatMessage = {message: string, user: string}
const socket = new WebSocket(`wss://${Ip}:${Port}`, "ChatApp")

// Connection opened
socket.onopen = (event) => {
    socket.send(UserName)
};

function send_message() {
    //Object is possibly 'null'.
    //Property 'value' does not exist on type 'HTMLElement'.
    var _message: string = document.getElementById("textbox" /*WHAT IS ID OF tEXT BOX??*/).value || ""
    var Chatmessage: ChatMessage = {message: _message, user: UserName}
    socket.send(JSON.stringify(Chatmessage))
}

// Listen for messages
socket.onmessage = (_message: MessageEvent) => {
    var incoming: ChatMessage = JSON.parse(_message.data)
    var message: string = `${incoming.user}: ${incoming.user}`
    //add this to chat history
    //document.getElementById
}
//message form: {message, user}
function End() {
    socket.close()
}