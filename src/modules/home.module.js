import { accountsApi, activeAccountApi } from '../api/go';
import { legacyAccountsApi } from '../api/legacy';
import { addAccounts } from '../actions/accounts.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addError } from '../actions/error.action';
import { processResponse, jsonResponse, errorResponse } from '../libs/response';


let setActiveAccount = function (dispatch, account) {
    activeAccountApi.setActiveAccountApi(account)
        .then(processResponse)
        .then((res) => {
            dispatch(setActiveAccount(account))
        })
        .catch(errorResponse);
}
let getActiveAccount = function (dispatch) {
    activeAccountApi.getActiveAccountApi()
        .then(processResponse)
        .then(jsonResponse)
        .then((data) => {
            if (data.status === 0) { dispatch(addActiveAccount(JSON.parse(data.result.value))) }
            else if (data.status !== 13) {
                dispatch(addError(data.status));
            }


        })
        .then(errorResponse);
}
let getAccounts = function (dispatch) {
    // accountsApi.getAccountsApi()
    //     .then(processResponse)
    //     .then(jsonResponse)
    //     .then((data) => {
    //         if (data.status === 0) { dispatch(addAccounts(data.result)); }
    //         else if (data.status !== 13) {
    //             dispatch(addError(data.status));
    //         }
    //     })
    //     .catch(errorResponse);
}

let getLegacyAccounts = function (dispatch) {
    // legacyAccountsApi.getAccountsApi()
    //     .then(processResponse)
    //     .then(jsonResponse)
    //     .then((data) => {
    //         if (data.status === 0) { dispatch(addAccounts(JSON.parse(data.result.vallue))); }
    //         else if (data.status !== 13) {
    //             dispatch(addError(data.status));
    //         }

    //     })
    //     .catch(errorResponse);
}

let exportKeys = function () {
}
export {
    setActiveAccount,
    getActiveAccount,
    getAccounts,
    getLegacyAccounts,
    exportKeys
}


