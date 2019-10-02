//app reset
const RESET_APP = 'RESET_APP';

//accounts
const ADD_ACCOUNT = "ADD_ACCOUNT";
const ADD_ACCOUNTS = "ADD_ACCOUNTS";
const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";
const REMOVE_ACCOUNTS = "REMOVE_ACCOUNTS";

//legacy account
const ADD_LEGACY_ACCOUNT = "ADD_LEGACY_ACCOUNT";
const ADD_LEGACY_ACCOUNTS = "ADD_LEGACY_ACCOUNTS";
const REMOVE_LEGACY_ACCOUNT = "REMOVE_LEGACY_ACCOUNT";

//active_account
const ADD_ACTIVE_ACCOUNT = "ADD_ACTIVE_ACCOUNT";

//wallet_exists
const WALLET_EXISTS = "WALLET_EXISTS";

//legacy_wallet
const ADD_LEGACY_WALLET = 'ADD_LEGACY_WALLET';
const REMOVE_LEGACY_WALLET = 'REMOVE_LEGACY_WALLET';
const ADD_LEGACY_BALANCE = "ADD_LEGACY_BALANCE";
const REMOVE_LEGACY_BALANCE = "REMOVE_LEGACY_BALANCE";
const ADD_LEGACY_BTC_BALANCE = "ADD_LEGACY_BTC_BALANCE";
const REMOVE_LEGACY_BTC_BALANCE = "REMOVE_LEGACY_BTC_BALANCE";
const ADD_LEGACY_BALANCE_PENDING = "ADD_LEGACY_BALANCE_PENDING";
const REMOVE_LEGACY_BALANCE_PENDING = "REMOVE_LEGACY_BALANCE_PENDING";
const ADD_LEGACY_BTC_BALANCE_PENDING = "ADD_LEGACY_BTC_BALANCE_PENDING";
const REMOVE_LEGACY_BTC_BALANCE_PENDING = "REMOVE_LEGACY_BTC_BALANCE_PENDING";
const RESET_LEGACY_BALANCE = "RESET_LEGACY_BALANCE";
const RESET_LEGACY_BTC_BALANCE = "RESET_LEGACY_BTC_BALANCE";
const RESET_LEGACY_BALANCE_PENDING = "RESET_LEGACY_BALANCE_PENDING";
const RESET_LEGACY_BTC_BALANCE_PENDING = "RESET_LEGACY_BTC_BALANCE_PENDING";
const RESET_ALL_BALANCES = "RESET_ALL_BALANCES";
const REPLACE_LEGACY_KEY = "REPLACE_LEGACY_KEY";
const REPLACE_LEGACY_ACCOUNTS = "REPLACE_LEGACY_ACCOUNTS";


//wizard
const ADD_WIZARD_STEP = "ADD_WIZARD_STEP";
const REMOVE_WIZARD_STEP = "REMOVE_WIZARD_STEP";
const RESET_WIZARD_STEP = "RESET_WIZARD_STEP";
const ADD_WIZARD_DATA = "ADD_WIZARD_DATA";
const REMOVE_WIZARD_DATA = "REMOVE_WIZARD_DATA";
const RESET_WIZARD_DATA = "RESET_WIZARD_DATA";
const ADD_WIZARD_ERRORS = "ADD_WIZARD_ERRORS";
const REMOVE_WIZARD_ERRORS = "REMOVE_WIZARD_ERRORS";
const RESET_WIZARD_ERRORS = "RESET_WIZARD_ERRORS";
const ADD_WIZARD_TOUCHED = "ADD_WIZARD_TOUCHED";
const REMOVE_WIZARD_TOUCHED = "REMOVE_WIZARD_TOUCHED";
const RESET_WIZARD_TOUCHED = "RESET_WIZARD_TOUCHED";

const INIT_WIZARD_DATA = "INIT_WIZARD_DATA";
const INIT_WIZARD_ERRORS = "INIT_WIZARD_ERRORS";
const INIT_WIZARD_TOUCHED = "INIT_WIZARD_TOUCHED";

//error
const ADD_ERROR = "ADD_ERROR";
const REMOVE_ERROR = "REMOVE_ERROR";

//language
const CHANGE_LANG = "CHANGE_LANG";

//contacts
const ADD_CONTACTS = "ADD_CONTACTS";
const ADD_CONTACT = "ADD_CONTACT";
const REMOVE_CONTACT = "REMOVE_CONTACT";
const RESET_NEW_CONTACT = "INIT_NEW_CONTACT";
const ADD_NEW_CONTACT = "ADD_NEW_CONTACT";
const ADD_CONTACT_COUNTER = "ADD_CONTACT_COUNTER";
const ADD_CONTACT_TOUCHED = "ADD_CONTACT_TOUCHED";
const ADD_CONTACT_ERROR = "ADD_CONTACT_ERROR";


//home-history
const ADD_ACCOUNT_HISTORY = "ADD_ACCOUNT_HISTORY";
const RESET_ACCOUNT_HISTORY = "RESET_ACCOUNT_HISTORY";

const HOME_MODAL = "HOME_MODAL";
const ACCOUNT_LABELS = "ACCOUNT_LABELS";

const ADD_DAEMON_HOST = "ADD_DAEMON_HOST";
const ADD_DAEMON_PORT = "ADD_DAEMON_PORT";
const ADD_DAEMON_MODAL = "ADD_DAEMON_MODAL";

const ADD_ACTIVE_TAB = "ADD_ACTIVE_TAB";
const RPC_PORT = "RPC_PORT";


export {
    RESET_APP,
    ADD_ACCOUNT,
    ADD_ACCOUNTS,
    REMOVE_ACCOUNT,
    REMOVE_ACCOUNTS,
    ADD_ACTIVE_TAB,

    //legacy
    ADD_LEGACY_ACCOUNT,
    ADD_LEGACY_ACCOUNTS,
    REMOVE_LEGACY_ACCOUNT,
    ADD_LEGACY_BALANCE,
    REPLACE_LEGACY_KEY,
    ADD_LEGACY_BTC_BALANCE,
    REMOVE_LEGACY_BALANCE,
    REMOVE_LEGACY_BTC_BALANCE,
    ADD_LEGACY_BALANCE_PENDING,
    REMOVE_LEGACY_BALANCE_PENDING,
    ADD_LEGACY_BTC_BALANCE_PENDING,
    REMOVE_LEGACY_BTC_BALANCE_PENDING,
    RESET_LEGACY_BALANCE,
    RESET_LEGACY_BTC_BALANCE,
    RESET_LEGACY_BALANCE_PENDING,
    RESET_LEGACY_BTC_BALANCE_PENDING,
    RESET_ALL_BALANCES,
    REPLACE_LEGACY_ACCOUNTS,

    ADD_ACTIVE_ACCOUNT,
    WALLET_EXISTS,
    ADD_LEGACY_WALLET,
    REMOVE_LEGACY_WALLET,
    //errors
    ADD_ERROR,
    REMOVE_ERROR,
    CHANGE_LANG,

    //wizard
    ADD_WIZARD_STEP,
    REMOVE_WIZARD_STEP,
    RESET_WIZARD_STEP,
    ADD_WIZARD_DATA,
    REMOVE_WIZARD_DATA,
    RESET_WIZARD_DATA,
    ADD_WIZARD_ERRORS,
    REMOVE_WIZARD_ERRORS,
    RESET_WIZARD_ERRORS,
    ADD_WIZARD_TOUCHED,
    REMOVE_WIZARD_TOUCHED,
    RESET_WIZARD_TOUCHED,

    INIT_WIZARD_DATA,
    INIT_WIZARD_ERRORS,
    INIT_WIZARD_TOUCHED,

    //contacts
    ADD_CONTACTS,
    ADD_CONTACT,
    REMOVE_CONTACT,
    RESET_NEW_CONTACT,
    ADD_NEW_CONTACT,
    ADD_CONTACT_COUNTER,
    ADD_CONTACT_TOUCHED,
    ADD_CONTACT_ERROR,

    //home - history
    ADD_ACCOUNT_HISTORY,
    RESET_ACCOUNT_HISTORY,

    HOME_MODAL,
    ACCOUNT_LABELS,

    //daemon
    ADD_DAEMON_HOST,
    ADD_DAEMON_PORT,
    ADD_DAEMON_MODAL,
    RPC_PORT
}