//actions
const { addWalletExistsStatus } = require('../actions/wallet_exists.action.js');
const { addLegacyWallet } = require('../actions/legacy_wallet.action');
const LWAction = require('../actions/legacy_wizard.action');
const CWAction = require('../actions/create_wizard.action');
const {addActiveAccount} = require('../actions/active_account.action');
const {addOpenData} = require('../actions/open.action');
const {addRestoreData} = require('../actions/restore.action');

//libs
let { checkFileForFlags, readFilePromise, decryptContent } = require("../libs/legacy_wallet");
let { processResponse, jsonResponse, errorResponse } = require('../libs/response');

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
    initApi.createApi({ path: form.filepath, password: form.password, name: form.wallet_name, nettype: NET_TYPE})
    .then(processResponse)
    .then(jsonResponse)
    .then((create)=>{
        if(create.status!=0) throw new Error(create.status);
        else {
            return accountsApi.openAccountsApi(create.result.accounts[0])
            .then(processResponse)
            .then(jsonResponse)
            .then((open)=>{
                if(open.status!=0) throw new Error(open.status);
                else {
                    return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((info)=>{
                        if(info.status!=0) throw new Error(info.status);
                        else {
                            return activeAccountApi.setActiveAccountApi({account:info.result, type:0})
                            .then(processResponse)
                            .then(jsonResponse)
                            .then((active)=>{
                                if(active.status!=0) throw new Error(active.status);
                                else{
                                    dispatch(addActiveAccount({account:info.result, type:0}));
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



let createLegacy = function (dispatch, form, legacy) {

    initApi.createApi({ path: form.create_filepath, password: form.create_password, name: form.create_wallet_name, nettype: NET_TYPE })
    .then(processResponse)
    .then(jsonResponse)
    .then((create)=>{
        if(create.status!=0) throw new Error(create.status);
        else {
            return accountsApi.openAccountsApi(create.result.accounts[0])
            .then(processResponse)
            .then(jsonResponse)
            .then((open)=>{
                if(open.status!=0) throw new Error(open.status);
                else {
                    console.log(create.result.accounts[0]);
                    return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                    .then(processResponse)
                    .then(jsonResponse)
                    .then((info)=>{
                        if(info.status!=0) throw new Error(info.status);
                        else {
                            return activeAccountApi.setActiveAccountApi({account:info.result, type:0})
                            .then(processResponse)
                            .then(jsonResponse)
                            .then((active)=>{
                                if(active.status!=0) throw new Error(active.status);
                                else{
                                    dispatch(addActiveAccount({account:info.result, type:0}));
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

let open = function (history, form) {
    initApi.openApi({ path: form.filepath.trim(), password: form.password.trim(), nettype: NET_TYPE })
    .then(processResponse)
    .then(jsonResponse)
    .then((open)=>{
        if(open.status!=0) throw new Error(open.status);
        else {
            history.push('/w/home');
        }
    })
    .catch(errorResponse);
}

let openLegacy = function (dispatch, form) {
    readFilePromise(form.legacy_filepath.trim())
    .then((data) => { return decryptContent(data, form.legacy_password.trim()) })
    .then((content) => { dispatch(addLegacyWallet(content));})
    .catch((error) => { throw new Error(error) });
}


let addOpenFData= function (dispatch, data){
    dispatch(addOpenData(data));
}

//restore

let restore = function(dispatch, history, form){
    let call;
    if(form.hasOwnProperty('seed') && form.seed.trim().split(' ').length==20){
        call=initApi.restoreSeedsApi({ path: form.create_filepath.trim(), password: form.create_password.trim(), nettype: NET_TYPE, seed:form.seeds});
       
    }
    else {
        call=initApi.restoreKeysApi({ path: form.create_filepath.trim(), password: form.create_password.trim(), nettype: NET_TYPE, address:form.address, spendkey:form.spend_private, viewkey:form.view_private});
    }
    call
    .then(processResponse)
    .then(jsonResponse)
    .then((create)=>{
    if(create.status!=0) throw new Error(create.status);
    else {
        return accountsApi.openAccountsApi(create.result.accounts[0])
        .then(processResponse)
        .then(jsonResponse)
        .then((open)=>{
            if(open.status!=0) throw new Error(open.status);
            else {
                console.log(create.result.accounts[0]);
                return accountsApi.infoAccountsApi("primary") //izmeniti kad Steva upgrade
                .then(processResponse)
                .then(jsonResponse)
                .then((info)=>{
                    if(info.status!=0) throw new Error(info.status);
                    else {
                        return activeAccountApi.setActiveAccountApi({account:info.result, type:0})
                        .then(processResponse)
                        .then(jsonResponse)
                        .then((active)=>{
                            if(active.status!=0) throw new Error(active.status);
                            else{
                                dispatch(addActiveAccount({account:info.result, type:0}));
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

let addRestoreDataF= function (dispatch, data){
    dispatch(addRestoreData(data));
}



//legacy wizard
let initLegacyWizardState = function (dispatch) {
    dispatch(LWAction.resetLegacyWizardStep());
    dispatch(LWAction.resetLegacyWizardData());
}





let addLegacyWizardData= function (dispatch, data){
    dispatch(LWAction.addLegacyWizardData(data));
}

let removeLegacyWizardData = function (dispatch, data=[]){
    data.forEach((x)=>{
        dispatch(LWAction.removeLegacyWizardData(x));
    });
}


let legacyWizardBack = function(dispatch, props, callback=null, args=[]){
    removeLegacyWizardData(dispatch,props);
    dispatch(LWAction.removeLegacyWizardStep());
    if(callback){
        callback(...args);
    }
}
let legacyWizardNext = function(dispatch, callback=null, args=[]){
    dispatch(LWAction.addLegacyWizardStep());
    if(callback){
        callback(...args);
    }

}


//DIALOG FILE PICKERS

//common use for v8(default) and from legacy :: create
let chooseCreateFilepath = function (dispatch, options = null, type = "default") {
    dialog.showSaveDialog(options, (path) => {
        type != "default" ? addLegacyWizardData(dispatch,{ create_filepath: path }) : addCreateWizardData(dispatch,{ filepath: path });

    });
}

//common use for v8(default) and legacy :: open
let chooseWalletFile = function (dispatch, options = null, type="default") {
    dialog.showOpenDialog(options, (files) => {
        if (files != undefined && files.length > 0) {
            type != "default" ? addLegacyWizardData(dispatch,{legacy_filepath: files[0] }) : addOpenFData(dispatch,{filepath: files[0] });
        }
    });
}





//create wizard 
let initCreateWizardState = function (dispatch) {
    dispatch(CWAction.resetCreateWizardStep());
    dispatch(CWAction.resetCreateWizardData());
}

let addCreateWizardData = function (dispatch, data){
    dispatch(CWAction.addCreateWizardData(data));
}

let removeCreateWizardData = function (dispatch, data=[]){
    data.forEach((x)=>{
        dispatch(CWAction.removeCreateWizardData(x));
    });
}

let createWizardBack = function(dispatch, props, callback=null, args=[]){
    removeCreateWizardData(dispatch,props);
    dispatch(CWAction.removeCreateWizardStep());
    if(callback){
        callback(...args);
    }
}
let createWizardNext = function(dispatch, callback=null, args=[]){
    dispatch(CWAction.addCreateWizardStep());
    if(callback){
        callback(...args);
    }

}

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
    addOpenFData,
    //restore
    addRestoreDataF,
    restore,
    

    //legacy wizard
    initLegacyWizardState,
    addLegacyWizardData,
    legacyWizardBack,
    legacyWizardNext,
    //create wizard
    initCreateWizardState,
    addCreateWizardData,
    removeCreateWizardData,
    createWizardBack,
    createWizardNext
    
}