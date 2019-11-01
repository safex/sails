import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let getTransactionHistory = function () {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/transaction/history', { method: 'POST', body: JSON.stringify({}) });

}

let getTransactionInfo = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/store/put', { method: 'POST', body: JSON.stringify(obj) });
}

let sendCashApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/transaction/send-cash', { method: 'POST', body: JSON.stringify(obj) });
}
let sendTokenApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/transaction/send-token', { method: 'POST', body: JSON.stringify(obj) });
}
//change when Edo add this, for now like this
let commitTransactionApi = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/transaction/send-commit', { method: 'POST', body: JSON.stringify(obj) });
}

let getBalanceApi = function () {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/balance/get');
}
export {
    getTransactionHistory,
    getTransactionInfo,
    getBalanceApi,
    sendCashApi,
    sendTokenApi,
    commitTransactionApi
}