import {
    ADD_LEGACY_ACCOUNT,
    REMOVE_LEGACY_ACCOUNT,
    ADD_LEGACY_ACCOUNTS,
    ADD_LEGACY_BALANCE,
    REMOVE_LEGACY_BALANCE,
    ADD_LEGACY_BTC_BALANCE,
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
    REPLACE_LEGACY_ACCOUNTS
} from '../actions/action.types';
let legacyAccountsReducer = function (state = {}, action) {
    let new_state = { ...state };
    let bal = 0;

    switch (action.type) {
        case ADD_LEGACY_ACCOUNT:
            new_state[action.item.public_key] = action.item;
            return new_state;
        case REMOVE_LEGACY_ACCOUNT:
            delete new_state[action.item]
            return new_state;
        case ADD_LEGACY_ACCOUNTS:
            let tmp = {};
            action.item.forEach(element => {
                let key = element.account_name || element.public_key;
                tmp[key] = { address: element.public_key, public_key: element.public_key, private_key: element.private_key, label: element.label, account_name: key }
            });
            console.log(tmp);
            return { ...tmp };
        case REPLACE_LEGACY_ACCOUNTS:
            return { ...action.item };
        case ADD_LEGACY_BALANCE:
            bal = parseInt(action.item.amount !== undefined ? action.item.amount : 0) + new_state[action.item.key].safex_bal;
            new_state[action.item.key] = { ...new_state[action.item.key], safex_bal: bal };
            return new_state;
        case ADD_LEGACY_BTC_BALANCE:
            bal = parseInt(action.item.amount !== undefined ? action.item.amount : 0) + new_state[action.item.key].btc_bal;
            new_state[action.item.key] = { ...new_state[action.item.key], btc_bal: bal };
            return new_state;
        case REMOVE_LEGACY_BALANCE:
            bal = new_state[action.item.key].safex_bal - parseInt(action.item.amount !== undefined ? action.item.amount : 0);
            new_state[action.item.key] = { ...new_state[action.item.key], safex_bal: bal };
            return new_state;
        case REMOVE_LEGACY_BTC_BALANCE:
            bal = new_state[action.item.key].btc_bal - parseInt(action.item.amount !== undefined ? action.item.amount : 0);
            new_state[action.item.key] = { ...new_state[action.item.key], btc_bal: bal };
            return new_state;
        case ADD_LEGACY_BALANCE_PENDING:
            bal = parseInt(action.item.amount !== undefined ? action.item.amount : 0) + new_state[action.item.key].pending_safex_bal;
            new_state[action.item.key] = { ...new_state[action.item.key], pending_safex_bal: bal };
            return new_state;
        case ADD_LEGACY_BTC_BALANCE_PENDING:
            bal = parseInt(action.item.amount !== undefined ? action.item.amount : 0) + new_state[action.item.key].pending_btc_bal;
            new_state[action.item.key] = { ...new_state[action.item.key], pending_btc_bal: bal };
            return new_state;
        case REMOVE_LEGACY_BALANCE_PENDING:
            bal = new_state[action.item.key].pending_safex_bal - parseInt(action.item.amount !== undefined ? action.item.amount : 0);
            new_state[action.item.key] = { ...new_state[action.item.key], pending_safex_bal: bal };
            return new_state;
        case REMOVE_LEGACY_BTC_BALANCE_PENDING:
            bal = new_state[action.item.key].pending_btc_bal - parseInt(action.item.amount !== undefined ? action.item.amount : 0);
            new_state[action.item.key] = { ...new_state[action.item.key], pending_btc_bal: bal };
            return new_state;
        case RESET_LEGACY_BALANCE:
            new_state[action.item] = { ...new_state[action.item], safex_bal: 0 }
            return new_state;
        case RESET_LEGACY_BTC_BALANCE:
            new_state[action.item] = { ...new_state[action.item], btc_bal: 0 }
            return new_state;
        case RESET_LEGACY_BALANCE_PENDING:
            new_state[action.item] = { ...new_state[action.item], pending_safex_bal: 0 }
            return new_state;
        case RESET_LEGACY_BTC_BALANCE_PENDING:
            new_state[action.item] = { ...new_state[action.item], pending_btc_bal: 0 }
            return new_state;
        case RESET_ALL_BALANCES:
            new_state[action.item] = { ...new_state[action.item], safex_bal: 0, btc_bal: 0, pending_safex_bal: 0, pending_btc_bal: 0 }
            return new_state;
        default:
            return state
    }
}
export { legacyAccountsReducer }