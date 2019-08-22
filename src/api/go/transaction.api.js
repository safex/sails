import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let getTransactionHistory = function () {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/transaction/history', { method: 'POST', body: JSON.stringify({}) });

}

let getTransactionInfo = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/store/put', { method: 'POST', body: JSON.stringify(obj) });
}
export {
    getTransactionHistory,
    getTransactionInfo
}