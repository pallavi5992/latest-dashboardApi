require("dotenv").config()
var CryptoJS = require("crypto-js");

async function idIntoBase64(id){
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(id),process.env.ID_SECRETE_KEY ).toString()
    const encoded = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);
    return encoded
}
async function Base64toId(id){
    const decoded = CryptoJS.enc.Hex.parse(id).toString(CryptoJS.enc.Base64);
    const actualId = CryptoJS.AES.decrypt(decoded, process.env.ID_SECRETE_KEY).toString(CryptoJS.enc.Utf8);
    return actualId
};  


module.exports={
    idIntoBase64,
    Base64toId
}