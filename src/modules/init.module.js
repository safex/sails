//actions
const { addWalletExistsStatus } = require('../actions/wallet_exists.action.js');
const { addLegacyWallet } = require('../actions/legacy_wallet.action');
const LWAction = require('../actions/legacy_wizard.action');
const CWAction = require('../actions/create_wizard.action');
const OWAction = require('../actions/open_wizard.action');
const RWAction = require('../actions/restore_wizard.action');
const { addActiveAccount } = require('../actions/active_account.action');
const { addRestoreData } = require('../actions/restore_wizard.action');

//libs
let { checkFileForFlags, readFilePromise, decryptContent } = require("../libs/legacy_wallet");
let { processResponse, jsonResponse, errorResponse } = require('../libs/response');
let {addError} = require('../actions/error.action');

//api
let { initApi, accountsApi, activeAccountApi } = require("../api/go");

//setups
let { LEGACY_DEFAULT_WALLET_PATH, NET_TYPE } = require('../setups/conf');

const { dialog } = window.require("electron").remote;


let checkIfFileExists = function (dispatch) {
    readFilePromise(LEGACY_DEFAULT_WALLET_PATH)
        .then(checkFileForFlags)
        .then((status) => { setWalletExistsStatus(dispatch, status) })
        .catch((error) => { throw new Error(error) });

}

let setWalletExistsStatus = function (dispatch, status) {
    dispatch(addWalletExistsStatus(status))
}


//callback HELLLLLLLLLL!!!!!!!!!!!!!!!!!!!
let create = function (dispatch, form) {
    initApi.createApi({ path: form.filepath, password: form.password, name: form.wallet_name, nettype: NET_TYPE })
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



let createLegacy = function (dispatch, form, legacy= null) {
    initApi.createApi({ path: form.create_filepath, password: form.create_password, name: form.create_wallet_name, nettype: NET_TYPE })
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

let open = function (dispatch,history, form) {
    initApi.openApi({ path: form.filepath.trim(), password: form.password.trim(), nettype: NET_TYPE })
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

let openLegacy = function (dispatch, form) {
    readFilePromise(form.legacy_filepath.trim())
        .then((data) => { return decryptContent(data, form.legacy_password.trim()) })
        .then((content) => { dispatch(addLegacyWallet(content)); })
        .catch((error) => { dispatch(addError(error)); });
}




//restore

let restore = function (dispatch, history, form) {
    let call;
    if (form.hasOwnProperty('seed') && form.seed.trim().split(' ').length == 20) {
        call = initApi.restoreSeedsApi({ path: form.create_filepath.trim(), password: form.create_password.trim(), nettype: NET_TYPE, seed: form.seeds });

    }
    else {
        call = initApi.restoreKeysApi({ path: form.create_filepath.trim(), password: form.create_password.trim(), nettype: NET_TYPE, address: form.address, spendkey: form.spend_private, viewkey: form.view_private });
    }
    call
        .then(processResponse)
        .then(jsonResponse)
        .then((create) => {
            if (create.status != 0) throw new Error(create.status);
            else {
                return accountsApi.openAccountsApi("primary")
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((open) => {
                        if (open.status != 0) throw new Error(open.status);
                        else {
                            return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                                .then(processResponse)
                                .then(jsonResponse)
                                .then((info) => {
                                    if (info.status != 0) throw new Error(info.status);
                                    else {
                                        return activeAccountApi.setActiveAccountApi({ account: info.result, type: 0 })
                                            .then(processResponse)
                                            .then(jsonResponse)
                                            .then((active) => {
                                                if (active.status != 0) throw new Error(active.status);
                                                else {
                                                    dispatch(addActiveAccount({ account: info.result, type: 0 }));
                                                    history.push("/w/home");
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

let addRestoreDataF = function (dispatch, data) {
    dispatch(addRestoreData(data));
}



// //legacy wizard
// let initLegacyWizardState = function (dispatch) {
//     dispatch(LWAction.resetLegacyWizardStep());
//     dispatch(LWAction.resetLegacyWizardData());
//     dispatch(LWAction.resetLegacyWizardErrors());
//     dispatch(LWAction.resetLegacyWizardTouched());
// }





// let addLegacyWizardData = function (dispatch, data) {
//     dispatch(LWAction.addLegacyWizardData(data));
// }

// let addLegacyWizardErrors = function (dispatch, data) {
//     dispatch(LWAction.addLegacyWizardErrors(data));
// }

// let addLegacyWizardTouched = function (dispatch, data) {
//     dispatch(LWAction.addLegacyWizardTouched(data));
//}
// let removeLegacyWizardData = function (dispatch, data = [], type = "data") {
//     data.forEach((x) => {
//         switch (type) {
//             case 'data':
//                 dispatch(LWAction.removeLegacyWizardData(x));
//                 break;
//             case "errors":
//                 dispatch(LWAction.removeLegacyWizardErrors(x));
//                 break;
//             case "touched":
//                 dispatch(LWAction.removeLegacyWizardTouched(x));
//                 break;
//             default:
//                 dispatch(LWAction.removeLegacyWizardData(x));
//                 break;
//         }

//     });
// }


// let legacyWizardBack = function (dispatch, props, callback = null, args = []) {
//     removeLegacyWizardData(dispatch, props, 'data');
//     removeLegacyWizardData(dispatch, props, 'errors');
//     removeLegacyWizardData(dispatch, props, 'touched');
//     dispatch(LWAction.removeLegacyWizardStep());
//     if (callback) {
//         callback(...args);
//     }
// }



//DIALOG FILE PICKERS

//common use for v8(default) and from legacy :: create
let chooseCreateFilepath = function (dispatch, options = null, type = "default", _touched = false, _errors = false) {
    dialog.showSaveDialog(options, (path) => {
        if (_touched) {
            type != "default" ? addWizardTouched(dispatch, { ..._touched, ...{ create_filepath: true } }, "legacy") : addWizardData(dispatch, { touched: { ..._touched, ...{ filepath: true } } }, "create");;
        }
        type != "default" ? addWizardData(dispatch, { create_filepath: path }, "legacy") : addWizardData(dispatch, { filepath: path }, "create");
        if (_errors) {
            let errors = { ..._errors };
            if (!path) {
                type != "default" ? errors.create_filepath = true : errors.filepath = true;
            }
            else {
                type != "default" ? errors.create_filepath = false : errors.filepath = false;
            }
            type != "default" ? addWizardErrors(dispatch, errors, "legacy") : addWizardData(dispatch, { errors: errors }, "create");

        }
    });
}

//common use for v8(default) and legacy :: open
let chooseWalletFile = function (dispatch, options = null, type = "default", _touched = false, _errors = false) {
    dialog.showOpenDialog(options, (files) => {
        if (_touched) {
            type != "default" ? addWizardTouched(dispatch, { ..._touched, ...{ legacy_filepath: true } }, "legacy") : addWizardTouched(dispatch, { ..._touched, ...{ filepath: true } }, "open");
        }
        if (files != undefined && files.length > 0) {
            type != "default" ? addWizardData(dispatch, { legacy_filepath: files[0] }, "legacy") : addWizardData(dispatch, { filepath: files[0] }, "open");

            if (_errors) {
                type != "default" ? addWizardErrors(dispatch, { ..._errors, ...{ legacy_filepath: false } }, "legacy") : addWizardErrors(dispatch, { ..._errors, ...{ filepath: false } }, "open");
            }
        }
        if (files == undefined) {
            if (_errors) {
                type != "default" ? addWizardErrors(dispatch, { ..._errors, ...{ legacy_filepath: true } }, "legacy") : addWizardErrors(dispatch, { ..._errors, ...{ filepath: true } }, "open");
            }
        }
    });
}



//@note al si ujebala ovo, trebalo je sve da bude jedan state 

//wizard 
let initWizardState = function (dispatch, component = "create") {
    switch (component) {
        case "create":
            dispatch(CWAction.resetCreateWizardStep());
            dispatch(CWAction.resetCreateWizardData());
            // dispatch(CWAction.resetCreateWizardErrors());
            // dispatch(CWAction.resetCreateWizardTouched());
            break;
        case "open":
            dispatch(OWAction.resetOpenWizardStep());
            dispatch(OWAction.resetOpenWizardData());
            dispatch(OWAction.resetOpenWizardErrors());
            dispatch(OWAction.resetOpenWizardTouched());
            break;
        case "legacy":
            dispatch(LWAction.resetLegacyWizardStep());
            dispatch(LWAction.resetLegacyWizardData());
            dispatch(LWAction.resetLegacyWizardErrors());
            dispatch(LWAction.resetLegacyWizardTouched());
            break;
        case "restore":
            dispatch(RWAction.resetRestoreWizardStep());
            dispatch(RWAction.resetRestoreWizardData());
            dispatch(RWAction.resetRestoreWizardErrors());
            dispatch(RWAction.resetRestoreWizardTouched());
            break;
        default:
            dispatch(CWAction.resetCreateWizardStep());
            dispatch(CWAction.resetCreateWizardData());
            // dispatch(CWAction.resetCreateWizardErrors());
            // dispatch(CWAction.resetCreateWizardTouched());
            break;

    }
}

let addWizardData = function (dispatch, data, component = "create") {
    switch (component) {
        case "create":
            dispatch(CWAction.addCreateWizardData(data));
            break;
        case "open":
            dispatch(OWAction.addOpenWizardData(data));
            break;
        case "legacy":
            dispatch(LWAction.addLegacyWizardData(data));
            break;
        case "restore":
            dispatch(RWAction.addRestoreWizardData(data));
            break;
        default:
            dispatch(CWAction.addCreateWizardData(data));
            break;

    }
}

let addWizardErrors = function (dispatch, data, component = "create") {
    switch (component) {
        case "create":
            // dispatch(CWAction.addCreateWizardErrors(data));
            break;
        case "open":
            dispatch(OWAction.addOpenWizardErrors(data));
            break;
        case "legacy":
            dispatch(LWAction.addLegacyWizardErrors(data));
            break;
        case "restore":
            dispatch(RWAction.addRestoreWizardErrors(data));
            break;
        default:
            // dispatch(CWAction.addCreateWizardErrors(data));
            break;

    }
}

let addWizardTouched = function (dispatch, data, component = "create") {
    switch (component) {
        case "create":
            // dispatch(CWAction.addCreateWizardTouched(data));
            break;
        case "open":
            dispatch(OWAction.addOpenWizardTouched(data));
            break;
        case "legacy":
            dispatch(LWAction.addLegacyWizardTouched(data));
            break;
        case "restore":
            dispatch(RWAction.addRestoreWizardTouched(data));
            break;
        default:
            // dispatch(CWAction.addCreateWizardTouched(data));
            break;

    }
}




let removeWizardData = function (dispatch, data = [], type = "data", component = "create") {
    data.forEach((x) => {
        switch (type) {
            case "data":
                switch (component) {
                    case "create":
                        dispatch(CWAction.removeCreateWizardData(x));
                        break;
                    case "open":
                        dispatch(OWAction.removeOpenWizardData(x));
                        break;
                    case "legacy":
                        dispatch(LWAction.removeLegacyWizardData(x));
                        break;
                    case "restore":
                        dispatch(RWAction.removeRestoreWizardData(x));
                        break;
                    default:
                        dispatch(CWAction.removeCreateWizardData(x));
                        break;

                }
                break;
            case "errors":
                switch (component) {
                    case "create":
                        // dispatch(CWAction.removeCreateWizardErrors(x));
                        break;
                    case "open":
                        dispatch(OWAction.removeOpenWizardErrors(x));
                        break;
                    case "legacy":
                        dispatch(LWAction.removeLegacyWizardErrors(x));
                        break;
                    case "restore":
                        dispatch(RWAction.removeRestoreWizardErrors(x));
                        break;
                    default:
                        // dispatch(CWAction.removeCreateWizardErrors(x));
                        break;

                }
                break;
            case "touched":
                switch (component) {
                    case "create":
                        // dispatch(CWAction.removeCreateWizardTouched(x));
                        break;
                    case "open":
                        dispatch(OWAction.removeOpenWizardTouched(x));
                        break;
                    case "legacy":
                        dispatch(LWAction.removeLegacyWizardTouched(x));
                        break;
                    case "restore":
                        dispatch(RWAction.removeRestoreWizardTouched(x));
                        break;
                    default:
                        // dispatch(CWAction.removeCreateWizardTouched(x));
                        break;

                }
                break;
            default:
                switch (component) {
                    case "create":
                        // dispatch(CWAction.removeCreateWizardData(x));
                        break;
                    case "open":
                        dispatch(OWAction.removeOpenWizardData(x));
                        break;
                    case "legacy":
                        dispatch(LWAction.removeLegacyWizardData(x));
                        break;
                    case "restore":
                        dispatch(RWAction.removeRestoreWizardData(x));
                        break;
                    default:
                        // dispatch(CWAction.removeCreateWizardData(x));
                        break;

                }
                break;
        }

    });
}

let wizardBack = function (dispatch, props, component = "create", callback = null, args = []) {
    removeWizardData(dispatch, props, 'data');
    removeWizardData(dispatch, props, 'errors');
    removeWizardData(dispatch, props, 'touched');
    switch (component) {
        case "create":
            dispatch(CWAction.removeCreateWizardStep());
            break;
        case "open":
            dispatch(OWAction.removeOpenWizardStep());
            break;
        case "legacy":
            dispatch(LWAction.removeLegacyWizardStep());
            break;
        case "restore":
            dispatch(RWAction.removeRestoreWizardStep());
            break;
        default:
            dispatch(CWAction.removeCreateWizardStep());
            break;
    }

    if (callback) {
        callback(...args);
    }
}

let wizardNext = function (dispatch, component = "create", callback = null, args = []) {
    switch (component) {
        case "create":
            dispatch(CWAction.addCreateWizardStep());
            break;
        case "open":
            dispatch(OWAction.addOpenWizardStep());
            break;
        case "legacy":
            dispatch(LWAction.addLegacyWizardStep());
            break;
        case "restore":
            dispatch(RWAction.addRestoreWizardStep());
            break;
        default:
            dispatch(CWAction.addCreateWizardStep());
            break;
    }

    if (callback) {
        callback(...args);
    }

}

let initWizardData = function (dispatch, data) {
    dispatch(RWAction.initRestoreWizardData(data));
}
let initWizardErrors = function (dispatch, data) {
    dispatch(RWAction.initRestoreWizardErrors(data));
}
let initWizardTouched= function (dispatch, data) {
    dispatch(RWAction.initRestoreWizardTouched(data));
}

let wizardFilepath = function (dispatch, options=null,){}



//open wizard 
// let initOpenWizardState = function (dispatch, component = "create") {
//     dispatch(OWAction.resetOpenWizardStep());
//     dispatch(OWAction.resetOpenWizardData());
//     dispatch(OWAction.resetOpenWizardErrors());
//     dispatch(OWAction.resetOpenWizardTouched());
// }

// let addOpenWizardData = function (dispatch, data) {
//     dispatch(OWAction.addOpenWizardData(data));
// }
// let addOpenWizardErrors = function (dispatch, data) {
//     dispatch(OWAction.addOpenWizardErrors(data));
// }
// let addOpenWizardTouched = function (dispatch, data) {
//     dispatch(OWAction.addOpenWizardTouched(data));
// }

// let removeOpenWizardData = function (dispatch, data = [], type = "data") {
//     data.forEach((x) => {
//         switch (type) {
//             case "data":
//                 dispatch(OWAction.removeOpenWizardData(x));
//             case "errors":
//                 dispatch(OWAction.removeOpenWizardErrors(x));
//             case "touched":
//                 dispatch(OWAction.removeOpenWizardTouched(x));
//             default:
//                 dispatch(OWAction.removeOpenWizardData(x));
//         }

//     });
// }



export {
    //files
    checkIfFileExists,
    setWalletExistsStatus,
    chooseCreateFilepath,
    chooseWalletFile,
    //create
    create,
    createLegacy,
    //open
    open,
    openLegacy,
    //restore
    addRestoreDataF,
    restore,
    //wizard
    initWizardState,
    addWizardData,
    addWizardErrors,
    addWizardTouched,
    removeWizardData,
    wizardBack,
    wizardNext,
    initWizardData,
    initWizardErrors,
    initWizardTouched

}