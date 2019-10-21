export const getBTCPriceApi = function () {
    return fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
}

export const getBTCSAFEXApi = function () {
    return fetch('https://app.xcalibra.com/api/public/v1/tickers/SFT_BTC');
}

