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
const wss = new ws.WebSocketServer({server: Chatserver, handleProtocols: handleChatProtocols})
var Chat: ChatMessage[]
var Chatters: any[] = []
function handleChatProtocols(protocols: any, request: any) {
    
}
wss.on('connection', (ws: any) => {
    Chatters.push(ws)
	ws.on('message', (data: string) => {
    	console.log('received: %s', data)
		var message: ChatMessage = JSON.parse(data)
		Chat.push( message )
		Chatters.forEach((client: any /*Need type!*/) => {
			client.send(message)
		})
	})
    ws.on('close', function() {
        Chatters = Chatters.filter(s => s !== ws);
      })
});
Chatserver.listen(ChatPort)