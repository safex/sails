export let getHistoryApi = function (address){
    return fetch('http://bitcoin.safex.io:3001/insight-api/addr/' + address + '/utxo');
}

