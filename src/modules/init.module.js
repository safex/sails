const fs = window.require('fs');
let {DEFAULT_WALLET_PATH} = require( '../setups/conf');
let walletExistActions=require('../actions/wallet_exists.action.js');



module.exports.checkIfFileExists= function (that){
    fs.readFile(DEFAULT_WALLET_PATH, (err, fd) => {
        if (err) {
            that.props.dispatch(walletExistActions.setWalletExistsStatus(false));
        }
        
        that.props.dispatch(walletExistActions.setWalletExistsStatus(true));
    });
      
}
module.exports.setWalletExistsToFalse= function (that){
    that.props.dispatch(walletExistActions.setWalletExistsStatus(false));
}


module.exports.setWalletExistsToTrue= function (that){
    that.props.dispatch(walletExistActions.setWalletExistsStatus(true));
}

module.exports.login= function(that, value){
    if(value!=''){
        //call golang
    }
    else{
        //error
    }
}
module.exports.createNew= function(that, filepath,pwd){

}

module.exports.open= function(that, filepath, pwd){
    console.log(filepath,pwd);
}
module.exports.restoreFromKeys= function(){}

module.exports.restoreFromSeeds= function(){}