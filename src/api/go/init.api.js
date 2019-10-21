import { RPC_HOST, RPC_PORT, NET_TYPE, DAEMON_HOST, DAEMON_PORT } from '../../setups/conf';


let createApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/init/create', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}

let openApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/init/open', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}

let restoreSeedsApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/init/recover-seed', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}

let restoreKeysApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/init/recover-keys', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
}
let closeApi = function () {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/close', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
}

let connectToDaemonApi = function (daemon) {
    let daemon_host = daemon.host || DAEMON_HOST;
    let daemon_port = daemon.port || DAEMON_PORT;
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/init/connect', { method: 'POST', body: JSON.stringify({ daemon_host: daemon_host, daemon_port: daemon_port, nettype: NET_TYPE }), headers: { 'Content-Type': 'application/json' } });
}

export {
    createApi,
    openApi,
    restoreSeedsApi,
    restoreKeysApi,
    closeApi,
    connectToDaemonApi
}