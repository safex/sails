import {
    ADD_CONTACT,
    REMOVE_CONTACT,
    ADD_CONTACTS,
    ADD_NEW_CONTACT,
    RESET_NEW_CONTACT,
    ADD_CONTACT_COUNTER,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_TOUCHED
} from './action.types';

let addContacts = function (contacts) {
    return {
        type: ADD_CONTACTS,
        item: contacts
    }
}

let addContact = function (contact, id) {
    return {
        type: ADD_CONTACT,
        item: { data: contact, id: id }
    }
}
let removeContact = function (contact) {
    return {
        type: REMOVE_CONTACT,
        item: contact
    }
}
let addNewContactData = function (data) {
    return {
        type: ADD_NEW_CONTACT,
        item: data
    }
}

let resetNewContactData = function () {
    return {
        type: RESET_NEW_CONTACT
    }
}
let addContactCounter = function (num) {
    return {
        type: ADD_CONTACT_COUNTER,
        item: num
    }
}
let addContactTouched = function (touch) {
    return {
        type: ADD_CONTACT_TOUCHED,
        item: touch
    }
}
let addContactError = function (error) {
    return {
        type: ADD_CONTACT_ERROR,
        item: error
    }
}


export {
    addContacts,
    addContact,
    removeContact,
    addNewContactData,
    resetNewContactData,
    addContactCounter,
    addContactTouched,
    addContactError

}