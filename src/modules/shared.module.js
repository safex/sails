//actions
import { changeLanguage } from '../actions/language.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addError } from '../actions/error.action';
import { resetApp } from '../actions/root.action';
import { addAccountHistory } from '../actions/history.action';
import { addDaemonHost, addDaemonPort, addDaemonModal } from '../actions/daemon.action';


//api
import { closeApi, connectToDaemonApi } from '../api/go/init.api';
import { getActiveAccountApi, setActiveAccountApi } from '../api/go/active_account.api';
import { openAccountsApi, syncAccountsApi } from '../api/go/accounts.api';
import { getTransactionHistory } from '../api/go/transaction.api'


//libs
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';
import { DAEMON_HOST, DAEMON_PORT } from '../setups/conf';
import { getAccountLabelsApi } from '../api/go/account_labels.api';

//electron

let { ipcRenderer } = window.require("electron");


let changeLanguageF = function (that, value) {
    that.props.dispatch(changeLanguage(value));
    that.props.i18n.changeLanguage(value);
}

let logout = function (event) {
    closeWallet(this.props.dispatch, this.props.history);
}


let closeWallet = function (dispatch, history) {
    lordOfTheFetch(closeApi, [], callbackForCloseWallet, [dispatch, history], { dispatch: dispatch });
}

let getActiveAccountFromWallet = function (dispatch) {
    lordOfTheFetch(getActiveAccountApi, [], callbackForGetActiveAccountFromWallet, [dispatch], { dispatch: dispatch });
}

let openAccounts = function (dispatch, account, save) {
    lordOfTheFetch(openAccountsApi, [account.account_name], callbackForOpenAccounts, [dispatch, save, true, account], { dispatch: dispatch });
}

let saveActiveToWallet = function (dispatch, account, dispatchActiveAccount) {
    lordOfTheFetch(setActiveAccountApi, [account], callbackForSetActiveAccountInWallet, [dispatch, account, dispatchActiveAccount], { dispatch: dispatch });
}

let syncAccount = function (dispatch, account) {
    syncAccountNew(dispatch, account);
}
let getHistory = function (dispatch, account) {
    getHistoryNew(dispatch, account);
}


let getHistoryNew = function (dispatch, account) {
    lordOfTheFetch(getTransactionHistory, [], callbackForGetHistoryNew, [dispatch], { dispatch: dispatch });
}

let syncAccountNew = function (dispatch, account) {
    lordOfTheFetch(syncAccountsApi, [], callbackForSyncAccount, [dispatch, account], { dispatch: dispatch });
}

let getLabels = function (dispatch, account, save, dispatchActiveAccount) {
    lordOfTheFetch(getAccountLabelsApi, [], callbackForGetlabels, [dispatch, account, save, dispatchActiveAccount], { dispatch: dispatch });
}



//callbacks
let callbackForGetActiveAccountFromWallet = function (res, dispatch) {
    if (res.status === 0) {
        openAccounts(dispatch, JSON.parse(res.result.value), false);
    }
    else if (res.status === 13) {
        openAccounts(dispatch, { account_name: "primary" }, true);
    }
    else {
        dispatch(addError(res.status));
    }
}

let callbackForOpenAccounts = function (res, dispatch, save, dispatchActiveAccount, account) {
    if (res.status !== 0) {
        dispatch(addError(res.status));
    }
    let acc = null;
    if (account.hasOwnProperty("address")) { acc = { ...account }; }
    else if (res.result.hasOwnProperty("info")) {
        acc = res.result.info;
    }
    if (acc.hasOwnProperty("label")) {
        if (save) {
            saveActiveToWallet(dispatch, acc, dispatchActiveAccount);
        }
        else if (dispatchActiveAccount) {
            localStorage.setItem("active_account", JSON.stringify(acc));
            dispatch(addActiveAccount(acc));
            syncAccount(dispatch, acc);
            getHistory(dispatch, acc);
        }
    }
    else getLabels(dispatch, acc, save, dispatchActiveAccount);
}

let callbackForSetActiveAccountInWallet = function (res, dispatch, data, dispatchToAccount) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        if (dispatchToAccount) {
            dispatch(addActiveAccount(data));
        }

    }
}
let callbackForCloseWallet = function (res, dispatch, history) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        localStorage.clear();
        dispatch(resetApp());
        history.push('/');
    }
}

let callbackForGetHistoryNew = function (res, dispatch) {
    if (res.status !== 0) dispatch(addError(res.status));
    else { dispatch(addAccountHistory(res.result)); }
}
let callbackForSyncAccount = function (res, dispatch, account) {
    if (res.status !== 0) dispatch(addError(res.status));
    else { getHistory(dispatch, account); }
}

let callbackForGetlabels = function (res, dispatch, account, save, dispatchActiveAccount) {
    let labels = {};
    if (res.status === 13) labels = {};
    if (res.status === 0) labels = JSON.parse(res.result.value);
    //else dispatch(addError(res.status));
    localStorage.setItem("labels", JSON.stringify(labels));
    if (labels.hasOwnProperty(account.account_name)) account.label = labels[account.account_name];
    else account.label = account.account_name;
    if (save) {
        saveActiveToWallet(dispatch, account, dispatchActiveAccount);
    }
    else if (dispatchActiveAccount) {
        localStorage.setItem("active_account", JSON.stringify(account));
        dispatch(addActiveAccount(account));
        syncAccount(dispatch, account);
        getHistory(dispatch, account);
    }
}

let toggleDaemonModal = function (show) {
    this.props.dispatch(addDaemonModal(show));
}

let addDaemonData = function (event, type) {
    if (type == "host") {
        let val = event.target.value || DAEMON_HOST;
        this.props.dispatch(addDaemonHost(val));
    }
    else {
        let val = event.target.value || DAEMON_PORT;
        this.props.dispatch(addDaemonPort(parseInt(val)));
    }
}

let minimize = function () {
    ipcRenderer.send('app-minimize');
}
let maximize = function () {
    ipcRenderer.send('app-maximize');
}
let quit = function () {

    ipcRenderer.send('app-close');
}


let copyAddress = function (value) {
    const el = document.createElement('input');
    el.value = value;
    el.setAttribute('readonly', '');                // tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

let connectToDaemon = function () {

    let daemon = this.props.hasOwnProperty("daemon") ? this.props.daemon : { daemon_host: false, daemon_port: false };
    lordOfTheFetch(connectToDaemonApi,
        [daemon],
        callbackForConnectToDaemon.bind(this),
        [daemon],
        { "dispatch": this.props.dispatch });
}

let callbackForConnectToDaemon = function (res, daemon) {
    toggleDaemonModal.bind(this)(false);
    if (res.status !== 0) { this.props.dispatch(addError(res.status)); }
    else {
        localStorage.setItem('daemon', JSON.stringify(daemon));
    }

}

export {
    changeLanguageF,
    logout,
    getActiveAccountFromWallet,
    toggleDaemonModal,
    addDaemonData,
    minimize,
    maximize,
    quit,
    copyAddress,
    connectToDaemon,
    openAccounts

}
