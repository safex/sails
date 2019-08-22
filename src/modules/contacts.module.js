import {
    addContact,
    removeContact,
    addContacts,
    addNewContactData,
    resetNewContactData,
    addContactCounter
} from '../actions/contacts.action';
import { addError } from '../actions/error.action';

import { contactsApi } from '../api/go';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';




let addNewContact = function (dispatch, contacts_state) {
    let data = contacts_state.new_contact;
    let create = false;
    if (data.label === "") data.label = "Label";
    if (!data.hasOwnProperty("id")) { create = true; data.id = contacts_state.contact_counter + 1; }
    let contacts = contacts_state.contacts;
    contacts[data.id] = data;
    lordOfTheFetch(contactsApi.setContactsApi, [contacts], callbackForAddNewContactUltimateFetch, [dispatch, data, create], { dispatch: dispatch });
    //console.log("refresh");

}


let addContactsCounter = function (dispatch, counter) {
    lordOfTheFetch(contactsApi.setContactsCounterApi, [counter], callbackForAddContactCounterUltimateFetch, [dispatch, counter], { dispatch: dispatch });
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
    lordOfTheFetch(contactsApi.getContactsApi, [], callbackForGetContactsFromWalletUltimateFetch, [dispatch], { dispatch: dispatch });
}

let getContactsCounterFromWallet = function (dispatch) {
    lordOfTheFetch(contactsApi.getContactsCounterApi, [], callbackForGetContactCounterFromWallet, [dispatch], { dispatch: dispatch });
}

let copyContact = function (dispatch, data) {
    dispatch(addNewContactData(data))
}


//callback functions
let callbackForAddNewContactUltimateFetch = function (res, dispatch, data, create) {
    dispatch(addContact(data, data.id));
    resetContactData(dispatch);
    if (create) { addContactsCounter(dispatch, data.id); }
}

let callbackForAddContactCounterUltimateFetch = function (res, dispatch, counter) {
    dispatch(addContactCounter(counter));
}

let callbackForGetContactsFromWalletUltimateFetch = function (res, dispatch) {
    if (res.status === 0) {
        dispatch(addContacts(JSON.parse(res.result.value)));
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}

let callbackForGetContactCounterFromWallet = function (counter, dispatch) {
    if (counter.status === 0) { dispatch(addContactCounter(JSON.parse(counter.result.value))); }
    else if (counter.status !== 13) {
        dispatch(addError(counter.status));
    }
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