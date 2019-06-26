const os = require('os');
const path = require('path');
const WALLET_FILENAME = 'safexwallet.dat';
const DEFAULT_WALLET_PATH = path.resolve(os.homedir(), WALLET_FILENAME);
module.exports.DEFAULT_WALLET_PATH=DEFAULT_WALLET_PATH;
module.exports.DEFAULT_LANGUAGE='en';