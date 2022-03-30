const fs = require('fs')
const { exec } = require("child_process")
import {KeyFile, CertFile} from "./Files"

if (!fs.existsSync(KeyFile) || !fs.existsSync(CertFile)) {
	console.log("Cretaing keys...")
	exec("mkdir /config/ssl")
	//create empty files
	exec(`touch ${KeyFile}`)
	exec(`touch ${CertFile}`)
	console.log("creating key..")
	var command: string = `openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out ${CertFile} -keyout ${KeyFile} -subj "/C=SI/ST=Ljubljana/L=Ljubljana/O=Security/OU=IT Department/CN=www.example.com"`
	console.log(command)
	exec(command)
}



console.log("Cretaing keys...")
exec("mkdir /config/ssl")
//create empty files
exec(`touch ${KeyFile}`)
exec(`touch ${CertFile}`)
console.log("creating key..")
var command: string = `openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out ${CertFile} -keyout ${KeyFile} -subj "/C=SI/ST=Ljubljana/L=Ljubljana/O=Security/OU=IT Department/CN=www.example.com"`
console.log(command)
exec(command)