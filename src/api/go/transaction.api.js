import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let getTransactionHistory = function () {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/transaction/history', { method: 'POST', body: JSON.stringify({}) });

}

let getTransactionInfo = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/store/put', { method: 'POST', body: JSON.stringify(obj) });
}

let getBalanceApi = function () {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/balance/get');
}
export {
    getTransactionHistory,
    getTransactionInfo,
    getBalanceApi
}