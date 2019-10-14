import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let getStore = function (key) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/store/get', { method: 'POST', body: JSON.stringify({ key: key }) });

}

let setStore = function (obj) {
    return fetch('http://' + RPC_HOST + ':' + RPC_PORT + '/store/put', { method: 'POST', body: JSON.stringify(obj) });
}
export {
    getStore,
    setStore
}