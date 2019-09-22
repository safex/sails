import {ADD_LEGACY_WALLET, REMOVE_LEGACY_WALLET} from './action.types';

let addLegacyWallet = function(wallet){
    return {
        type:ADD_LEGACY_WALLET,
        item: wallet
    };
}
let removeLegacyWallet= function(){
    return {
        type:REMOVE_LEGACY_WALLET
    }
}

export {
    addLegacyWallet,
    removeLegacyWallet
}