let getBalanceApi = function (address) {
    return fetch('http://omni.safex.io:3001/balance', {
        method: "POST",
        body: JSON.stringify({ address: address })
    });
}

let getBTCBalanceApi = function (address) {
    return fetch('http://bitcoin.safex.io:3001/insight-api/addr/' + address + '/balance');
}

let getBTCBalancePendingApi = function (address) {
    return fetch('http://bitcoin.safex.io:3001/insight-api/addr/' + address + '/unconfirmedBalance');
}


export {
    getBalanceApi,
    getBTCBalanceApi,
    getBTCBalancePendingApi
}