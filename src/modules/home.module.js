import { accountsApi, activeAccountApi, transactionApi, legacyAccountsApi, accountLabelsApi } from '../api/go';
import { legacyTransactionApi } from '../api/legacy';
import { addAccounts } from '../actions/accounts.action';
import { replaceLegacyAccounts } from '../actions/legacy_accounts.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addAccountHistory, resetAccountHistory } from '../actions/history.action';
import { addError } from '../actions/error.action';
import { addHomeModal } from '../actions/home_modals.action';
import { addAccountLabels } from '../actions/account_labels.action';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';

let { dialog } = window.require("electron").remote;
const bitcoin = window.require('bitcoinjs-lib');

let getAccounts = function (dispatch) {
    lordOfTheFetch(accountsApi.getAccountsInfoApi, [], callbackForGetAccounts, [dispatch], { dispatch: dispatch });
}

let getLegacyAccounts = function (dispatch) {
    lordOfTheFetch(legacyAccountsApi.getLegacyAccountsApi, [], callbackForGetLegacyAccounts, [dispatch], { dispatch: dispatch });
}
let setActiveAccount = function () {
    if (this.props.account) {
        let dispatchAfter = (this.props.type !== 1 ? false : true);
        lordOfTheFetch(activeAccountApi.setActiveAccountApi, [{ account: this.props.account, type: this.props.type }], callbackForSetActiveAccount, [this.props.dispatch, { account: this.props.account, type: this.props.type }, dispatchAfter], { dispatch: this.propsdispatch });
    }
}

let openAccount = function (dispatch, name = "primary", account_to_be_dispatched) {
    lordOfTheFetch(accountsApi.openAccountsApi, [name], callbackForOpenAccount, [dispatch, account_to_be_dispatched], { dispatch: dispatch, msg: "from home" });
}


let syncAccount = function (dispatch, account, account_to_be_dispatched) {
    lordOfTheFetch(accountsApi.syncAccountsApi, [], callbackForSyncAccount, [dispatch, account, account_to_be_dispatched], { dispatch: dispatch });
}



// let getActiveAccount = function (dispatch) {
//     lordOfTheFetch(activeAccountApi.getActiveAccountApi, [], callbackForGetActiveAccount, [dispatch], { dispatch: dispatch });
// }

let getHistory = function (dispatch, active_account) {
    if (active_account.type === 1) { getHistoryOld(dispatch, active_account); }
    else { getHistoryNew(dispatch); }
}

let getHistoryNew = function (dispatch) {
    lordOfTheFetch(transactionApi.getTransactionHistory, [], callbackForGetHistoryNew, [dispatch], { dispatch: dispatch });
}

let getHistoryOld = function (dispatch, active_account) {
    lordOfTheFetch(legacyTransactionApi.getHistoryApi, [active_account.account.address], callbackForGetHistoryOld, [dispatch], { dispatch: dispatch });
}

let addNewAccount = function (dispatch, label, accounts, labels) {
    if (accounts) {
        let name = "wallet_";
        name += Object.keys(accounts).length;
        lordOfTheFetch(accountsApi.createAccountApi, [name], callbackForAddNewAccount, [dispatch, name, label, labels], { dispatch: dispatch });
    }

}

let addSeedsAccount = function (dispatch, seeds, label, accounts, labels) {
    let name = "wallet_";
    name += Object.keys(accounts).length;
    lordOfTheFetch(accountsApi.recoverAccountSeedsApi, [seeds.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels], { dispatch: dispatch });


}

let addKeysAccount = function (dispatch, address, view, spend, type, label, accounts, legacy_accounts, labels) {

    if (type === "0") {
        let name = "wallet_";
        name += Object.keys(accounts).length;
        lordOfTheFetch(accountsApi.recoverAccountKeysApi, [address.trim(), spend.trim(), view.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels], { dispatch: dispatch });
    }
    else {
        try {
            let name = "wallet_legacy_";
            name += Object.keys(legacy_accounts).length;
            let legacies = legacy_accounts;
            var key_pair = bitcoin.ECPair.fromWIF(view.trim());
            const { address } = bitcoin.payments.p2pkh({ pubkey: key_pair.publicKey });

            var key_json = {};
            key_json['public_key'] = address;
            key_json['private_key'] = view.trim();
            key_json['safex_bal'] = 0;
            key_json['btc_bal'] = 0;
            key_json['pending_safex_bal'] = 0;
            key_json['pending_btc_bal'] = 0;
            key_json['archived'] = false;
            key_json['label'] = label || "Enter your label here";
            legacies[name] = { account: key_json, type: 1 };
            legacies[name].account["address"] = address;
            legacies[name].account["account_name"] = name;
            lordOfTheFetch(legacyAccountsApi.setLegacyAccountsApi,
                [legacies],
                callbackForAddLegacyAccounts,
                [dispatch],
                { "dispatch": dispatch });

        } catch (error) {
            dispatch(addError(error.message));
        }

    }

}


let addFileAccount = function (dispatch, filepath, password, label, accounts, labels) {
    let name = "wallet_";
    name += Object.keys(accounts).length;
    lordOfTheFetch(accountsApi.recoverAccountFileApi, [filepath.trim(), password.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels], { dispatch: dispatch });
}

let saveLabels = function (dispatch, labels) {
    lordOfTheFetch(accountLabelsApi.setAccountLabelsApi, [labels], callbackForSaveLabels, [dispatch, labels], { dispatch: dispatch });

}

let getLabels = function (dispatch, accounts) {
    lordOfTheFetch(accountLabelsApi.getAccountLabelsApi, [], callbackForGetLabels, [dispatch, accounts], { dispatch: dispatch });
}




//callbacks

// getAccounts
let callbackForGetAccounts = function (res, dispatch) {
    if (res.status === 0) {
        let accounts = {};
        res.result.accounts.forEach((x, i) => {

            if (x.account_name !== "") {
                accounts[x.account_name] = { account: x, type: 0 };
                accounts[x.account_name].account.label = x.account_name;
            }
            if (i === (res.result.accounts.length - 1)) {
                getLabels(dispatch, accounts);
            }
        })
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}

// getLegacyAccounts
let callbackForGetLegacyAccounts = function (res, dispatch) {
    if (res.status === 0) {
        if (res.result.value !== "") dispatch(replaceLegacyAccounts(JSON.parse(res.result.value)));
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}


// setActiveAccount
let callbackForSetActiveAccount = function (res, dispatch, account, dispatchAfter) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        dispatch(resetAccountHistory());
        if (dispatchAfter) {
            dispatch(addActiveAccount(account));
            getHistory(dispatch, account);
        }
        else {
            openAccount(dispatch, account.account.account_name, account);
        }
    }
}

// openAccount

let callbackForOpenAccount = function (res, dispatch, account_to_be_dispatched) {
    if (res.status !== 0) dispatch(addError(res.status));
    else syncAccount(dispatch, res.result.info, account_to_be_dispatched);
}

// syncAccount
let callbackForSyncAccount = function (res, dispatch, account, account_to_be_dispatched) {
    if (res.status !== 0) dispatch(addError(res.status));
    else { dispatch(addActiveAccount(account_to_be_dispatched)); getHistory(dispatch, account_to_be_dispatched); }
}

// get history new
let callbackForGetHistoryNew = function (res, dispatch) {
    if (res.status !== 0) dispatch(addError(res.status));
    else { dispatch(addAccountHistory(res.result)); }
}

let callbackForGetHistoryOld = function (res, dispatch) {

    dispatch(addAccountHistory(res));
}

let callbackForAddNewAccount = function (res, dispatch, name, label, labels) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        let tmp = { ...labels }; tmp[name] = label;
        console.log(tmp);
        saveLabels(dispatch, tmp);
    }


}

let callbackForSaveLabels = function (res, dispatch, labels) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        dispatch(addAccountLabels(labels));
        getAccounts(dispatch);
    }
}

let callbackForGetLabels = function (res, dispatch, accounts) {
    if (res.status === 0) {
        let acc = accounts;
        let labels = JSON.parse(res.result.value);
        for (let l in labels) {
            if (acc.hasOwnProperty(l)) {
                acc[l].account.label = labels[l];
            }
        }
        dispatch(addAccounts(acc));

    }
    else if (res.status === 13) {
        dispatch(addAccounts(accounts));
    }
    else {
        dispatch(addError(res.status));
    }
}
let callbackForAddLegacyAccounts = function (res, dispatch) {
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
