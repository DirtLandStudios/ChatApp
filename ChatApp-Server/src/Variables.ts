const KeyFile: string = process.env.KEY ?? "/config/ssl/wss.key"
const CertFile: string = process.env.CERT ?? "/config/ssl/wss.crt"
const SaveFile: string = process.env.SAVE_FILE ?? "/config/SaveChat.json"
const Create_SSL: string = process.env.CREATE_SSL ?? "true"
export {KeyFile, CertFile, SaveFile, Create_SSL}