const express = require('express')
const ws = require('ws')
const https = require('https')

type ChatMessage = {message: string, user: string}
// Set up a headless websocket server that prints any
// events that come in.
var ChatPort = 8999;
const wss = new ws.WebSocketServer({ port: ChatPort })
var Users: string[]
var Chat: ChatMessage[]

wss.on('connection', function connection(ws, request, client) {

	ws.on('message', function message(data: string) {
    	console.log('received: %s', data)
		
		Chat.push( {data, client} )
		wss.clients.ForEach(function each(client) {
			client.send()
		})
	});
  
});

https.listen(ChatPort)
//https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server