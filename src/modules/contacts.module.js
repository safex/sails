import {
    addContact,
    removeContact,
    addContacts,
    addNewContactData,
    resetNewContactData,
    addContactCounter
} from '../actions/contacts.action';

import { contactsApi } from '../api/go';
import { processResponse, jsonResponse, errorResponse } from '../libs/response';
import { addError } from '../actions/error.action';

let addNewContact = function (dispatch,contacts_state) {
    let data=contacts_state.new_contact;
    let create=false;
    if (data.label === "") data.label = "Label";
    if(!data.hasOwnProperty("id")){  create=true; data.id = contacts_state.contact_counter + 1; }
    let contacts = contacts_state.contacts;
    contacts[data.id] = data;
    contactsApi.setContactsApi(contacts)
        .then(processResponse)
        .then((res) => {
            dispatch(addContact(data, data.id));
            resetContactData(dispatch);
        })
        .then(() => {
            if(create){ addContactsCounter(dispatch, data.id);}
        })
        .catch(error => dispatch(addError(error)));

}

let addContactsCounter = function (dispatch, counter) {
    contactsApi.setContactsCounterApi(counter)
        .then(processResponse)
        .then((r) => { dispatch(addContactCounter(counter)) })
        .catch(e => dispatch(addError(e)));
}

let removeFromContacts = function (dispatch, id) {
    dispatch(removeContact(id));
}

let addAllContacts = function (dispatch, contacts) {
    dispatch(addContacts(contacts));
}

let addContactData = function (dispatch, data) {
    dispatch(addNewContactData(data));
}

let resetContactData = function (dispatch) {
    dispatch(resetNewContactData());
}

let addCounter = function (dispatch, counter) {
    dispatch(addContactCounter(counter));
}
let getContactsFromWallet = function (dispatch) {
    contactsApi.getContactsApi()
        .then(processResponse)
        .then(jsonResponse)
        .then((contacts) => {
            if (contacts.status === 0) { dispatch(addContacts(JSON.parse(contacts.result.value))); }
            else if (contacts.status !== 13) {
                dispatch(addError(contacts.status));
            }
        })
        .catch(errorResponse)
}

let getContactsCounterFromWallet = function (dispatch) {
    contactsApi.getContactsCounterApi()
        .then(processResponse)
        .then(jsonResponse)
        .then((counter) => {
            if (counter.status === 0) { dispatch(addContactCounter(JSON.parse(counter.result.value))); }
            else if (counter.status !== 13) {
                dispatch(addError(counter.status));
            }
        })
        .catch(errorResponse)
}

let copyContact = function (dispatch, data) {
    dispatch(addNewContactData(data))
}
export {
    addNewContact,
    removeFromContacts,
    addAllContacts,
    addContactData,
    resetContactData,
    addCounter,
    addContactsCounter,
    getContactsFromWallet,
    getContactsCounterFromWallet,
    copyContact
}