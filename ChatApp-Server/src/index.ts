//const express = require('express')
const { exec } = require("child_process")
const ws = require('ws')
const https = require('https')
const fs= require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
var Chatserver = https.createServer({
    cert: fs.readFileSync('./ssl/wss/certificate.crt'),
    key: fs.readFileSync('./ssl/wss/private.pem')
})
const SaveFile: string = process.env.SAVE_FILE ?? "/config/SaveChat.json"
type ChatMessage = {message: string, user: string}
const ChatPort = 8999
const wss = new ws.WebSocketServer({clientTracking: true, server: Chatserver/* , handleProtocols: handleChatProtocols */})
var Chat: ChatMessage[]
/* 
function handleChatProtocols(protocols: any, request: any) {

}
*/

wss.on('connection', (ws: WebSocket, request: any) => {
    console.log("connected: " + ws)
})

wss.on('message', (data: string) => {
    console.log('received: %s', data)
    var message: ChatMessage = JSON.parse(data)
    Chat.push( message )
    wss.clients.forEach((client: any) => {
        client.send(message)
    })
})


readline.on('line', (input: string) => {
    switch (input) {
        case "start":
            Chatserver.listen(ChatPort)
            console.log("PORT: " + ChatPort)
            break
        case "save":
            fs.writeFileSync(SaveFile, JSON.stringify(Chat))
            console.log("SAVED: " + SaveFile)
            break
        case "stop":
            Chatserver.close()
            break
        default:
            if (input.startsWith("cmd")) {
                exec(input.slice(4), (error: any, stdout: any, stderr: any) => {
                    if (error) {
                        console.log(`error: ${error.message}`)
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`)
                        return
                    }
                    console.log(`stdout: ${stdout}`)
                })
            }
            else console.log("what? (%s)", input)
    }

})