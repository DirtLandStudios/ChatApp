//const express = require('express')
const ws = require('ws')
const https = require('https')

type ChatMessage = {message: string, user: string}
// Set up a headless websocket server that prints any
// events that come in.
const ChatPort = 8999;
const wss = new ws.WebSocketServer({ port: ChatPort })
var Users: string[]
var Chat: ChatMessage[]

wss.on('connection', (ws: any /*Need type!*/) => {

	ws.on('message', (data: string) => {
    	console.log('received: %s', data)
		var message: ChatMessage = JSON.parse(data)
		Chat.push( message )
		wss.clients.ForEach((client: any /*Need type!*/) => {
			client.send(message)
		})
	});
  
});

https.listen(ChatPort)
//https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server