import {
    ADD_CONTACT,
    REMOVE_CONTACT,
    ADD_CONTACTS,
    ADD_NEW_CONTACT,
    RESET_NEW_CONTACT,
    ADD_CONTACT_COUNTER
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
        item: {data:contact, id:id}
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

export {
    addContacts,
    addContact,
    removeContact,
    addNewContactData,
    resetNewContactData,
    addContactCounter

}