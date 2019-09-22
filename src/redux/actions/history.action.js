import {
    ADD_ACCOUNT_HISTORY,
    RESET_ACCOUNT_HISTORY
} from './action.types';

let addAccountHistory = function (txs) {
    return {
        type: ADD_ACCOUNT_HISTORY,
        item: txs
    }
}
let resetAccountHistory = function () {
    return {
        type: RESET_ACCOUNT_HISTORY
    }
}

export {
    addAccountHistory,
    resetAccountHistory
}