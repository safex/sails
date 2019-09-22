import {
    ADD_CONTACT,
    REMOVE_CONTACT,
    ADD_CONTACTS,
    ADD_NEW_CONTACT,
    RESET_NEW_CONTACT,
    ADD_CONTACT_COUNTER,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_TOUCHED
} from '../actions/action.types';
let contactsReducer = function (state = {
    contacts: [],
    contact_counter: -1,
    new_contact: { address: "", label: "" },
    errors: { address: false, label: false, double: false },
    touched: { address: false, label: false, double: false }
}, action) {
    let new_state = { ...state };
    switch (action.type) {
        case ADD_CONTACT:
            new_state.contacts[action.item.id] = action.item.data;
            return { ...new_state };
        case ADD_CONTACTS:
            return { ...new_state, ...{ contacts: action.item } };
        case REMOVE_CONTACT:
            delete new_state.contacts[action.item];
            return new_state;
        case ADD_NEW_CONTACT:
            return { ...state, new_contact: action.item };
        case RESET_NEW_CONTACT:
            return { ...state, new_contact: { address: "", label: "" } };
        case ADD_CONTACT_COUNTER:
            return { ...state, contact_counter: action.item };
        case ADD_CONTACT_ERROR:
            return { ...state, errors: { ...state.errors, ...action.item } };
        case ADD_CONTACT_TOUCHED:
            return { ...state, touched: { ...state.touched, ...action.item } };

        default:
            return state;
    }
}
export { contactsReducer }