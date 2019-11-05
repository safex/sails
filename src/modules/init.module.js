//actions
import { addWalletExistsStatus } from '../actions/wallet_exists.action.js';
import { addLegacyWallet } from '../actions/legacy_wallet.action';
import { resetAllBalances, addLegacyBalance, addLegacyBTCBalance, addLegacyBTCBalancePending, addLegacyAccounts } from '../actions/legacy_accounts.action';
import { addAccounts } from '../actions/accounts.action';
import * as WizardActions from '../actions/wizard.action';
import { addActiveAccount } from '../actions/active_account.action';
import { addError } from '../actions/error.action';

//libs
import { checkFileForFlags, readFilePromise, decryptWallet } from "../libs/legacy_wallet";
import { processResponse, jsonResponse } from '../libs/response';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';


// go api
import { initApi, accountsApi, activeAccountApi, legacyAccountsApi } from "../api/go";

//v7 api
import { balancesApi } from "../api/legacy";

import crypto from 'crypto';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
let create = function (dispatch, form, names = ['filepath', 'password'], daemon, legacy = null) {
    let daemon_host = daemon.daemon_host || DAEMON_HOST;
    let daemon_port = daemon.daemon_port || DAEMON_PORT;
    lordOfTheFetch(initApi.createApi,
        [{ path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, daemon_host: daemon_host, daemon_port: daemon_port }],
        callbackForCreate,
        [dispatch, legacy, form[names[0]].trim(), form[names[1]].trim()],
        { "dispatch": dispatch });
}

let openAccount = function (dispatch, legacy) {
    lordOfTheFetch(accountsApi.openAccountsApi,
        ["primary"],
        callbackForOpenAccount,
        [dispatch, legacy],
        { "dispatch": dispatch });
}



let setActiveAccount = function (dispatch, data, legacy) {

    lordOfTheFetch(activeAccountApi.setActiveAccountApi,
        [data],
        callbackForSetActiveAccount,
        [dispatch, data, legacy],
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
let open = function (dispatch, history, form, names = ["filepath", "password"], daemon) {
    let daemon_host = daemon.daemon_host || DAEMON_HOST;
    let daemon_port = daemon.daemon_port || DAEMON_PORT;
    lordOfTheFetch(initApi.openApi,
        [{ path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, daemon_host: daemon_host, daemon_port: daemon_port }],
        callbackForOpen,
        [dispatch, history, form[names[0]].trim(), form[names[1]].trim()],
        { "dispatch": dispatch });

}

let openLegacy = function (dispatch, form, names = ["legacy_filepath", "legacy_password"]) {
    readFilePromise(form[names[0]].trim())
        .then((data) => { return decryptWallet(data, form[names[1]].trim()) })
        .then((content) => { //
            dispatch(addAccounts(Object.assign({}, content.safex_keys)));
            dispatch(addLegacyWallet(content));
            dispatch(addLegacyAccounts(content.keys))
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
                    .then(jsonResponse)
                    .then((amount) => {
                        dispatch(addLegacyBTCBalance(x.public_key, amount));
                    })
                    .catch((error) => { dispatch(addError(error.message)); });
                balancesApi.getBTCBalancePendingApi(x.public_key)
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((amount) => {
                        dispatch(addLegacyBTCBalancePending(x.public_key, amount));
                    })
                    .catch((error) => { dispatch(addError(error.message)); });
            });
        })
        .catch((error) => { dispatch(addError(error)); });
}




//restore

let restore = function (dispatch, form, names, daemon) {
    let daemon_host = daemon.daemon_host || DAEMON_HOST;
    let daemon_port = daemon.daemon_port || DAEMON_PORT;
    let args = { path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, daemon_host: daemon_host, daemon_port: daemon_port };
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
        [dispatch, null, form[names[0]].trim(), form[names[1]].trim()],
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

let callbackForCreate = function (res, dispatch, legacy, path, pwd) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        localStorage.setItem("path", path);
        localStorage.setItem("pwd", pwd);
        openAccount(dispatch, legacy);
    }
}

// open account
let callbackForOpenAccount = function (res, dispatch, legacy) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        setActiveAccount(dispatch, res.result.info, legacy);
    }
}



let callbackForSetActiveAccount = function (res, dispatch, data, legacy) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        dispatch(addActiveAccount(data));
        if (legacy && legacy.hasOwnProperty("safex_keys") && legacy.safex_keys.length > 0) {
            legacy.safex_keys.forEach((e, i) => {
                if ((e.public_addr !== undefined) && (e.spend !== undefined) && (e.view !== undefined)) {
                    let name = crypto.randomBytes(10).toString('hex') + "LK" + crypto.randomBytes(10).toString('hex');
                    restoreFromKeys(dispatch, e.public_addr, e.spend.sec, e.view.sec, name);
                }
                else console.log("FROM INIT => UNDEFINED ", e);
            })
        }
        if (legacy && legacy.hasOwnProperty("keys") && legacy.keys.length > 0) {
            let legacies = {};
            legacy.keys.forEach((e, i) => {
                let name = crypto.randomBytes(10).toString('hex') + "L" + crypto.randomBytes(10).toString('hex');
                legacies[name] = legacy.keys[i];
                legacies[name]["address"] = e.public_key;
                legacies[name]["account_name"] = name;
            });
            addLegacyAccountsToWallet(dispatch, legacies);

        }
    }
}

//open
let callbackForOpen = function (res, dispatch, history, path, pwd) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        console.log("OPPENED WALLEt");
        localStorage.setItem("path", path);
        localStorage.setItem("pwd", pwd);
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
    dispatch(addLegacyAccounts([]));
}

let breakword = function (address) {
    return address.substring(0, (address.length / 2)) + "\n" + address.substring((address.length / 2));
}


let makePDF = function () {

    let title = this.props.t("pdf_title");
    var docDefinition = {
        content: [
            { text: title, style: 'header' },

            {
                style: 'tableExample',
                table: {
                    widths: ['auto', "*"],
                    body: [
                        [{ text: `${this.props.t("password")}`, noWrap: true }, `${this.props.wizard.data.create_password}`],
                    ]
                }
            },
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    headerRows: 1,
                    widths: ['*'],
                    body: [
                        [{ text: `${this.props.t("address")}`, style: 'tableHeader', alignment: 'center' }],
                        [{ text: breakword(this.props.active_account.address), alignment: 'center' }],
                    ]
                }
            },
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    widths: ['auto', '*'],
                    headerRows: 1,
                    body: [
                        [{ text: `${this.props.t("spend_keys")}`, style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                        [{ text: `${this.props.t("private")}`, style: 'tableHeader' }, `${this.props.active_account.spendkey.secret}`],
                        [{ text: `${this.props.t("public")}`, style: 'tableHeader' }, `${this.props.active_account.spendkey.public}`]
                    ]
                }
            },
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    widths: ['auto', '*'],
                    headerRows: 1,
                    body: [
                        [{ text: `${this.props.t("view_keys")}`, style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                        [{ text: `${this.props.t("private")}`, style: 'tableHeader' }, `${this.props.active_account.viewkey.secret}`],
                        [{ text: `${this.props.t("public")}`, style: 'tableHeader' }, `${this.props.active_account.viewkey.public}`]
                    ]
                }
            },
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    headerRows: 1,
                    body: [
                        [{ text: `${this.props.t("mnemonic")}`, style: 'tableHeader', alignment: 'center' }],
                        [`${this.props.active_account.mnemonic}`],
                    ]
                }
            },


        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            addressStyle: {
                wordBreak: "break-all"
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
    };

    let pdf = pdfMake.createPdf(docDefinition).download();
    // pdfDoc.pipe(fs.createWriteStream('./pdfs/tables.pdf'));
    //pdf.end();
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
    wizardNext,
    makePDF




}