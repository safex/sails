import { RPC_HOST, RPC_PORT } from '../setups/conf';

/* 
*** TO BE FINISHED!!! ***
*/
export const BASE_PATH = 'http://' + RPC_HOST + ':' + RPC_PORT;
/*
**********
GOSAFEX
**********
*/


//INIT
export const INIT_CREATE = BASE_PATH + '/init/create';
export const INIT_OPEN = BASE_PATH + '/init/open';
export const INIT_RESTORE_SEEDS = BASE_PATH + '/init/recover-seed';
export const INIT_RESTORE_KEYS = BASE_PATH + '/init/recover-keys';
export const INIT_CLOSE = BASE_PATH + '/close';

//ACCOUNT
export const ACCOUNT_OPEN = BASE_PATH + '/account/open';
export const ACCOUNT_INFO = BASE_PATH + '/account/info';
export const ACCOUNT_REMOVE = BASE_PATH + '/account/remove';
export const ACCOUNT_RESCAN = BASE_PATH + '/account/rescan';

//ACCOUNTS
export const ACCOUNTS_ALL_INFO = BASE_PATH + '/accounts/all-info';
export const ACCOUNTS_CREATE_NEW = BASE_PATH + '/accounts/create-new';
export const ACCOUNTS_CREATE_KEYS = BASE_PATH + '/accounts/create-keys';
export const ACCOUNTS_CREATE_SEED = BASE_PATH + '/accounts/create-seed';
export const ACCOUNTS_KEYS_FILE = BASE_PATH + '/accounts/create-keys-file';

//BALANCE
export const BALANCE = BASE_PATH + '/balance/get';

//STORE
export const STORE_GET = BASE_PATH + '/store/get';
export const STORE_PUT = BASE_PATH + '/store/put';

//MISC
export const STATUS = BASE_PATH + '/status';
export const BEGIN_UPDATING = BASE_PATH + '/begin-updating';
export const STOP_UPDATING = BASE_PATH + '/stop-updating';
export const LATEST_HEIGHT = BASE_PATH + '/latest-block-number';

/*
**********
LEGACY
**********
*/