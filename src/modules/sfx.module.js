import { getBalanceApi, sendCashApi, commitTransactionApi, } from '../api/go/transaction.api';
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
            that.setState({ balance_unlocked: parseFloat(res.result.balance.CashUnlocked != 0 ? (res.result.balance.CashUnlocked * 1.0 / 10000000000) : 0).toFixed(10), balance_locked: parseFloat(res.result.balance.CashLocked !== 0 ? (res.result.balance.CashLocked * 1.0 / 10000000000) : 0).toFixed(10) });
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

let getTxsHash = function () {
    this.setState({ txs: null, fee: 0.0000000000 });
    let amount = parseFloat(this.state.amount) * 10000000000;
    let destination = this.state.address;
    if (!destination) { this.props.dispatch(addError("NO_ADDRESS")); }
    if (amount === 0) { this.props.dispatch(addError("NO_AMOUNT")); }
    lordOfTheFetch(sendCashApi, [{ amount, destination, mixin: this.state.ring_size, payment_id: this.state.pid }], callbackForGetTxsHash.bind(this), [], { dispatch: this.props.dispatch });
}

let callbackForGetTxsHash = function (res) {
    if (res.status === 0) {
        if (res.result.txs) this.setState({ txs: res.result.txs });
        if (res.result.fee) this.setState({ txs: res.result.fee });
    }
    else {
        this.props.dispatch(addError(res.status));
    }

}
let commitTxs = function () {
    if (this.state.txs !== null) {
        lordOfTheFetch(sendCashApi, [{ tx_as_hex: this.state.txs }], callbackCommitTxs.bind(this), [], { dispatch: this.props.dispatch });
    }
    else this.props.dispatch(addError("NO_TXS"));
}

let callbackCommitTxs = function (res) {
    if (res.status === 0) {
        resetStates.bind(this)();
    }
    else this.props.dispacth(addError(res.status));
}

let resetStates = function () {
    this.setState(this.initialState);
}


export {
    getBalance,
    getContactsFromWallet,
    getTxsHash,
    commitTxs,
    resetStates
}