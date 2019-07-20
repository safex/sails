const {decrypt} = require('./crypto_utils');
const {LEGACY_DECRYPT_ALGORITHM} = require('../setups/conf');
const fs = window.require('fs');



// let dispatchContent =  function (dispatch, pwd, err,fd){
//     if (err) {
//         dispatch(addError(err));
//     }
//     else{
//         let wallet=fd.toString().split(' ');
//         const decryptedWallet = decrypt(wallet[0], LEGACY_DECRYPT_ALGORITHM, pwd);
//         let parsedWallet;
//         try {
//             parsedWallet = JSON.parse(decryptedWallet);
//             if (!parsedWallet || parsedWallet['version'] !== '2') {
//                 dispatch(addError("INVALID_FILE_FORMAT"));
//             }
//             else{
//                 dispatch(addLegacyWallet(parsedWallet));
        
//             }
//         }
//         catch (e) {
//             dispatch(addError("INVALID_JSON"));
//         }
//     }
        
// }


let readFilePromise = function(filepath){
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
          if (err) {
            reject(err);
          }
            resolve(data);
        });
      });
}

let checkFileForFlags = function(data){
    return data.toString().split(' ').length <=1;
 }

let decryptContent = function(data,pwd){
    let wallet = data.toString().split(' ');
    const decryptedWallet = decrypt(wallet[0], LEGACY_DECRYPT_ALGORITHM, pwd);
    let parsedWallet=null;
    try {
        parsedWallet = JSON.parse(decryptedWallet);
        if (!parsedWallet || parsedWallet['version'] !== '1') {
            return Promise.reject("INVALID_FILE_FORMAT");
        }
        else{
           return Promise.resolve(parsedWallet);
        
        }
    }
    catch (e) {
            return Promise.reject(e);
    }

}

export {
    checkFileForFlags,
    readFilePromise,
    decryptContent
}
