
module.exports.walletExistsReducer = function (state = false, action){ 
    switch(action.type){
      case 'WALLET_EXISTS':
        return action.item;
      default:
        return state ;     
    }
}