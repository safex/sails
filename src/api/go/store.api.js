import { RPC_HOST, RPC_PORT } from '../../setups/conf';

let getStore = function (key) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/store/get', { method: 'POST', body: JSON.stringify({ key: key }) });

}

let setStore = function (obj) {
    let port = localStorage.getItem("port") || RPC_PORT;
    return fetch('http://' + RPC_HOST + ':' + port + '/store/put', { method: 'POST', body: JSON.stringify(obj) });
}
export {
    getStore,
    setStore
}