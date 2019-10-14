import {getStore, setStore} from './store.api';

let setActiveAccountApi= function(account){
    return setStore({key:'active_account',value:JSON.stringify(account)});
}

let getActiveAccountApi= function(){
    return getStore('active_account');
}
export {
    setActiveAccountApi,
    getActiveAccountApi
}
