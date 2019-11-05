export let getHistoryApi = function (address) {
    return fetch("http://bitcoin.safex.io:3001/insight-api/txs/?address=" + address);
}

export let getHistoryOmniApi = function (address) {
    let formData = new FormData();
    formData.append('addr', address);
    return fetch('https://api.omniexplorer.info/v1/transaction/address/0', {
        method: "POST",
        body: formData
    });
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