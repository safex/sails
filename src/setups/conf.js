const path = window.require('path');
const os=window.require( 'os' );

const LEGACY_WALLET_FILENAME = 'safexwallet.dat';
const LEGACY_DEFAULT_WALLET_PATH = path.resolve(os.homedir(), LEGACY_WALLET_FILENAME);
const DEFAULT_LANGUAGE = 'en';
const LEGACY_DECRYPT_ALGORITHM = 'aes-256-ctr';
const NET_TYPE='mainnet';

export {
    DEFAULT_LANGUAGE,
    LEGACY_DEFAULT_WALLET_PATH,
    LEGACY_DECRYPT_ALGORITHM,
    NET_TYPE
}