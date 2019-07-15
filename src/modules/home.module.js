import {accountsApi, activeAccountApi} from '../api/go';
import {legacyAccountsApi} from '../api/legacy';
import {addAccounts} from '../actions/accounts.action';
import {addActiveAccount} from '../actions/active_account.action';
import {processResponse, jsonResponse, errorResponse} from '../libs/response';


let setActiveAccount = function(dispatch, account){
    activeAccountApi.setActiveAccountApi(account)
    .then(processResponse)
    .then((res)=>{
        dispatch(setActiveAccount(account))
    })
    .catch(errorResponse);
}
let getActiveAccount = function(dispatch){
    activeAccountApi.getActiveAccountApi()
    .then(processResponse)
    .then(jsonResponse)
    .then((data)=>{
        dispatch(addActiveAccount(JSON.parse(data.result)))
    })
    .then(errorResponse);
}
let getAccounts = function(dispatch) {
    accountsApi.getAccountsApi()
    .then(processResponse)
    .then(jsonResponse)
    .then((data)=>{
        dispatch(addAccounts(data.result));
    })
    .catch(errorResponse);
}

let getLegacyAccounts = function(dispatch) {
    legacyAccountsApi.getAccountsApi()
    .then(processResponse)
    .then(jsonResponse)
    .then((data)=>{
        dispatch(addAccounts(data.result));
    })
    .catch(errorResponse);
}
export {
    setActiveAccount,
    getActiveAccount,
    getAccounts,
    getLegacyAccounts
}


