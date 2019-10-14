import {getStore, setStore} from './store.api';

let setContactsApi= function(contacts){
    return setStore({key:'contacts',value:JSON.stringify(contacts)});
}

let getContactsApi= function(){
    return getStore('contacts');
}

let setContactsCounterApi= function(id){
    return setStore({key:'contact_counter',value:JSON.stringify(id)});
}

let getContactsCounterApi= function(){
    return getStore('contact_counter');
}
export {
    setContactsApi,
    getContactsApi,
    setContactsCounterApi,
    getContactsCounterApi
}