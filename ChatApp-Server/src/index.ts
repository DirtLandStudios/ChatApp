import express = require('express')
const ws = require('ws')
const https = require('https')

type ChatMessage = {message: string, user: string}
// Set up a headless websocket server that prints any
// events that come in.
var ChatPort = 8999;
const wss = new ws.WebSocketServer({ port: ChatPort })
var Users: string[]

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data: ChatMessage) {
    console.log('received: %s', data)
	Users.forEach(user => {
		ws.send(data)
	});
  });

  
});

https.listen(ChatPort)
//https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server