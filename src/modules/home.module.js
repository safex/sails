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
import { encryptContent, decryptContent, readFilePromise } from '../libs/legacy_wallet';
import crypto from 'crypto';

let { dialog } = window.require("electron").remote;
let fs = window.require('fs');
let archiver = require('archiver');
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

let addSeedsAccount = function (dispatch, seeds, label, accounts, labels) {
    let exists = Object.values(accounts).filter(account => { return account.mnemonic === seeds.trim() });
    if (exists.length !== 0) {
        dispatch(addError("ACCOUNT_EXISTS"));
    }
    else {
        let name = crypto.randomBytes(10).toString('hex') + "S" + crypto.randomBytes(10).toString('hex');
        lordOfTheFetch(accountsApi.recoverAccountSeedsApi, [seeds.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels, true], { dispatch: dispatch });
    }



}

let addKeysAccount = function (dispatch, address, view, spend, label, accounts, labels) {
    let exists = Object.values(accounts).filter(account => { return (account.address === address.trim()) && (account.viewkey.secret === view.trim()) && (account.spendkey.secret === spend.trim()); });
    if (exists.length !== 0) {
        dispatch(addError("ACCOUNT_EXISTS"));
    }
    else {
        let name = crypto.randomBytes(10).toString('hex') + "K" + crypto.randomBytes(10).toString('hex');
        lordOfTheFetch(accountsApi.recoverAccountKeysApi, [address.trim(), spend.trim(), view.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels, true], { dispatch: dispatch });
    }

}


let addFileAccount = function (dispatch, filepath, password, label, type, accounts, labels) {
    let name = crypto.randomBytes(10).toString('hex') + "F" + crypto.randomBytes(10).toString('hex');
    if (type === "old") {
        lordOfTheFetch(accountsApi.recoverAccountFileApi, [filepath.trim(), password.trim(), name], callbackForAddNewAccount, [dispatch, name, label, labels, true], { dispatch: dispatch });
    }
    else {
        readFilePromise(filepath)
            .then((data) => { return decryptContent(data.toString(), password) })
            .then((x) => {
                if (x.address && x.spendkey && x.viewkey) {
                    let exists = Object.values(accounts).filter(account => { return (account.address === x.address.trim()) && (account.viewkey.secret === x.viewkey.secret.trim()) && (account.spendkey.secret === x.spendkey.secret.trim()); });
                    if (exists.length !== 0) {
                        dispatch(addError("ACCOUNT_EXISTS"));
                    }
                    else {
                        let l = x.label || label;
                        if (x.account_name === "primary") { x.account_name = name; }
                        lordOfTheFetch(accountsApi.recoverAccountKeysApi, [x.address.trim(), x.spendkey.secret.trim(), x.viewkey.secret.trim(), x.account_name], callbackForAddNewAccount, [dispatch, x.account_name, l, labels, true], { dispatch: dispatch });
                    }

                }
                else {
                    dispatch(addError("INVALID_FILE_FORMAT"));
                }
            })
            .catch(err => dispatch(addError(err)));
    }

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

let saveFile = function (id, title) {
    dialog.showSaveDialog({
        title: title
    },
        (path) => {
            document.getElementById(id).value = path;
        }
    );
}

let exportKeys = function (dispatch, active_account, accounts, type, scope, pwd, path) {
    if (path === "") { dispatch(addError("NO_EXPORT_PATH")); }
    else {
        if (scope === "all") {
            var output = fs.createWriteStream(path + '.zip');
            var archive = archiver('zip', {
                zlib: { level: 9 }
            });
            archive.on('error', (err) => {
                dispatch(addError(err));
            });
            archive.pipe(output);
            Promise.all(
                Object.values(accounts).map((x) => {
                    return new Promise(resolve => {
                        let filepath = x.address;
                        let data = JSON.stringify(x, null, 2);
                        if (type === "raw") {
                            filepath += ".json";
                        }
                        else {
                            filepath += '.keys';
                            data = encryptContent(data, pwd);
                        }
                        archive.append(data, { name: filepath });
                        resolve();
                    });

                })).then(() => {
                    archive.finalize();
                });
        }
        else {
            let fun = null;
            if (type === "raw") {
                fun = exportKeysJSON(active_account, path)

            }
            else {
                fun = exportKeysEncrypted(active_account, pwd, path)
            }

            if (fun)
                fun
                    .then(created => { })
                    .catch(err => dispatch(addError(err)));
        }
    }
}

let exportKeysJSON = function (account, path) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path + '.json', JSON.stringify(account, null, 2), (err) => {
            if (err) reject("EXPORT_JSON");
            else resolve(path + '.json');
        });
    });
}

let exportKeysEncrypted = function (account, pwd, path) {
    let data = encryptContent(JSON.stringify(account, null, 2).trim(), pwd);
    return new Promise((resolve, reject) => {
        fs.writeFile(path + '.keys', data, (err) => {
            if (err) reject(err);
            else resolve(path + '.keys');
        });
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
    openFile,
    saveFile,
    exportKeys
}
