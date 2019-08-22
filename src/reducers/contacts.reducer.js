import {
    ADD_CONTACT,
    REMOVE_CONTACT,
    ADD_CONTACTS,
    ADD_NEW_CONTACT,
    RESET_NEW_CONTACT,
    ADD_CONTACT_COUNTER
} from '../actions/action.types';
let contactsReducer = function (state = { contacts: [], contact_counter: -1, new_contact: { address: "", label: "" } }, action) {
    let new_state = { ...state };
    switch (action.type) {
        case ADD_CONTACT:
            new_state.contacts[action.item.id] = action.item.data;
            return { ...new_state};
        case ADD_CONTACTS:
            
            return { ...new_state, ...{contacts: action.item} };
        case REMOVE_CONTACT:
            delete new_state.contacts[action.item];
            return new_state;
        case ADD_NEW_CONTACT:
            return { ...state, new_contact: action.item };
        case RESET_NEW_CONTACT:
            return { ...state, new_contact: { address: "", label: "" } };
        case ADD_CONTACT_COUNTER:
            return { ...state, contact_counter: action.item }

        default:
            return state;
    }
}
export { contactsReducer }