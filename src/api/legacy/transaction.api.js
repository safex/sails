export let getHistoryApi = function (address) {
    return fetch('http://bitcoin.safex.io:3001/insight-api/addr/' + address + '/utxo');
}

export let getTransactions = function (address) {
    return fetch('http://bitcoin.safex.io:3001/insight-api/addr/' + address + '/utxo');
}

export let broadcastTransactions = function (rawtx) {
    return fetch('http://bitcoin.safex.io:3001/insight-api/tx/send', {
        method: "POST",
        body: JSON.stringify(rawtx)
    });
}

export let getFee = function () {
    return fetch("http://omni.safex.io:3001/getfee");
}