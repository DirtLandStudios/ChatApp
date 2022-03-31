//const express = require('express')
const { exec } = require("child_process")
const ws = require('ws')
const https = require('https')
const fs = require('fs')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

import {SaveFile, ChatPort} from "../Variables"

type ChatMessage = {message: string, user: string}
const {publicKey, privateKey} = require("certification").GetKeys()
var ChatServerOptions = {cert: publicKey, key: privateKey}

var Chatserver = https.createServer(ChatServerOptions)

const wss = new ws.WebSocketServer({clientTracking: true, noServer: true, path: "/WSChat"})
var Chat: ChatMessage[] = [{message: "start", user: "server"}] //doesn't work without init for some f*cking reason

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

Chatserver.listen(ChatPort, () => {
    console.log("Server listening on " + ChatPort)
})
readline.on('line', (input: string) => {
    switch (input) {
        case "help":
            console.log("start, save, stop, cmd")
            break
        case "start":
            if (!Chatserver.listening) {
                Chatserver.listen(ChatPort, () => {
                    console.log("Server listening on " + ChatPort)
                })
            }
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
                        return
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
