//const express = require('express')
const ws = require('ws')
const https = require('https')
const fs= require('fs');
//TODO: ssl
var server = https.createServer({
    cert: fs.readFileSync('../ssl/wss/certificate.crt'),
    key: fs.readFileSync('../ssl/wss/private.pem'),
    ca: fs.readFileSync('../ssl/wss/ca_bundle.crt')
});
type ChatMessage = {message: string, user: string}
const ChatPort = 8999;
const wss = new ws.Server({server});
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
//TODO:FUCK ALL
server.listen(ChatPort, function listening () {
    const ws = new WebSocket('wss://dt.example.com:58443', {
        rejectUnauthorized: false
    });
    ws.on('open', function open () {
        ws.send('Workin baby');
    });
});
//https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server