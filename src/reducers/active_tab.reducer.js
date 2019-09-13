import { ADD_ACTIVE_TAB } from '../actions/action.types';

let activeTabReducer = function (state = "home", action) {
    switch (action.type) {
        case ADD_ACTIVE_TAB:
            return action.item;
        default:
            return state;
    }
}
export {
    activeTabReducer
}