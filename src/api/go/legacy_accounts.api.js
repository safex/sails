import { getStore, setStore } from './store.api';

let setLegacyAccountsApi = function (account) {
    return setStore({ key: 'legacy_accounts', value: JSON.stringify(account) });
}

let getLegacyAccountsApi = function () {
    return getStore('legacy_accounts');
}
export {
    setLegacyAccountsApi,
    getLegacyAccountsApi
}