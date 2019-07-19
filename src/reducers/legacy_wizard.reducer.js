import {
    ADD_LEGACY_WIZARD_STEP,
    REMOVE_LEGACY_WIZARD_STEP,
    RESET_LEGACY_WIZARD_STEP,
    ADD_LEGACY_WIZARD_DATA,
    REMOVE_LEGACY_WIZARD_DATA,
    RESET_LEGACY_WIZARD_DATA,
    ADD_LEGACY_WIZARD_ERRORS,
    REMOVE_LEGACY_WIZARD_ERRORS,
    RESET_LEGACY_WIZARD_ERRORS,
    ADD_LEGACY_WIZARD_TOUCHED,
    REMOVE_LEGACY_WIZARD_TOUCHED,
    RESET_LEGACY_WIZARD_TOUCHED
} from '../actions/action.types';
let legacyWizardReducer = function (state = { step: 1, data: { keys_modal: false, legacy_filepath: '', legacy_password: '', create_filepath: '', create_password: '', create_confirm_password: '', create_wallet_name: '', validated: false }, errors: {}, touched: {} }, action) {
    switch (action.type) {
        case ADD_LEGACY_WIZARD_STEP:
            return { ...state, ...{ step: (state.step + 1) } }; //add upper limit
        case REMOVE_LEGACY_WIZARD_STEP:
            return { ...state, ...{ step: (state.step > 1 ? (state.step - 1) : 1) } };
        case RESET_LEGACY_WIZARD_STEP:
            return { ...state, ...{ step: 1 } };
        case ADD_LEGACY_WIZARD_DATA:
            return { ...state, ...{ data: { ...state.data, ...action.item } } };
        case REMOVE_LEGACY_WIZARD_DATA:
            let curr = state;
            curr.data.hasOwnProperty(action.item) && delete curr.data[action.item];
            return { ...curr };
        case RESET_LEGACY_WIZARD_DATA:
            return { ...state, ...{ data: { keys_modal: false, legacy_filepath: '', legacy_password: '', create_filepath: '', create_password: '', create_confirm_password: '', create_wallet_name: '', validated: false } } };
        case ADD_LEGACY_WIZARD_ERRORS:
            return { ...state, ...{ errors: { ...state.errors, ...action.item } } };
        case REMOVE_LEGACY_WIZARD_ERRORS:
            let err = state;
            err.errors.hasOwnProperty(action.item) && delete err.errors[action.item];
            return { ...err };
        case RESET_LEGACY_WIZARD_ERRORS:
            return { ...state, ...{ errors: {} } };
        case ADD_LEGACY_WIZARD_TOUCHED:
            return { ...state, ...{ touched: { ...state.touched, ...action.item } } };
        case REMOVE_LEGACY_WIZARD_TOUCHED:
            let touch = state;
            touch.touched.hasOwnProperty(action.item) && delete touch.touched[action.item];
            return { ...touch };
        case RESET_LEGACY_WIZARD_TOUCHED:
            return { ...state, ...{ touched: {} } };
        default:
            return state
    }
}
export { legacyWizardReducer }