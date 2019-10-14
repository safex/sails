import { ADD_ACCOUNT, REMOVE_ACCOUNT, ADD_ACCOUNTS, REMOVE_ACCOUNTS } from '../actions/action.types';
let accountsReducer = function (state = {}, action) {
    switch (action.type) {
        case ADD_ACCOUNT:
            let stA = {};
            stA[action.item.account.account_name] = action.item;
            return { ...state, ...stA };
        case REMOVE_ACCOUNT:
            let stR = { ...state };
            delete stR[action.item]
            return stR;
        case ADD_ACCOUNTS:
            return { ...action.item };
        case REMOVE_ACCOUNTS:
            return {};
        default:
            return state
    }
}
export { accountsReducer }