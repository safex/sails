let { changeLanguage } = require('../actions/language.action');
let { addActiveAccount } = require('../actions/active_account.action');
let { getActiveAccountApi } = require('../api/go/active_account.api');
let { getAccountsApi, openAccountsApi } = require('../api/go/accounts.api');
let { processResponse, jsonResponse, errorResponse } = require('../libs/response');
let { addError } = require('../actions/error.action');

let changeLanguageF = function (that, value) {
    that.props.dispatch(changeLanguage(value));
    that.props.i18n.changeLanguage(value);
}

let logout = function (dispatch, history) {
}

let getActiveAccountFromWallet = function (dispatch) {
    getActiveAccountApi()
        .then(processResponse)
        .then(jsonResponse)
        .then((data) => {
            if (data.status === 0) { openAccounts(dispatch, JSON.parse(data.result.value)); }
            else if (data.status === 13) { getActiveAccountFromAccounts(dispatch); }
            else { dispatch(addError(data.status)) }
        })
        .catch(errorResponse);
}

let openAccounts = function (dispatch, account) {
    openAccountsApi(account.account.account_name)
        .then(processResponse)
        .then(jsonResponse)
        .then((open) => {
            if (open.status !== 0) throw new Error(open.status);
            else dispatch(addActiveAccount(account));
        })
        .catch(errorResponse);
}
let getActiveAccountFromAccounts = function (dispatch) {
    getAccountsApi()
        .then(processResponse)
        .then(jsonResponse)
        .then((data) => {
            if (data.status !== 0) throw new Error(data.status);
            else {
                //if exists dispatch first
                //else try and find legacy accounts
            }
        })
        .catch(errorResponse);
}
export {
    changeLanguageF,
    logout,
    getActiveAccountFromWallet,
    getActiveAccountFromAccounts
}
