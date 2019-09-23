import {ADD_ACCOUNT, REMOVE_ACCOUNT, ADD_ACCOUNTS} from './action.types';

let addAccount = function(account){
    return {
        type:ADD_ACCOUNT,
        item: account
    }
}
let removeAccount = function(account){
    return {
        type:REMOVE_ACCOUNT,
        item: account
    }
}
let addAccounts = function(accounts) {
    return {
        type:ADD_ACCOUNTS,
        item:accounts
    }
}
export {
    addAccount,
    removeAccount,
    addAccounts
}