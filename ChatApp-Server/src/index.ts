//const express = require('express')
const ws = require('ws')
const https = require('https')
const fs= require('fs');
var Chatserver = https.createServer({
    cert: fs.readFileSync('../ssl/wss/certificate.crt'),
    key: fs.readFileSync('../ssl/wss/private.pem')//,
    //ca: fs.readFileSync('../ssl/wss/ca_bundle.crt')
})
type ChatMessage = {message: string, user: string}
const ChatPort = 8999
const wss = new ws.WebSocketServer({clientTracking: true, server: Chatserver, handleProtocols: handleChatProtocols})
var Chat: ChatMessage[]
function handleChatProtocols(protocols: any, request: any) {

}
/* 
wss.on('connection', (ws: WebSocket, request: http.IncomingMessage) => {

})
 */
wss.on('message', (data: string) => {
    console.log('received: %s', data)
    var message: ChatMessage = JSON.parse(data)
    Chat.push( message )
    wss.clients.forEach((client: any /*Need type!*/) => {
        client.send(message)
    })
})
Chatserver.listen(ChatPort)