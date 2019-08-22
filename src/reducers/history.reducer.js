import {
    ADD_ACCOUNT_HISTORY,
    RESET_ACCOUNT_HISTORY
} from '../actions/action.types';
let historyReducer = function (state = {}, action) {
    switch (action.type) {
        case ADD_ACCOUNT_HISTORY:
            return action.item;
        case RESET_ACCOUNT_HISTORY:
            return {};
        default:
            return state
    }
}
export {
    historyReducer
}