const express = require('express')
import { NextFunction, Request, Response } from "express"
const fs = require("fs")
var https = require('https')
const ws = require('ws')


import {SaveFile, ChatPort, WsPort} from "./Variables"
const {publicKey, privateKey} = require("./certification").GetKeys()
var credentials = {key: privateKey, cert: publicKey}
const app = express()

type ChatMessage = {message: string, user: string}
var Chat: ChatMessage[] = [{message: "start", user: "server"}] //doesn't work without init for some f*cking reason
var Ws_Server = https.createServer(credentials)
var wss = new ws.WebSocketServer({clientTracking: true, server: Ws_Server})
wss.on('connection', (_ws: any) => {
    //console.log("connected: " + ws)
    _ws.on('message', (data: string) => {
        console.log('received: ' + data)
        var message: ChatMessage = JSON.parse(data)
        Chat.push(message)
        wss.clients.forEach((client: any) => {
            client.send(data)
        })
    })    
})
Ws_Server.listen(WsPort, "0.0.0.0")
//upgrade to websocket
/* app.on("upgrade", (request: Request, socket: WebSocket, head: Headers) => {
	console.log("upgrading to WS")
	wss.handleUpgrade(request, socket, head, () => {
		wss.emit("connection", socket, request)
	})
}) */

app.use(express.static("/Chatapp/Client/"))

/* app.all('/ChatApp', (req: Request, res: Response, next: NextFunction) => {
	//res.send("Connected")
	express.static("/ChatApp/Client/html/client.html")
	next() // pass control to the next handler
}) */
app.all('/ChatAdmin', (req: Request, res: Response, next: NextFunction) => {
	res.send("Connected Admin")
	//res.render("/ChatApp/Client/admin.html")
	next() // pass control to the next handler
})
app.all("/", (req: Request, res: Response, next: NextFunction) => {
	res.redirect("/ChatApp/client.html")
	next()
})

var httpsServer = https.createServer(credentials, app)
httpsServer.listen(ChatPort, "0.0.0.0", function() {
	console.log("server started on " + ChatPort)
})