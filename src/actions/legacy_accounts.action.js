import {ADD_ACCOUNT, REMOVE_ACCOUNT, ADD_ACCOUNTS} from './action.types';

let addLegacyAccount = function(account){
    return {
        type:ADD_ACCOUNT,
        item: account
    }
}
let removeLegacyAccount = function(account){
    return {
        type:REMOVE_ACCOUNT,
        item: account
    }
}
let addLegacyAccounts = function(accounts) {
    return {
        type:ADD_ACCOUNTS,
        item:accounts
    }
}
export {
    addLegacyAccount,
    removeLegacyAccount,
    addLegacyAccounts
}