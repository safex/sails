import {
    ACCOUNT_LABELS
} from '../actions/action.types';
let accountLabelsReducer = function (state = {}, action) {
    switch (action.type) {
        case ACCOUNT_LABELS:
            return action.item;
        default:
            return state
    }
}
export {
    accountLabelsReducer
}