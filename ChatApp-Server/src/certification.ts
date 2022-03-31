const fs = require("fs")
const { exec } = require("child_process")
import {KeyFile, CertFile, Create_SSL} from "./Variables"


function GetKeys() {
	var publicKey,
		privateKey
	if (!fs.existsSync(KeyFile) || !fs.existsSync(CertFile)) {
		if (Create_SSL != "false") {
			console.log("Cretaing keys...")
			if (!fs.existsSync(fs.realPathSync(KeyFile)))  fs.mkdirSync("/config/ssl", { recursive: true })
			//create empty files
			exec(`touch ${KeyFile}`)
			exec(`touch ${CertFile}`)
			console.log("creating key..")
			var command: string = `openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out ${CertFile} -keyout ${KeyFile} -subj "/C=SI/ST=Ljubljana/L=Ljubljana/O=Security/OU=IT Department/CN=www.example.com"`
			exec(command)
		}
		else {
			require('crypto').generateKeyPairSync('rsa', {
				modulusLength: 4096,
				publicKeyEncoding: {
				  type: 'spki',
				  format: 'pem'
				},
				privateKeyEncoding: {
				  type: 'pkcs8',
				  format: 'pem',
				  cipher: 'aes-256-cbc',
				  passphrase: 'top secret ChatApp'
				}},
				(Keypublic: string, Keyprivate: string) => {
					privateKey = Keyprivate
					publicKey = Keypublic
				}
			)
		}
	}
	privateKey ??= fs.readFileSync(KeyFile)
	publicKey ??= fs.readFileSync(CertFile)
	return {publicKey, privateKey}
}

module.exports = {GetKeys}