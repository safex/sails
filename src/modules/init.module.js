//actions
const { addWalletExistsStatus } = require('../actions/wallet_exists.action.js');
const { addLegacyWallet } = require('../actions/legacy_wallet.action');
const WizardActions = require('../actions/wizard.action');
const { addActiveAccount } = require('../actions/active_account.action');

//libs
let { checkFileForFlags, readFilePromise, decryptContent } = require("../libs/legacy_wallet");
let { processResponse, jsonResponse, errorResponse } = require('../libs/response');
let { addError } = require('../actions/error.action');

//api
let { initApi, accountsApi, activeAccountApi } = require("../api/go");

//setups
let { LEGACY_DEFAULT_WALLET_PATH, NET_TYPE } = require('../setups/conf');

const { dialog } = window.require("electron").remote;


let checkIfFileExists = function (dispatch) {
    readFilePromise(LEGACY_DEFAULT_WALLET_PATH)
        .then(checkFileForFlags)
        .then((status) => { setWalletExistsStatus(dispatch, status) })
        .catch((error) => { dispatch(addError(error)) });

}

let setWalletExistsStatus = function (dispatch, status) {
    dispatch(addWalletExistsStatus(status))
}

let create = function (dispatch, form, names = ['filepath', 'password']) {
    initApi.createApi({ path: form[names[0]], password: form[names[1]], nettype: NET_TYPE })
        .then(processResponse)
        .then(jsonResponse)
        .then((create) => {
            if (create.status != 0) dispatch(addError(create.status));
            else {
                return accountsApi.openAccountsApi(create.result.accounts[0])
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((open) => {
                        if (open.status != 0) dispatch(addError(open.status));
                        else {
                            return accountsApi.infoAccountsApi("primary") // @note izmeniti kad Steva upgrade
                                .then(processResponse)
                                .then(jsonResponse)
                                .then((info) => {
                                    if (info.status != 0) dispatch(addError(info.status));
                                    else {
                                        return activeAccountApi.setActiveAccountApi({ account: info.result, type: 0 })
                                            .then(processResponse)
                                            .then(jsonResponse)
                                            .then((active) => {
                                                if (active.status != 0) dispatch(addError(active.status));
                                                else {
                                                    dispatch(addActiveAccount({ account: info.result, type: 0 }));
                                                }
                                            })
                                            .catch(errorResponse)
                                    }
                                })
                                .catch(errorResponse);
                        }

                    })
                    .catch(errorResponse);
            }


        })
        .catch(errorResponse);
}



let createLegacy = function (dispatch, form, names = ["create_filepath", "create_password"], legacy = null) {
    initApi.createApi({ path: form[names[0]], password: form[names[1]], nettype: NET_TYPE })
        .then(processResponse)
        .then(jsonResponse)
        .then((create) => {
            if (create.status != 0) dispatch(addError(create.status));
            else {
                return accountsApi.openAccountsApi("primary")
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((open) => {
                        if (open.status != 0) dispatch(addError(open.status));
                        else {
                            return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                                .then(processResponse)
                                .then(jsonResponse)
                                .then((info) => {
                                    if (info.status != 0) dispatch(addError(info.status));
                                    else {
                                        return activeAccountApi.setActiveAccountApi({ account: info.result, type: 0 })
                                            .then(processResponse)
                                            .then(jsonResponse)
                                            .then((active) => {
                                                if (active.status != 0) dispatch(addError(active.status));
                                                else {
                                                    dispatch(addActiveAccount({ account: info.result, type: 0 }));
                                                    //add legacy accounts;
                                                    //add sfx accounts
                                                }
                                            })
                                            .catch(errorResponse)
                                    }
                                })
                                .catch(errorResponse);
                        }

                    })
                    .catch(errorResponse);
            }


        })
        .catch(errorResponse);
}

let open = function (dispatch, history, form, names = ["filepath", "password"]) {
    initApi.openApi({ path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE })
        .then(processResponse)
        .then(jsonResponse)
        .then((open) => {
            if (open.status != 0) dispatch(addError(open.status));
            else {
                history.push('/w/home');
            }
        })
        .catch(errorResponse);
}

let openLegacy = function (dispatch, form, names = ["legacy_filepath", "legacy_password"]) {
    readFilePromise(form[names[0]].trim())
        .then((data) => { return decryptContent(data, form[names[1]].trim()) })
        .then((content) => { dispatch(addLegacyWallet(content)); })
        .catch((error) => { dispatch(addError(error)); });
}




//restore

let restore = function (dispatch, form, names) {
    if (form[names[3]] === "mnemonic") {
        //&& form[names[1]].trim().split(' ').length === 25
        initApi.restoreSeedsApi({ path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, seed: form[names[4]].trim(), password_mnemonic: "" })
            .then(processResponse)
            .then(jsonResponse)
            .then((create) => {
                if (create.status != 0) dispatch(addError(create.status));
                else {
                    return accountsApi.openAccountsApi("primary")
                        .then(processResponse)
                        .then(jsonResponse)
                        .then((open) => {
                            if (open.status != 0) dispatch(addError(open.status));
                            else {
                                return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                                    .then(processResponse)
                                    .then(jsonResponse)
                                    .then((info) => {
                                        if (info.status != 0) dispatch(addError(info.status));
                                        else {
                                            return activeAccountApi.setActiveAccountApi({ account: info.result, type: 0 })
                                                .then(processResponse)
                                                .then(jsonResponse)
                                                .then((active) => {
                                                    if (active.status != 0) dispatch(addError(active.status));
                                                    else {
                                                        dispatch(addActiveAccount({ account: info.result, type: 0 }));
                                                    }
                                                })
                                                .catch(errorResponse)
                                        }
                                    })
                                    .catch(errorResponse);
                            }

                        })
                        .catch(errorResponse);
                }


            })
            .catch(errorResponse);;

    }
    else {
        initApi.restoreKeysApi({ path: form[names[0]].trim(), password: form[names[1]].trim(), nettype: NET_TYPE, address: form[names[5]].trim(), spendkey: form[names[7]].trim(), viewkey: form[names[6]].trim() })
            .then(processResponse)
            .then(jsonResponse)
            .then((create) => {
                if (create.status != 0) dispatch(addError(create.status));
                else {
                    return accountsApi.openAccountsApi("primary")
                        .then(processResponse)
                        .then(jsonResponse)
                        .then((open) => {
                            if (open.status != 0) dispatch(addError(open.status));
                            else {
                                return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                                    .then(processResponse)
                                    .then(jsonResponse)
                                    .then((info) => {
                                        if (info.status != 0) dispatch(addError(info.status));
                                        else {
                                            return activeAccountApi.setActiveAccountApi({ account: info.result, type: 0 })
                                                .then(processResponse)
                                                .then(jsonResponse)
                                                .then((active) => {
                                                    if (active.status != 0) dispatch(addError(active.status));
                                                    else {
                                                        dispatch(addActiveAccount({ account: info.result, type: 0 }));
                                                    }
                                                })
                                                .catch(errorResponse)
                                        }
                                    })
                                    .catch(errorResponse);
                            }

                        })
                        .catch(errorResponse);
                }


            })
            .catch(errorResponse);;
    }

}

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
            if (files != undefined && files.length > 0) {
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

//wizard 
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
    createLegacy,
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