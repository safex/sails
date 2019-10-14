import crypto from 'crypto';

let  hexToBytes = (hex) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
let  bytesToHex =(bytes) => {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}
let toHexString = (byteArray) => {
    return Array.from(byteArray,  (byte) =>{return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');
}

let encrypt = function (text, algorithm, password) {
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

let decrypt = function (text, algorithm, password) {
    const decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
export {
   hexToBytes,
   bytesToHex,
   toHexString,
   encrypt,
   decrypt
   
}