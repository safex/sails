const WALLET_EXISTS = "WALLET_EXISTS";
module.exports.setWalletExistsStatus = function(existance){
    return {
        type:WALLET_EXISTS,
        item: existance
    }
}