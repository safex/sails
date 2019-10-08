import { legacyAccountsApi } from '../api/go';
import { replaceLegacyAccounts, resetAllBalances, addLegacyBalance, addLegacyBTCBalance, addLegacyBTCBalancePending } from '../actions/legacy_accounts.action';
import { addError } from '../actions/error.action';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';
import { processResponse, jsonResponse } from '../libs/response';
import { getHistoryApi } from '../api/legacy/transaction.api';
import { getBalanceApi, getBTCBalanceApi, getBTCBalancePendingApi } from '../api/legacy/balances.api';

import '../components/bitcoin/bitcoin.css';

import { Col, Form, Button } from 'react-bootstrap';
import React from 'react';



const bitcoin = window.require('bitcoinjs-lib');


export const getLegacyAccounts = function (dispatch) {
    lordOfTheFetch(legacyAccountsApi.getLegacyAccountsApi, [], callbackForGetLegacyAccounts, [dispatch], { dispatch: dispatch });
}


// getLegacyAccounts
let callbackForGetLegacyAccounts = function (res, dispatch) {
    if (res.status === 0) {
        if (res.result.value !== "") dispatch(replaceLegacyAccounts(JSON.parse(res.result.value)));
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}

export const saveLabel = function () {
    let accounts = { ...this.props.legacy_accounts };
    accounts[this.state.account.account_name].label = this.state.new_label;
    lordOfTheFetch(legacyAccountsApi.setLegacyAccountsApi, [accounts], replaceAccountsAndReset, [this.props.dispatch, resetEditLabelModal.bind(this), accounts], { dispatch: this.props.dispatch });


}

export const toArchive = function (account_name) {
    let accounts = { ...this.props.legacy_accounts };
    accounts[account_name].archived = false;
    lordOfTheFetch(legacyAccountsApi.setLegacyAccountsApi, [accounts], replaceAccountsAndReset, [this.props.dispatch, false, accounts], { dispatch: this.props.dispatch });


}

export const addAccount = function () {
    let accounts = { ...this.props.legacy_accounts };
    try {
        let name = "wallet_legacy_" + Object.keys(this.props.legacy_accounts).length;
        var key_pair = bitcoin.ECPair.fromWIF(this.state.address.trim());
        const { address } = bitcoin.payments.p2pkh({ pubkey: key_pair.publicKey });
        if (!Object.values(this.props.legacy_accounts).some(account => {
            return account.address === address;
        })) {
            accounts[name] = { public_key: address, safex_bal: 0, btc_bal: 0, pending_safex_bal: 0, pending_btc_bal: 0, archived: false, address: address, account_name: name };
            accounts[name].private_key = this.state.address.trim();
            accounts[name].label = this.state.new_label || "Enter your label here";


        }
        else {
            this.props.dispatch(addError("ACCOUNT_EXISTS"));
        }
    } catch (error) {
        this.props.dispatch(addError(error.message));
    }

    lordOfTheFetch(legacyAccountsApi.setLegacyAccountsApi,
        [accounts],
        replaceAccountsAndReset,
        [this.props.dispatch, resetAddAccountModal.bind(this), accounts],
        { dispatch: this.props.dispatch });

}

const replaceAccountsAndReset = function (res, dispatch, reset, accounts) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {
        dispatch(replaceLegacyAccounts(accounts));
        if (reset !== false)
            reset();
    }
}


export const resetEditLabelModal = function () {
    this.setState({ modal_show: false, modal_props: {}, modal_header: "", modal_content: "", content_footer: "", new_label: "", account: null, modal_close: () => { } });
}
export const resetAddAccountModal = function () {
    this.setState({ modal_show: false, modal_props: {}, modal_header: "", modal_content: "", content_footer: "", new_label: "", adress: "", modal_close: () => { } });
}
export const resetShowPrivateModal = function () {
    this.setState({ modal_show: false, modal_props: {}, modal_header: "", modal_content: "", content_footer: "", modal_close: () => { } });
}
export const resetHistoryModal = function () {
    this.setState({ modal_show: false, modal_props: {}, modal_header: "", modal_content: "", content_footer: "", history: [], modal_close: () => { } });
}


export const enableEditLabelModal = function (account) {
    this.setState({
        modal_show: true,
        account,
        modal_props: { size: "lg", centered: true },
        modal_close: resetEditLabelModal.bind(this),
        modal_footer: <div>
            <Button variant="success" onClick={saveLabel.bind(this)}>{this.props.t("save_button")}</Button>
            <Button variant="danger" onClick={resetEditLabelModal.bind(this)}>{this.props.t("close_button")}</Button>
        </div>,
        modal_content:
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="" >
                        <Form.Control type="text" placeholder={account.label} onChange={handleChange.bind(this)} name="new_label" />
                    </Form.Group>
                </Form.Row>
            </Form>,
        modal_heading: this.props.t("edit_label")

    });
}


export const enableAddAccountModal = function () {
    this.setState({
        modal_show: true,
        modal_props: { size: "lg", centered: true },
        modal_close: resetAddAccountModal.bind(this),
        modal_footer: <div>
            <Button variant="success" onClick={addAccount.bind(this)}>{this.props.t("save_button")}</Button>
            <Button variant="danger" onClick={resetAddAccountModal.bind(this)}>{this.props.t("close_button")}</Button>
        </div>,
        modal_content:
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="new_label">
                        <Form.Label>{this.props.t("label")}</Form.Label>
                        <Form.Control type="text" name="new_label" onChange={handleChange.bind(this)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="address">
                        <Form.Label>{this.props.t("address")}</Form.Label>
                        <Form.Control type="text" name="address" onChange={handleChange.bind(this)} />
                    </Form.Group>
                </Form.Row>
            </Form>,
        modal_heading: this.props.t("add_account")

    });
}

export const enableShowPrivateModal = function (key) {
    this.setState({
        modal_show: true,
        modal_props: { size: "lg", centered: true },
        modal_close: resetShowPrivateModal.bind(this),
        modal_footer: <div> <Button variant="primary" onClick={resetShowPrivateModal.bind(this)}>{this.props.t("close_button")}</Button></div>,
        modal_content: <div className="text-center"> <p> {this.props.t("private_note")}</p> <p className="text-info border border-info"> {key}</p></div>,
        modal_heading: this.props.t("private_key")
    });
}

export const enableHistoryModal = function (address) {
    lordOfTheFetch(getHistoryApi,
        [address],
        setHistoryStates.bind(this),
        [],
        { dispatch: this.props.dispatch, "call": "GET HISTORY API" });

}

export const setHistoryStates = function (res) {
    this.setState({
        modal_show: true,
        modal_props: { size: "xl", scrollable: true, dialogClassName: "modal-dialog-history" },
        modal_close: resetHistoryModal.bind(this),
        modal_footer: <div> <Button variant="primary" onClick={resetHistoryModal.bind(this)}>{this.props.t("close_button")}</Button></div>,
        modal_content: <div className="text-center">
            <p>{res.length === 0 ? this.props.t("no_transactions") : `${this.props.t("yes_transactions")} ${res.length}`}</p>
            {res.map((x) => { return <p>{JSON.stringify(x)}</p> })}
        </div>,
        modal_heading: this.props.t("history")
    });

}
export const handleChange = function (event) {
    this.setState({ [event.target.name]: event.target.value });
}

export const copyAddressToClipboard = function (value) {
    const el = document.createElement('input');
    el.value = value;
    el.setAttribute('readonly', '');                // tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

export const getBalances = function (dispatch, account) {
    dispatch(resetAllBalances(account.account_name));
    getBalanceApi(account.address)
        .then(processResponse)
        .then(jsonResponse)
        .then((oldones) => {
            dispatch(addLegacyBalance(account.account_name, oldones.balance));
        })
        .catch((error) => { dispatch(addError(error.message)); });
    getBTCBalanceApi(account.address)
        .then(processResponse)
        .then((res) => { res.text() })
        .then((amount) => {
            dispatch(addLegacyBTCBalance(account.account_name, amount));
        })
        .catch((error) => { dispatch(addError(error.message)); });
    getBTCBalancePendingApi(account.address)
        .then(processResponse)
        .then((res) => { res.text() })
        .then((amount) => {
            dispatch(addLegacyBTCBalancePending(account.account_name, amount));
        })
        .catch((error) => { dispatch(addError(error.message)); });


}