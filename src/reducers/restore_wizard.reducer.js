import {
    ADD_RESTORE_WIZARD_STEP,
    REMOVE_RESTORE_WIZARD_STEP,
    RESET_RESTORE_WIZARD_STEP,
    ADD_RESTORE_WIZARD_DATA,
    REMOVE_RESTORE_WIZARD_DATA,
    RESET_RESTORE_WIZARD_DATA,
    ADD_RESTORE_WIZARD_ERRORS,
    REMOVE_RESTORE_WIZARD_ERRORS,
    RESET_RESTORE_WIZARD_ERRORS,
    ADD_RESTORE_WIZARD_TOUCHED,
    REMOVE_RESTORE_WIZARD_TOUCHED,
    RESET_RESTORE_WIZARD_TOUCHED,
    INIT_RESTORE_WIZARD_DATA,
    INIT_RESTORE_WIZARD_ERRORS,
    INIT_RESTORE_WIZARD_TOUCHED
} from '../actions/action.types';
let restoreWizardReducer = function (state = { step: 1, data: {
    keys_modal: false, 
    restore_filepath: '', 
    restore_password: '', 
    create_filepath: '', 
    create_password: '', 
    create_confirm_password: '', 
    create_wallet_name: '', 
    validated: false }, errors: {}, touched: {} }, action) {
    switch (action.type) {
        case ADD_RESTORE_WIZARD_STEP:
            return { ...state, ...{ step: (state.step + 1) } }; //add upper limit
        case REMOVE_RESTORE_WIZARD_STEP:
            return { ...state, ...{ step: (state.step > 1 ? (state.step - 1) : 1) } };
        case RESET_RESTORE_WIZARD_STEP:
            return { ...state, ...{ step: 1 } };
        case ADD_RESTORE_WIZARD_DATA:
            return { ...state, data: { ...state.data, ...action.item } };
        case REMOVE_RESTORE_WIZARD_DATA:
            let curr = state;
            curr.data.hasOwnProperty(action.item) && delete curr.data[action.item];
            return { ...curr };
        case RESET_RESTORE_WIZARD_DATA:
            return { ...state,  data: {keys_modal: false, 
                restore_filepath: '', 
                restore_password: '', 
                create_filepath: '', 
                create_password: '', 
                create_confirm_password: '', 
                create_wallet_name: '', 
                validated: false} };
        case ADD_RESTORE_WIZARD_ERRORS:
            return { ...state, ...{ errors: { ...state.errors, ...action.item } } };
        case REMOVE_RESTORE_WIZARD_ERRORS:
            let err = state;
            err.errors.hasOwnProperty(action.item) && delete err.errors[action.item];
            return { ...err };
        case RESET_RESTORE_WIZARD_ERRORS:
            return { ...state, ...{ errors: {} } };
        case ADD_RESTORE_WIZARD_TOUCHED:
            return { ...state, ...{ touched: { ...state.touched, ...action.item } } };
        case REMOVE_RESTORE_WIZARD_TOUCHED:
            let touch = state;
            touch.touched.hasOwnProperty(action.item) && delete touch.touched[action.item];
            return { ...touch };
        case RESET_RESTORE_WIZARD_TOUCHED:
            return { ...state, ...{ touched: {} } };
        case INIT_RESTORE_WIZARD_DATA:
            return {...state, data:{...action.item}};
        case INIT_RESTORE_WIZARD_ERRORS:
            return {...state, errors:{...action.item}};
        case INIT_RESTORE_WIZARD_TOUCHED:
            return {...state, touched:{...action.item}};
        default:
            return state
    }
}
export { restoreWizardReducer }