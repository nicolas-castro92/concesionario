/* metodo de cifrado de informacion */

/* packages */
const CryptoJS = require("crypto-js");
const config = require("config");

/* encrypt pass */
exports.encryptPassword = (password) => {
    let secretKey = config.get("secretKeys").cryptojs;
    var encryptedPassword = CryptoJS.AES.encrypt(password,secretKey).toString();
    return encryptedPassword;

};