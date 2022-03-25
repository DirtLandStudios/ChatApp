// Create WebSocket connection.
var Ip: string = "localhost";
var Port: string = "8999";
var UserName: string = "";
type ChatMessage = {message: string, user: string}
const socket = new WebSocket(`wss://${Ip}:${Port}`, "ChatApp")
var SendButton: HTMLElement | null = document.getElementById("SendButton")
var textbox_toSend: HTMLInputElement | null = document.getElementById("mess") as HTMLInputElement
// Connection opened
socket.onopen = (event) => {
    socket.send(UserName)
};

function send_message(_message: string) {
    //Object is possibly 'null'.
    //Property 'value' does not exist on type 'HTMLElement'.
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
SendButton!.addEventListener('click', () => {
    send_message(textbox_toSend!.value)
})
