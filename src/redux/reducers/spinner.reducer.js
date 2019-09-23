import {
    SPINNER_START,
    SPINNER_END
} from '../actions/action.types';
let spinnerReducer = function (state = false, action) {
    switch (action.type) {
        case SPINNER_START:
            return true;
        case SPINNER_END:
            return false;
        default:
            return state
    }
}
export {
    spinnerReducer
}