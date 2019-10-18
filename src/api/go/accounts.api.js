import { RPC_HOST, RPC_PORT } from '../../setups/conf';


let syncAccountsApi = function () {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/begin-updating', { method: 'POST', body: JSON.stringify({}) });
}
let openAccountsApi = function (name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/account/open', { method: 'POST', body: JSON.stringify({ name: name }) });
}
let infoAccountsApi = function (name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/account/info', { method: 'POST', body: JSON.stringify({ name: name }) });
}
let getAccountsInfoApi = function () {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/accounts/all-info', { method: 'GET', data: {} });
}
let createAccountApi = function (name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/accounts/create-new', { method: 'POST', body: JSON.stringify({ name: name }) });
}
let deleteAccountApi = function (name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/account/remove', { method: 'POST', body: JSON.stringify({ name: name }) });
}
let recoverAccountKeysApi = function (address, spendkey, viewkey, name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/accounts/create-keys', { method: 'POST', body: JSON.stringify({ address: address, spendkey: spendkey, viewkey: viewkey, name: name }) });
}
let recoverAccountSeedsApi = function (seed, name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/accounts/create-seed', { method: 'POST', body: JSON.stringify({ seed: seed, name: name }) });
}

let recoverAccountFileApi = function (file, password, name) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/accounts/create-keys-file', { method: 'POST', body: JSON.stringify({ keys_file_path: file, keys_file_password: password, name: name }) });
}

// let statusAccountApi = function (address) {
//     return fetch('http://'+RPC_HOST+':'+RPC_PORT+'/accounts/status', { method: 'POST', data: { address: address } });
// }
export {
    openAccountsApi,
    infoAccountsApi,
    getAccountsInfoApi,
    createAccountApi,
    deleteAccountApi,
    recoverAccountKeysApi,
    recoverAccountSeedsApi,
    // statusAccountApi,
    syncAccountsApi,
    recoverAccountFileApi

}