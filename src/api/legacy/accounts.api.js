import {getStore, setStore} from './store.api';

let getAccountsApi= function(){
    return getStore('legacy_accounts');
}

let setAccountsApi = function(accounts) {
    return setStore({key:'legacy_accounts',value:accounts});
}


export {
    getAccountsApi,
    setAccountsApi
}