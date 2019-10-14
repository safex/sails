import {
    HOME_MODAL
} from '../actions/action.types';
let homeModalsReducer = function (state = { modal_seeds: false, modal_keys: false, modal_edit: false, modal_file: false, modal_new: false }, action) {
    switch (action.type) {
        case HOME_MODAL:
            return { ...state, ...action.item };
        default:
            return state
    }
}
export {
    homeModalsReducer
}