//const express = require('express')
const { exec } = require("child_process")
const ws = require('ws')
const https = require('https')
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const KeyFile: string = process.env.KEY ?? "/config/ssl/wss.key"
const CertFile: string = process.env.CERT ?? "/config/ssl/wss.crt"
const SaveFile: string = process.env.SAVE_FILE ?? "/config/SaveChat.json"
type ChatMessage = {message: string, user: string}
const ChatPort = 8000

var Chatserver = https.createServer({
    cert: fs.readFileSync(CertFile),
    key: fs.readFileSync(KeyFile)
})

const wss = new ws.WebSocketServer({clientTracking: true, server: Chatserver})
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


readline.on('line', (input: string) => {
    switch (input) {
        case "help":
            console.log("start, save, stop, cmd")
            break
        case "start":
            Chatserver.listen(ChatPort, () => {
                console.log("Server listening on " + ChatPort)
            })
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