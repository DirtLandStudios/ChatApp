// Create WebSocket connection.
var Ip: string = "localhost";
var Port: string = "8999";
var UserName: string = "";
type ChatMessage = {message: string, user: string}
const socket = new WebSocket(`wss://${Ip}:${Port}`, "ChatApp")
var SendButton: HTMLElement | null = document.getElementById("SendButton")
var textbox_toSend: HTMLInputElement | null = document.getElementById("textbox_toSend") as HTMLInputElement
var ChatHistory: HTMLUListElement | null = document.getElementById("ChatHistory") as HTMLUListElement
// Connection opened
socket.onopen = (event) => {
    socket.send(UserName)
}

function send_message(_message: string) {
    var Chatmessage: ChatMessage = {message: _message, user: UserName}
    socket.send(JSON.stringify(Chatmessage))
}
function get_message(_message: MessageEvent) {
    var incoming: ChatMessage = JSON.parse(_message.data)
    var message: string = `${incoming.user}: ${incoming.message}`
    var newLI = document.createElement("li")
    newLI.appendChild(document.createTextNode(message))
    ChatHistory!.appendChild(newLI)
}
// Listen for messages
socket.onmessage = get_message

function End() {
    socket.close()
}
SendButton!.addEventListener('click', () => {
    send_message(textbox_toSend!.value)
})
