import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let syncAccountsApi = function () {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/begin-updating', { method: 'POST', body: JSON.stringify({}) });
}
let openAccountsApi = function (name) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/account/open', { method: 'POST', body: JSON.stringify({ name: name }) });
}
let infoAccountsApi = function (name) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/account/info', { method: 'POST', body: JSON.stringify({ name: name }) });
}
let getAccountsInfoApi = function () {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/accounts/all-info', { method: 'GET', data: {} });
}
let createAccountApi = function (name) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/accounts/create-new', { method: 'POST', body: JSON.stringify({ name: name }) });
}
// let deleteAccountApi = function (address) {
//     return fetch('http://'+RPC_HOST+':'+RPC_PORT+'/accounts/delete', { method: 'POST', data: { address: address } });
// }
let recoverAccountKeysApi = function (address, spendkey, viewkey, name) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/accounts/create-keys', { method: 'POST', body: JSON.stringify({ address: address, spendkey: spendkey, viewkey: viewkey, name: name }) });
}
let recoverAccountSeedsApi = function (seed, name) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/accounts/create-seed', { method: 'POST', body: JSON.stringify({ seed: seed, name: name }) });
}

let recoverAccountFileApi = function (file, password, name) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/accounts/create-keys-file', { method: 'POST', body: JSON.stringify({ keys_file_path: file, keys_file_password: password, name: name }) });
}

// let statusAccountApi = function (address) {
//     return fetch('http://'+RPC_HOST+':'+RPC_PORT+'/accounts/status', { method: 'POST', data: { address: address } });
// }
export {
    openAccountsApi,
    infoAccountsApi,
    getAccountsInfoApi,
    createAccountApi,
    //  deleteAccountApi,
    recoverAccountKeysApi,
    recoverAccountSeedsApi,
    // statusAccountApi,
    syncAccountsApi,
    recoverAccountFileApi

}