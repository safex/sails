import {
    ADD_LEGACY_ACCOUNT,
    REMOVE_LEGACY_ACCOUNT,
    ADD_LEGACY_ACCOUNTS,
    ADD_LEGACY_BALANCE,
    ADD_LEGACY_BTC_BALANCE,
    REMOVE_LEGACY_BALANCE,
    REMOVE_LEGACY_BTC_BALANCE,
    ADD_LEGACY_BALANCE_PENDING,
    ADD_LEGACY_BTC_BALANCE_PENDING,
    REMOVE_LEGACY_BALANCE_PENDING,
    REMOVE_LEGACY_BTC_BALANCE_PENDING,
    RESET_LEGACY_BALANCE,
    RESET_LEGACY_BALANCE_PENDING,
    RESET_LEGACY_BTC_BALANCE,
    RESET_LEGACY_BTC_BALANCE_PENDING,
    RESET_ALL_BALANCES,
    REPLACE_LEGACY_KEY,
    REPLACE_LEGACY_ACCOUNTS
} from './action.types';

let addLegacyAccount = function (account) {
    return {
        type: ADD_LEGACY_ACCOUNT,
        item: account
    }
}
let removeLegacyAccount = function (account) {
    return {
        type: REMOVE_LEGACY_ACCOUNT,
        item: account
    }
}
let addLegacyAccounts = function (accounts) {
    return {
        type: ADD_LEGACY_ACCOUNTS,
        item: accounts
    }
}
let addLegacyBalance = function (key, amount) {
    return {
        type: ADD_LEGACY_BALANCE,
        item: { key: key, amount: amount }
    };
}
let addLegacyBTCBalance = function (key, amount) {
    return {
        type: ADD_LEGACY_BTC_BALANCE,
        item: { key: key, amount: amount }
    };
}
let removeLegacyBalance = function (key, amount) {
    return {
        type: REMOVE_LEGACY_BALANCE,
        item: { key: key, amount: amount }
    };
}
let removeLegacyBTCBalance = function (key, amount) {
    return {
        type: REMOVE_LEGACY_BTC_BALANCE,
        item: { key: key, amount: amount }
    };
}
let addLegacyBalancePending = function (key, amount) {
    return {
        type: ADD_LEGACY_BALANCE_PENDING,
        item: { key: key, amount: amount }
    };
}
let addLegacyBTCBalancePending = function (key, amount) {
    return {
        type: ADD_LEGACY_BTC_BALANCE_PENDING,
        item: { key: key, amount: amount }
    };
}
let removeLegacyBalancePending = function (key, amount) {
    return {
        type: REMOVE_LEGACY_BALANCE_PENDING,
        item: { key: key, amount: amount }
    };
}
let removeLegacyBTCBalancePending = function (key, amount) {
    return {
        type: REMOVE_LEGACY_BTC_BALANCE_PENDING,
        item: { key: key, amount: amount }
    };
}

let resetLegacyBalance = function (key) {
    return {
        type: RESET_LEGACY_BALANCE,
        item: key
    };
}
let resetLegacyBTCBalance = function (key) {
    return {
        type: RESET_LEGACY_BTC_BALANCE,
        item: key
    };
}
let resetLegacyBalancePending = function (key) {
    return {
        type: RESET_LEGACY_BALANCE_PENDING,
        item: key
    };
}
let resetLegacyBTCBalancePending = function (key) {
    return {
        type: RESET_LEGACY_BTC_BALANCE_PENDING,
        item: key
    };
}

let resetAllBalances = function (key) {
    return {
        type: RESET_ALL_BALANCES,
        item: key
    };
}

let replaceLegacyKey = function (new_key) {
    return {
        type: REPLACE_LEGACY_KEY,
        item: new_key
    };
}

let replaceLegacyAccounts = function (accounts) {
    return {
        type: REPLACE_LEGACY_ACCOUNTS,
        item: accounts
    }
}

export {
    addLegacyAccount,
    removeLegacyAccount,
    addLegacyAccounts,
    addLegacyBalance,
    addLegacyBTCBalance,
    removeLegacyBalance,
    removeLegacyBTCBalance,
    addLegacyBalancePending,
    addLegacyBTCBalancePending,
    removeLegacyBalancePending,
    removeLegacyBTCBalancePending,
    resetLegacyBalance,
    resetLegacyBTCBalance,
    resetLegacyBalancePending,
    resetLegacyBTCBalancePending,
    resetAllBalances,
    replaceLegacyKey,
    replaceLegacyAccounts
}