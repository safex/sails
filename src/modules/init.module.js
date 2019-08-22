//actions
import { addWalletExistsStatus } from '../actions/wallet_exists.action.js';
import { addLegacyWallet } from '../actions/legacy_wallet.action';
import { resetAllBalances, addLegacyBalance, addLegacyBTCBalance, addLegacyBTCBalancePending } from '../actions/legacy_accounts.action';
import * as WizardActions from '../actions/wizard.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addError } from '../actions/error.action';

//libs
import { checkFileForFlags, readFilePromise, decryptContent } from "../libs/legacy_wallet";
import { processResponse, jsonResponse } from '../libs/response';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';


// go api
import { initApi, accountsApi, activeAccountApi, legacyAccountsApi } from "../api/go";

//v7 api
import { balancesApi } from "../api/legacy";


//setups
let { LEGACY_DEFAULT_WALLET_PATH, NET_TYPE, DAEMON_HOST, DAEMON_PORT } = require('../setups/conf');

let { dialog } = window.require("electron").remote;


//for v7 wallet 
let checkIfFileExists = function (dispatch) {
    readFilePromise(LEGACY_DEFAULT_WALLET_PATH)
        .then(checkFileForFlags)
        .then((status) => { setWalletExistsStatus(dispatch, status) })
        .catch((error) => { dispatch(addError(error.message)) });
}

let setWalletExistsStatus = function (dispatch, status) {
    dispatch(addWalletExistsStatus(status))
}

//create wallet actions
let create = function (dispatch, form, names = ['filepath', 'password'], legacy = null) {
    lordOfTheFetch(initApi.createApi,
        [{ path: form[names[0]], password: form[names[1]], nettype: NET_TYPE, daemon_host: DAEMON_HOST, daemon_port: DAEMON_PORT }],
        callbackForCreate,
        [dispatch, legacy],
        { "dispatch": dispatch });
}

let openAccount = function (dispatch, legacy) {
    lordOfTheFetch(accountsApi.openAccountsApi,
        ["primary"],
        callbackForOpenAccount,
        [dispatch, legacy],
        { "dispatch": dispatch });
}



let setActiveAccount = function (dispatch, data, type, legacy) {

    lordOfTheFetch(activeAccountApi.setActiveAccountApi,
        [{ account: data, type: type }],
        callbackForSetActiveAccount,
        [dispatch, { account: data, type: type }, legacy],
        { "dispatch": dispatch });
}

let addLegacyAccountsToWallet = function (dispatch, data) {
    lordOfTheFetch(legacyAccountsApi.setLegacyAccountsApi,
        [data],
        callbackForAddLegacyAccounts,
        [dispatch],
        { "dispatch": dispatch });

}





//open wallet actions
let open = function (dispatch, history, form, names = ["filepath", "password"]) {
    lordOfTheFetch(initApi.openApi,
        [{ path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, daemon_host: DAEMON_HOST, daemon_port: DAEMON_PORT }],
        callbackForOpen,
        [dispatch, history],
        { "dispatch": dispatch });

}

let openLegacy = function (dispatch, form, names = ["legacy_filepath", "legacy_password"]) {
    readFilePromise(form[names[0]].trim())
        .then((data) => { return decryptContent(data, form[names[1]].trim()) })
        .then((content) => { //
            dispatch(addLegacyWallet(content));
            content.keys.forEach(x => {
                dispatch(resetAllBalances(x.public_key));
                balancesApi.getBalanceApi(x.public_key)
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((oldones) => {
                        dispatch(addLegacyBalance(x.public_key, oldones.balance));
                    })
                    .catch((error) => { dispatch(addError(error.message)); });
                balancesApi.getBTCBalanceApi(x.public_key)
                    .then(processResponse)
                    .then((res) => { res.text() })
                    .then((amount) => {
                        dispatch(addLegacyBTCBalance(x.public_key, amount));
                    })
                    .catch((error) => { dispatch(addError(error.message)); });
                balancesApi.getBTCBalancePendingApi(x.public_key)
                    .then(processResponse)
                    .then((res) => { res.text() })
                    .then((amount) => {
                        dispatch(addLegacyBTCBalancePending(x.public_key, amount));
                    })
                    .catch((error) => { dispatch(addError(error.message)); });

            });
        })
        .catch((error) => { dispatch(addError(error)); });
}




//restore

let restore = function (dispatch, form, names) {
    let args = { path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, daemon_host: DAEMON_HOST, daemon_port: DAEMON_PORT };
    let func = null;
    if (form[names[3]] === "mnemonic") {
        args = { ...args, seed: form[names[4]].trim(), password_mnemonic: "" }
        func = initApi.restoreSeedsApi;
    }
    else {
        args = { ...args, address: form[names[5]].trim(), spendkey: form[names[7]].trim(), viewkey: form[names[6]].trim() };
        func = initApi.restoreKeysApi;
    }

    lordOfTheFetch(func,
        [args],
        callbackForCreate,
        [dispatch, null],
        { "dispatch": dispatch });




}


let restoreFromKeys = function (dispatch, address, spendkey, viewkey, name) {
    lordOfTheFetch(accountsApi.recoverAccountKeysApi,
        [
            address, spendkey, viewkey, name
        ],
        callbackForRestoreFromKeys,
        [dispatch],
        { "dispatch": dispatch });

}


//create

let callbackForCreate = function (res, dispatch, legacy) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        openAccount(dispatch, legacy);
    }
}

// open account
let callbackForOpenAccount = function (res, dispatch, legacy) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        setActiveAccount(dispatch, res.result.info, 0, legacy);
    }
}



let callbackForSetActiveAccount = function (res, dispatch, data, legacy) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        dispatch(addActiveAccount(data));
        if (legacy && legacy.hasOwnProperty("safex_keys") && legacy.safex_keys.length > 0) {
            legacy.safex_keys.forEach((e, i) => {
                restoreFromKeys(dispatch, e.public_addr, e.spend.sec, e.view.sec, "wallet " + i);
            })
        }
        if (legacy && legacy.hasOwnProperty("keys") && legacy.keys.length > 0) {
            let legacies = {};
            legacy.keys.forEach((e, i) => {
                legacies["wallet_legacy" + i] = { account: legacy.keys[i], type: 1 };
                legacies["wallet_legacy" + i].account["address"] = e.public_key;
                legacies["wallet_legacy" + i].account["account_name"] = "wallet_legacy" + i;


            });
            addLegacyAccountsToWallet(dispatch, legacies);

        }
    }
}

//open
let callbackForOpen = function (res, dispatch, history) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        history.push('/w/home');
    }
}

//restore from keys
let callbackForRestoreFromKeys = function (res, dispatch) {
    console.log(res);

}

//add legacy accounts
let callbackForAddLegacyAccounts = function (res, dispatch) {
    if (res.status !== 0) dispatch(addError(res.status));
}

//wizard 

let walletFile = function (dispatch, options = null, type = "create", name = "create_filepath", _touched = false, _errors = false) {
    let name_var = {};
    name_var[name] = true;
    if (type === "create") {
        dialog.showSaveDialog(options, (path) => {
            let path_ext = path;
            if (path && !path_ext.endsWith('.sails')) {
                path_ext += ".sails";
            }
            if (_touched) {
                addWizardTouched(dispatch, { ..._touched, ...name_var });
            }
            name_var[name] = path_ext;
            addWizardData(dispatch, name_var);
            if (_errors) {
                let errors = { ..._errors };
                if (!path) {
                    errors[name] = true;
                }
                else {
                    errors[name] = false;
                }
                addWizardErrors(dispatch, errors);

            }
        });
    }
    else {
        dialog.showOpenDialog(options, (files) => {
            if (_touched) {
                addWizardTouched(dispatch, { ..._touched, ...name_var });
            }
            if (files !== undefined && files.length > 0) {
                name_var[name] = files[0];
                addWizardData(dispatch, name_var);

                if (_errors) {
                    let errors = { ..._errors };
                    errors[name] = false;
                    addWizardErrors(dispatch, errors);
                }
            }
            if (files === undefined) {
                if (_errors) {
                    name_var[name] = '';
                    addWizardData(dispatch, name_var);
                    let errors = { ..._errors };
                    errors[name] = true;
                    addWizardErrors(dispatch, errors);
                }
            }
        });
    }

}

let initWizardState = function (dispatch) {

    dispatch(WizardActions.resetWizardStep());
    dispatch(WizardActions.resetWizardData());
    dispatch(WizardActions.resetWizardErrors());
    dispatch(WizardActions.resetWizardTouched());

}

let addWizardData = function (dispatch, data) {
    dispatch(WizardActions.addWizardData(data));
}

let addWizardErrors = function (dispatch, data) {
    dispatch(WizardActions.addWizardErrors(data));
}

let addWizardTouched = function (dispatch, data) {
    dispatch(WizardActions.addWizardTouched(data));
}

let removeWizardData = function (dispatch, data = [], type = "data") {
    data.forEach((x) => {
        switch (type) {
            case "data":
                dispatch(WizardActions.removeWizardData(x));
                break;
            case "errors":
                dispatch(WizardActions.removeWizardErrors(x));
                break;
            case "touched":
                dispatch(WizardActions.removeWizardTouched(x));
                break;
            default:
                dispatch(WizardActions.removeWizardData(x));

                break;
        }

    });
}

let wizardBack = function (dispatch, props, callback = null, args = []) {
    removeWizardData(dispatch, props, 'data');
    removeWizardData(dispatch, props, 'errors');
    removeWizardData(dispatch, props, 'touched');

    dispatch(WizardActions.removeWizardStep());

    if (callback) {
        callback(...args);
    }
}

let wizardNext = function (dispatch, callback = null, args = []) {

    dispatch(WizardActions.addWizardStep());

    if (callback) {
        callback(...args);
    }

}

let initWizardData = function (dispatch, data) {
    dispatch(WizardActions.initWizardData(data));
}
let initWizardErrors = function (dispatch, data) {
    dispatch(WizardActions.initWizardErrors(data));
}
let initWizardTouched = function (dispatch, data) {
    dispatch(WizardActions.initWizardTouched(data));
}

let initLegacyWallet = function (dispatch) {
    dispatch(addLegacyWallet({}));
}







export {
    //files
    checkIfFileExists,
    setWalletExistsStatus,
    walletFile,
    //create
    create,
    //open
    open,
    openLegacy,
    //restore
    restore,
    //wizard
    initWizardState,
    initWizardData,
    initWizardErrors,
    initWizardTouched,
    initLegacyWallet,
    addWizardData,
    addWizardErrors,
    addWizardTouched,
    removeWizardData,
    wizardBack,
    wizardNext




}