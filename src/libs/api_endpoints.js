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


//STORE
export const STORE_GET = BASE_PATH + '/store/get';
export const STORE_PUT = BASE_PATH + '/store/put';

/*
**********
LEGACY
**********
*/