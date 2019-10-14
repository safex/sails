import { getStore, setStore } from './store.api';

let setAccountLabelsApi = function (account_labels) {
    return setStore({ key: 'account_labels', value: JSON.stringify(account_labels) });
}

let getAccountLabelsApi = function () {
    return getStore('account_labels');
}
export {
    setAccountLabelsApi,
    getAccountLabelsApi
}