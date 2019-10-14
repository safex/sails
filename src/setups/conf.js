const path = window.require('path');
const os=window.require( 'os' );

const LEGACY_WALLET_FILENAME = 'safexwallet.dat';
const LEGACY_DEFAULT_WALLET_PATH = path.resolve(os.homedir(), LEGACY_WALLET_FILENAME);
const DEFAULT_LANGUAGE = 'en';
const LEGACY_DECRYPT_ALGORITHM = 'aes-256-ctr';
const NET_TYPE='testnet';

const DAEMON_PORT = 38001;
const DAEMON_HOST = '127.0.0.1';

const RPC_HOST = 'localhost';
const RPC_PORT = 2905;

export {
    DEFAULT_LANGUAGE,
    LEGACY_DEFAULT_WALLET_PATH,
    LEGACY_DECRYPT_ALGORITHM,
    NET_TYPE,
    DAEMON_PORT,
    DAEMON_HOST,
    RPC_PORT,
    RPC_HOST
}