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
    RESET_ALL_BALANCES
} from '../actions/action.types';
let legacyAccountsReducer = function (state = {}, action) {
    let new_state = { ...state };
    switch (action.type) {
        case ADD_LEGACY_ACCOUNT:
            new_state[action.item.public_key] = action.item;
            return new_state;
        case REMOVE_LEGACY_ACCOUNT:
            delete new_state[action.item]
            return new_state;
        case ADD_LEGACY_ACCOUNTS:
            let accounts = action.item.reduce((acc, cur, i) => {
                acc[cur.public_key] = cur;
                return acc;
            }, {});
            return { ...state, ...accounts };
        case ADD_LEGACY_BALANCE:
            new_state[action.item.key] = { ...new_state[action.item.key], safex_bal: (action.item.amount + new_state[action.item.key].safex_bal) }
            return new_state;
        case ADD_LEGACY_BTC_BALANCE:
            new_state[action.item.key] = { ...new_state[action.item.key], btc_bal: (action.item.amount + new_state[action.item.key].btc_bal) }
            return new_state;
        case REMOVE_LEGACY_BALANCE:
            new_state[action.item.key] = { ...new_state[action.item.key], safex_bal: (action.item.amount - new_state[action.item.key].safex_bal) }
            return new_state;
        case REMOVE_LEGACY_BTC_BALANCE:
            new_state[action.item.key] = { ...new_state[action.item.key], btc_bal: (action.item.amount - new_state[action.item.key].btc_bal) }
            return new_state;
        case ADD_LEGACY_BALANCE_PENDING:
            new_state[action.item.key] = { ...new_state[action.item.key], pending_safex_bal: (action.item.amount + new_state[action.item.key].pending_safex_bal) }
            return new_state;
        case ADD_LEGACY_BTC_BALANCE_PENDING:
            new_state[action.item.key] = { ...new_state[action.item.key], pending_btc_bal: (action.item.amount + new_state[action.item.key].pending_btc_bal) }
            return new_state;
        case REMOVE_LEGACY_BALANCE_PENDING:
            new_state[action.item.key] = { ...new_state[action.item.key], pending_safex_bal: (action.item.amount - new_state[action.item.key].pending_safex_bal) }
            return new_state;
        case REMOVE_LEGACY_BTC_BALANCE_PENDING:
            new_state[action.item.key] = { ...new_state[action.item.key], pending_btc_bal: (action.item.amount - new_state[action.item.key].pending_btc_bal) }
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
        case RESET_ALL_BALANCES:
            new_state[action.item] = { ...new_state[action.item], safex_bal: 0, btc_bal: 0, pending_safex_bal: 0, pending_btc_bal: 0 }
            return new_state;
        default:
            return state
    }
}
export { legacyAccountsReducer }