var SendButton: HTMLElement | null = document.getElementById("SendButton")
var textbox_toSend: HTMLInputElement | null = document.getElementById("textbox_toSend") as HTMLInputElement
var ChatHistory: HTMLUListElement | null = document.getElementById("ChatHistory") as HTMLUListElement

var Ip: string = "localhost";
var Port: string = "8000";
var UserName: string = "";
type ChatMessage = {message: string, user: string}

const socket = new WebSocket(`wss://${Ip}:${Port}`)

socket.onmessage = function get_message(_message: MessageEvent) {
    _message.data.text().then((text: string) => {
        console.log(text)
        var incoming: ChatMessage = JSON.parse(text)
        var message: string = `${incoming.user}: ${incoming.message}`
        var newLI = document.createElement("li")
        newLI.appendChild(document.createTextNode(message))
        ChatHistory!.appendChild(newLI)
    })
}

SendButton!.addEventListener('click', () => {
    console.log("mesage to send " + textbox_toSend!.value)
    var Chatmessage: ChatMessage = {message: textbox_toSend!.value, user: UserName}
    socket.send(JSON.stringify(Chatmessage))
    
})
