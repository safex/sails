const ADD_ACCOUNT="ADD_ACCOUNT";
const REMOVE_ACCOUNT="REMOVE_ACCOUNT";
module.exports.addAccount = function(account){
    return {
        type:ADD_ACCOUNT,
        item: account
    }
}
module.exports.removeAccount = function(account){
    return {
        type:REMOVE_ACCOUNT,
        item: account
    }
}