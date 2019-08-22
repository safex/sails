import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let createApi = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/init/create', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}

let openApi = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/init/open', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}

let restoreSeedsApi = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/init/recover-seed', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}

let restoreKeysApi = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/init/recover-keys', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}
let closeApi = function () {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/close', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
}

export {
    createApi,
    openApi,
    restoreSeedsApi,
    restoreKeysApi,
    closeApi
}