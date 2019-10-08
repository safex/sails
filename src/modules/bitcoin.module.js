import { legacyAccountsApi } from '../api/go';
import { replaceLegacyAccounts } from '../actions/legacy_accounts.action';
import { addError } from '../actions/error.action';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';


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

export const addAccount = function () {
    let accounts = { ...this.props.legacy_accounts };
    try {
        let name = "wallet_legacy_" + Object.keys(this.props.legacy_accounts).length;
        var key_pair = bitcoin.ECPair.fromWIF(this.state.address.trim());
        const { address } = bitcoin.payments.p2pkh({ pubkey: key_pair.publicKey });
        var key_json = {};
        key_json['public_key'] = address;
        key_json['private_key'] = view.trim();
        key_json['safex_bal'] = 0;
        key_json['btc_bal'] = 0;
        key_json['pending_safex_bal'] = 0;
        key_json['pending_btc_bal'] = 0;
        key_json['archived'] = false;
        key_json['label'] = this.state.new_label || "Enter your label here";
        legacies[name] = { account: key_json, type: 1 };
        legacies[name].account["address"] = address;
        legacies[name].account["account_name"] = name;

    } catch (error) {
        dispatch(addError(error.message));
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
        reset();
    }
}


export const resetEditLabelModal = function () {
    this.setState({ modal_show: false, modal_header: "", modal_content: "", content_footer: "", new_label: "", account: null, modal_close: () => { } });
}
export const resetAddAccountModal = function () {
    this.setState({ modal_show: false, modal_header: "", modal_content: "", content_footer: "", new_label: "", adress: "", modal_close: () => { } });
}

export const enableEditLabelModal = function (account) {
    this.setState({
        modal_show: true,
        account,
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
export const handleChange = function (event) {
    this.setState({ [event.target.name]: event.target.value });
}