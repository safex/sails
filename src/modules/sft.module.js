import { getBalanceApi } from '../api/go/transaction.api';
import { getContactsApi } from '../api/go/contacts.api';
import { lordOfTheFetch } from "../libs/one_fetch_to_rule_them_all";

import { addError } from '../actions/error.action';
import { addContacts } from '../actions/contacts.action';

let getBalance = function () {
    lordOfTheFetch(
        getBalanceApi,
        [],
        callbackForGetBalance,
        [this],
        { "dispatch": this.props.dispatch });
}
let getContactsFromWallet = function () {
    lordOfTheFetch(getContactsApi, [], callbackForGetContactsFromWallet, [this.props.dispatch], { dispatch: this.props.dispatch });
}

let callbackForGetBalance = function (res, that) {
    if (res.status != 0) that.props.dispatch(addError(res.status));
    else {
        if (res.result.balance !== null) {
            that.setState({ balance_unlocked: parseFloat(res.result.balance.TokenUnlocked !== 0 ? (res.result.balance.TokenUnlocked / 10000000000) : 0).toFixed(0), balance_locked: parseFloat(res.result.balance.TokenLocked !== 0 ? (res.result.balance.TokenLocked / 10000000000) : 0).toFixed(0), sfx_unlocked: parseFloat(res.result.balance.CashUnlocked !== 0 ? (res.result.balance.CashUnlocked * 1.0 / 10000000000) : 0).toFixed(10) });
        }

    }

}

let callbackForGetContactsFromWallet = function (res, dispatch) {
    if (res.status === 0) {
        dispatch(addContacts(JSON.parse(res.result.value)));
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}


export {
    getBalance,
    getContactsFromWallet
}