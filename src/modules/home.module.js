import { accountsApi, activeAccountApi, transactionApi, legacyAccountsApi, accountLabelsApi } from '../api/go';
//import { legacyTransactionApi } from '../api/legacy';
import { addAccounts, removeAccounts } from '../actions/accounts.action';
import { replaceLegacyAccounts } from '../actions/legacy_accounts.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addAccountHistory, resetAccountHistory } from '../actions/history.action';
import { addError } from '../actions/error.action';
import { addHomeModal } from '../actions/home_modals.action';
import { addAccountLabels } from '../actions/account_labels.action';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';

import crypto from 'crypto';

let { dialog } = window.require("electron").remote;
//const bitcoin = window.require('bitcoinjs-lib');

let getAccounts = function (dispatch, fromwallet = false, rescan = false) {
    dispatch(removeAccounts());
    if (localStorage.getItem("accounts") && !fromwallet) {
        //  dispatch(addAccounts(JSON.parse(localStorage.getItem("accounts"))));
        getLabels(dispatch, JSON.parse(localStorage.getItem("accounts")));
    }
    else {
        lordOfTheFetch(accountsApi.getAccountsInfoApi, [], callbackForGetAccounts, [dispatch, rescan], { dispatch: dispatch });
    }

}

let getLegacyAccounts = function (dispatch) {
    if (!localStorage.getItem("legacy_accounts")) {
        lordOfTheFetch(legacyAccountsApi.getLegacyAccountsApi, [], callbackForGetLegacyAccounts, [dispatch], { dispatch: dispatch });
    }

}

let setActiveAccount = function () {
    if (this.props.account) {
        lordOfTheFetch(activeAccountApi.setActiveAccountApi, [this.props.account], callbackForSetActiveAccount, [this.props.dispatch, this.props.account], { dispatch: this.props.dispatch });
    }
}

let openAccount = function (dispatch, name = "primary", account_to_be_dispatched) {
    lordOfTheFetch(accountsApi.openAccountsApi, [name], callbackForOpenAccount, [dispatch, account_to_be_dispatched], { dispatch: dispatch, msg: "from home" });
}


let syncAccount = function (dispatch, account, account_to_be_dispatched) {
    lordOfTheFetch(accountsApi.syncAccountsApi, [], callbackForSyncAccount, [dispatch, account_to_be_dispatched], { dispatch: dispatch });
}

let rescanWallet = function (dispatch) {
    lordOfTheFetch(accountsApi.rescanAccountsApi, [], callbackForRescanWallet, [dispatch], { dispatch: dispatch });
}



// let getActiveAccount = function (dispatch) {
//     lordOfTheFetch(activeAccountApi.getActiveAccountApi, [], callbackForGetActiveAccount, [dispatch], { dispatch: dispatch });
// }

let getHistory = function (dispatch) {
    getHistoryNew(dispatch);
}

let getHistoryNew = function (dispatch) {
    lordOfTheFetch(transactionApi.getTransactionHistory, [], callbackForGetHistoryNew, [dispatch], { dispatch: dispatch });
}

// let getHistoryOld = function (dispatch, active_account) {
//     lordOfTheFetch(legacyTransactionApi.getHistoryApi, [active_account.account.address], callbackForGetHistoryOld, [dispatch], { dispatch: dispatch });
// }

let addNewAccount = function (dispatch, label, labels) {
    let name = crypto.randomBytes(10).toString('hex') + "N" + crypto.randomBytes(10).toString('hex');
    lordOfTheFetch(accountsApi.createAccountApi, [name], callbackForAddNewAccount, [dispatch, name, label, labels, false], { dispatch: dispatch });
}

let addSeedsAccount = function (dispatch, seeds, label, labels) {
    let name = crypto.randomBytes(10).toString('hex') + "S" + crypto.randomBytes(10).toString('hex');
    lordOfTheFetch(accountsApi.recoverAccountSeedsApi, [seeds.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels, true], { dispatch: dispatch });


}

let addKeysAccount = function (dispatch, address, view, spend, label, labels) {
    let name = crypto.randomBytes(10).toString('hex') + "K" + crypto.randomBytes(10).toString('hex');
    lordOfTheFetch(accountsApi.recoverAccountKeysApi, [address.trim(), spend.trim(), view.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels, true], { dispatch: dispatch });
}


let addFileAccount = function (dispatch, filepath, password, label, labels) {
    let name = crypto.randomBytes(10).toString('hex') + "F" + crypto.randomBytes(10).toString('hex');
    lordOfTheFetch(accountsApi.recoverAccountFileApi, [filepath.trim(), password.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels, true], { dispatch: dispatch });
}

let saveLabels = function (dispatch, labels, rescan = false) {
    lordOfTheFetch(accountLabelsApi.setAccountLabelsApi, [labels], callbackForSaveLabels, [dispatch, labels, rescan], { dispatch: dispatch });
}

let getLabels = function (dispatch, accounts, rescan = false) {
    lordOfTheFetch(accountLabelsApi.getAccountLabelsApi, [], callbackForGetLabels, [dispatch, accounts, rescan], { dispatch: dispatch });
}




//callbacks

// getAccounts
let callbackForGetAccounts = function (res, dispatch, rescan = false) {
    if (res.status === 0) {
        let accounts = {};
        Promise.all(res.result.accounts.map(x => {
            return new Promise(resolve => {
                if (x.account_name !== "") {
                    accounts[x.account_name] = x;
                    accounts[x.account_name].label = x.account_name;
                }
                resolve();

            });
        })).then(() => {
            getLabels(dispatch, accounts, rescan);
        });
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}

// // getLegacyAccounts
let callbackForGetLegacyAccounts = function (res, dispatch) {
    if (res.status === 0) {
        if (res.result.value !== "") { localStorage.setItem('legacy_accounts', res.result.value); }
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}


// setActiveAccount
let callbackForSetActiveAccount = function (res, dispatch, account) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        localStorage.setItem("active_account", JSON.stringify(account));
        dispatch(resetAccountHistory());
        openAccount(dispatch, account.account_name, account);
    }
}

// openAccount

let callbackForOpenAccount = function (res, dispatch, account_to_be_dispatched) {
    if (res.status !== 0) dispatch(addError(res.status));
    else syncAccount(dispatch, res.result.info, account_to_be_dispatched);
}

// syncAccount
let callbackForSyncAccount = function (res, dispatch, account_to_be_dispatched) {
    if (res.status !== 0) dispatch(addError(res.status));
    else { dispatch(addActiveAccount(account_to_be_dispatched)); getHistory(dispatch); }
}

// get history new
let callbackForGetHistoryNew = function (res, dispatch) {
    if (res.status !== 0) dispatch(addError(res.status));
    else { dispatch(addAccountHistory(res.result)); }
}

// let callbackForGetHistoryOld = function (res, dispatch) {

//     dispatch(addAccountHistory(res));
// }

let callbackForAddNewAccount = function (res, dispatch, name, label, labels, rescan) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        let tmp = { ...labels }; tmp[name] = label;
        saveLabels(dispatch, tmp, rescan);
    }


}

let callbackForSaveLabels = function (res, dispatch, labels, rescan = false) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        dispatch(addAccountLabels(labels));
        getAccounts(dispatch, true, rescan);
    }
}

let callbackForGetLabels = function (res, dispatch, accounts, rescan) {
    if (res.status === 0) {
        let acc = accounts;
        let labels = JSON.parse(res.result.value);
        for (let l in labels) {
            if (acc.hasOwnProperty(l)) {
                acc[l].label = labels[l];
            }
        }
        localStorage.setItem('accounts', JSON.stringify(acc));
        dispatch(addAccounts(acc));
        if (rescan) {
            rescanWallet(dispatch);
        }


    }
    else if (res.status === 13) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
        dispatch(addAccounts(accounts));
        if (rescan) {
            rescanWallet(dispatch);
        }

    }
    else {
        dispatch(addError(res.status));
    }
}
let callbackForRescanWallet = function (res, dispatch) {
    if (res.status !== 0) dispatch(addError(res.status));
}

// let callbackForGetActiveAccountUltimateFetch = function (res, dispatch) {
//     if (res.status === 0) { dispatch(addActiveAccount(JSON.parse(res.result.value))); getHistory(JSON.parse(res.result.value), dispatch); }
//     else if (res.status !== 13) {
//         dispatch(addError(res.status));
//     }
// }


let changeModalState = function (dispatch, modal) {
    dispatch(addHomeModal(modal));
}

let openFile = function (id, title) {
    dialog.showOpenDialog({
        title: title,
        filters: [{
            name: 'Keys',
            extensions: ['keys']
        }]
    }, (files) => {

        if (files !== undefined && files.length > 0) {
            document.getElementById(id).value = files

        }
        if (files === undefined) {
            document.getElementById(id).value = "";
        }
    });
}
export {
    setActiveAccount,
    // getActiveAccount,
    getAccounts,
    getLegacyAccounts,
    getHistory,
    addNewAccount,
    changeModalState,
    addSeedsAccount,
    addKeysAccount,
    addFileAccount,
    openFile
}
