//actions
import { changeLanguage } from '../actions/language.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addError } from '../actions/error.action';
import { resetApp } from '../actions/root.action';
import { addAccountHistory } from '../actions/history.action';
import { addDaemonHost, addDaemonPort, addDaemonModal } from '../actions/daemon.action';


//api
import { closeApi } from '../api/go/init.api';
import { getActiveAccountApi, setActiveAccountApi } from '../api/go/active_account.api';
import { openAccountsApi, syncAccountsApi } from '../api/go/accounts.api';
import { getTransactionHistory } from '../api/go/transaction.api'


//libs
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';
import { DAEMON_HOST, DAEMON_PORT } from '../setups/conf';

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
    if (account.type) {
        dispatch(addActiveAccount(account));
        // syncAccount(dispatch, account);
        getHistory(dispatch, account);
        //fake open primary

        lordOfTheFetch(openAccountsApi, ["primary"], callbackForOpenAccounts, [dispatch, save, false], { dispatch: dispatch });
    }
    else {
        lordOfTheFetch(openAccountsApi, [account.account.account_name], callbackForOpenAccounts, [dispatch, save, true], { dispatch: dispatch });
    }

}

let saveActiveToWallet = function (dispatch, account, dispatchActiveAccount) {
    lordOfTheFetch(setActiveAccountApi, [{ account: account, type: 0 }], callbackForSetActiveAccountInWallet, [dispatch, account, dispatchActiveAccount], { dispatch: dispatch });
}

let syncAccount = function (dispatch, account) {
    if (account.type === 1) syncAccountOld(dispatch, account);
    else syncAccountNew(dispatch, account);
}
let getHistory = function (dispatch, account) {
    if (account.type === 1) getHistoryOld(dispatch, account);
    else getHistoryNew(dispatch, account);
}

let getHistoryOld = function (dispatch, account) {

}
let getHistoryNew = function (dispatch, account) {
    lordOfTheFetch(getTransactionHistory, [], callbackForGetHistoryNew, [dispatch], { dispatch: dispatch });
}

let syncAccountOld = function (dispatch, account) {
}
let syncAccountNew = function (dispatch, account) {
    lordOfTheFetch(syncAccountsApi, [], callbackForSyncAccount, [dispatch, account], { dispatch: dispatch });
}



//callbacks
let callbackForGetActiveAccountFromWallet = function (res, dispatch, labels) {
    if (res.status === 0) {
        openAccounts(dispatch, JSON.parse(res.result.value), false, labels);
    }
    else if (res.status === 13) {
        openAccounts(dispatch, { account: { account_name: "primary" }, type: 0 }, true, labels);
    }
    else {
        dispatch(addError(res.status));
    }
}

let callbackForOpenAccounts = function (res, dispatch, save, dispatchActiveAccount) {
    if (res.status !== 0) {
        dispatch(addError(res.status));
    }
    let tmp = res.result.info;

    //ovde je greska
    //ovde mora da se izvuce labela
    if (!tmp.hasOwnProperty("label")) { tmp.label = tmp.account_name };
    if (save) {
        saveActiveToWallet(dispatch, tmp, dispatchActiveAccount);
    }
    else if (dispatchActiveAccount) {
        dispatch(addActiveAccount({ account: tmp, type: 0 }));
        syncAccount(dispatch, { account: tmp, type: 0 });
        getHistory(dispatch, { account: tmp, type: 0 });
    }


}

let callbackForSetActiveAccountInWallet = function (res, dispatch, data, dispatchToAccount) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        if (dispatchToAccount) {
            dispatch(addActiveAccount({ account: data, type: 0 }));
        }

    }
}
let callbackForCloseWallet = function (res, dispatch, history) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
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

let toggleDaemonModal = function (show) {
    this.props.dispatch(addDaemonModal(show));
}

let addDaemonData = function (event, type) {
    if (type === "host") {
        let val = event.target.value || DAEMON_HOST;
        this.props.dispatch(addDaemonHost(val));
    }
    else {
        let val = event.target.value || DAEMON_PORT;
        this.props.dispatch(addDaemonPort(parseInt(val)));
    }
}



export {
    changeLanguageF,
    logout,
    getActiveAccountFromWallet,
    toggleDaemonModal,
    addDaemonData

}
