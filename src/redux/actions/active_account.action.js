import {ADD_ACTIVE_ACCOUNT} from './action.types';


let addActiveAccount = function(account){
    return {
        type:ADD_ACTIVE_ACCOUNT,
        item: account
    }
}

export {
    addActiveAccount
}