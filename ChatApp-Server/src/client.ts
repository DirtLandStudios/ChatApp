import { NextFunction, Request, Response } from "express"
const express = require('express')
const fs = require("fs")
var https = require('https')
const ws = require('ws')

import {KeyFile, CertFile} from "./Files"
var privateKey  = fs.readFileSync(KeyFile)
var certificate = fs.readFileSync(CertFile)
var credentials = {key: privateKey, cert: certificate}
const app = express()
const port = 8000 

app.all('/ChatApp', (req: Request, res: Response, next: NextFunction) => {
	res.send("Connected")
	//res.render("/ChatApp/Client/page.html")
	next() // pass control to the next handler
})


var httpsServer = https.createServer(credentials, app)
httpsServer.listen(port, "0.0.0.0", function() {
	console.log("serve started on" + port)
})