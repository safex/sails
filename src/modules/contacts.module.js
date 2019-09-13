import {
    addContact,
    removeContact,
    addContacts,
    addNewContactData,
    resetNewContactData,
    addContactCounter,
    addContactError,
    addContactTouched
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
}


let addContactsCounter = function (dispatch, counter) {
    lordOfTheFetch(contactsApi.setContactsCounterApi, [counter], callbackForAddContactCounterUltimateFetch, [dispatch, counter], { dispatch: dispatch });
}


let removeFromContacts = function () {
    let contacts = this.props.all;
    delete contacts[this.props.contact.id]
    lordOfTheFetch(contactsApi.setContactsApi, [contacts], callbackForRemoveFromContacts, [this.props.dispatch, this.props.contact.id], { dispatch: this.props.dispatch });
}


let addAllContacts = function (dispatch, contacts) {
    dispatch(addContacts(contacts));
}

let addContactData = function (dispatch, data) {
    dispatch(addNewContactData(data));
}

let resetContactData = function (dispatch) {
    dispatch(resetNewContactData());
    dispatch(addContactError({ address: false, label: false, double: false }));
    dispatch(addContactTouched({ address: false, label: false, double: false }));
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

let copyContact = function (dispatch, data, touch, error) {
    dispatch(addNewContactData(data));
    addNewContactTouched(dispatch, touch);
    addNewContactError(dispatch, error);
}



let contactSubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
        addNewContact(this.props.dispatch, this.props.contacts);
    }
};
let contactInputChange = function (event) {
    let contacts = this.props.contacts.contacts;
    let new_contact = this.props.contacts.new_contact;
    new_contact[event.target.id.substring(8)] = event.target.value;
    let doublesl = contacts.filter(x => {
        if (x !== null) {
            return ((x.label === new_contact.label) && ((new_contact.hasOwnProperty("id") && new_contact.id !== x.id) || (!new_contact.hasOwnProperty("id"))));

        }
        else { return false };

    });
    let doublesa = contacts.filter(x => {
        if (x !== null) {
            return ((x.address === new_contact.address) && ((new_contact.hasOwnProperty("id") && new_contact.id !== x.id) || (!new_contact.hasOwnProperty("id"))));
        }
        else {
            return false;
        };

    });
    let error = {};
    if (event.target.value === "") error[event.target.id.substring(8)] = true; else error[event.target.id.substring(8)] = false;
    if (doublesl.length !== 0 || doublesa.length !== 0) { error.double = true; } else { error.double = false; }
    let touch = {}; touch[event.target.id.substring(8)] = true; touch.double = true;
    addContactData(this.props.dispatch, new_contact);
    addNewContactTouched(this.props.dispatch, touch);
    addNewContactError(this.props.dispatch, error);


}

let addNewContactError = function (dispatch, error) {
    dispatch(addContactError(error));
}

let addNewContactTouched = function (dispatch, touch) {
    dispatch(addContactTouched(touch));
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

let callbackForRemoveFromContacts = function (res, dispatch, id) {
    dispatch(removeContact(id));
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
    copyContact,
    addNewContactError,
    addNewContactTouched,
    contactSubmit,
    contactInputChange
}