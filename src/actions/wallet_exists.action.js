import {WALLET_EXISTS} from './action.types';

let addWalletExistsStatus = function(existance){
    return {
        type:WALLET_EXISTS,
        item: existance
    }
}

export {
    addWalletExistsStatus
}