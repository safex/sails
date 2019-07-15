import { ADD_LEGACY_WIZARD_STEP, ADD_LEGACY_WIZARD_DATA, REMOVE_LEGACY_WIZARD_STEP, REMOVE_LEGACY_WIZARD_DATA, RESET_LEGACY_WIZARD_STEP, RESET_LEGACY_WIZARD_DATA } from '../actions/action.types';
let legacyWizardReducer = function (state = { step: 1, data: {} }, action) {
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
            return { ...state, ...{ data: {} } };
        default:
            return state
    }
}
export { legacyWizardReducer }