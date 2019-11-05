import { legacyAccountsApi } from '../api/go';
import { replaceLegacyAccounts, resetAllBalances, addLegacyBalance, addLegacyBTCBalance, addLegacyBTCBalancePending } from '../actions/legacy_accounts.action';
import { addError } from '../actions/error.action';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';
import { processResponse, jsonResponse } from '../libs/response';
import { getHistoryApi, getHistoryOmniApi, getFee, getTransactions, broadcastTransactions } from '../api/legacy/transaction.api';
import { getBalanceApi, getBTCBalanceApi, getBTCBalancePendingApi } from '../api/legacy/balances.api';
import { getBTCPriceApi, getBTCSAFEXApi } from '../api/legacy/prices.api';

import '../components/bitcoin/bitcoin.css';

import { Col, Form, Button } from 'react-bootstrap';
import History from '../components/bitcoin/History';
import React from 'react';
import crypto from 'crypto';




const bitcoin = window.require('bitcoinjs-lib');

export const getQRKey = function () {
    return `receive-${this.state.address}-${this.state.amount}`;
}

export const getLegacyAccounts = function (dispatch) {
    if (localStorage.getItem("legacy_accounts")) {
        dispatch(replaceLegacyAccounts(JSON.parse(localStorage.getItem("legacy_accounts"))));
    }
    else {
        lordOfTheFetch(legacyAccountsApi.getLegacyAccountsApi, [], callbackForGetLegacyAccounts, [dispatch], { dispatch: dispatch });
    }

}


// getLegacyAccounts
let callbackForGetLegacyAccounts = function (res, dispatch) {
    if (res.status === 0) {
        if ((res.result.value !== "") && (res.result.value !== undefined)) {
            localStorage.setItem("legacy_accounts", res.result.value);
            dispatch(replaceLegacyAccounts(JSON.parse(res.result.value)));
        }
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
        let name = crypto.randomBytes(10).toString('hex') + "L" + crypto.randomBytes(10).toString('hex');
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
        localStorage.setItem("legacy_accounts", JSON.stringify(accounts));
        dispatch(replaceLegacyAccounts(accounts));
        if (reset !== false)
            reset();
    }
}

export const resetEditLabelModal = function () {
    this.setState({
        modal_show: false,
        modal_receive: false,
        modal_send: false,
        modal_props: {},
        modal_header: "",
        modal_content: "",
        modal_footer: "",
        modal_key: "modal",
        new_label: "",
        account: null,
        modal_close: () => { }
    });
}
export const resetAddAccountModal = function () {
    this.setState({
        modal_show: false,
        modal_receive: false,
        modal_send: false,
        modal_props: {},
        modal_header: "",
        modal_content: "",
        modal_footer: "",
        modal_key: "modal",
        new_label: "",
        adress: "",
        modal_close: () => { }
    });
}
export const resetShowPrivateModal = function () {
    this.setState({
        modal_show: false,
        modal_receive: false,
        modal_send: false,
        modal_props: {},
        modal_header: "",
        modal_content: "",
        modal_footer: "",
        modal_key: "modal",
        modal_close: () => { }
    });
}
export const resetHistoryModal = function () {
    this.setState({
        modal_show: false,
        modal_receive: false,
        modal_send: false,
        modal_props: {},
        modal_header: "",
        modal_content: "",
        modal_footer: "",
        modal_key: "modal",
        history: [],
        modal_close: () => { }
    });
}
export const resetReceiveModal = function () {
    this.setState({
        modal_show: false,
        modal_receive: false,
        modal_send: false,
        modal_props: {},
        modal_header: "",
        modal_content: "",
        modal_footer: "",
        address: '',
        modal_key: "modal",
        amount: '0.00000546',
        modal_close: () => { }
    });
}
export const resetSendModal = function () {
    this.setState({
        modal_show: false,
        modal_receive: false,
        modal_send: false,
        modal_props: {},
        modal_header: "",
        modal_content: "",
        modal_footer: "",
        modal_key: "modal",
        account: null,
        address: '',
        fee: 0.00000500,
        amount: "0.00000546",
        dollar_amount: 0,
        dollar_fee: 0,
        txs: null,
        btc_dollar: true,
        btc_bal: 0,
        modal_close: () => { }
    });
}

export const enableEditLabelModal = function (account) {
    this.setState({
        modal_show: true,
        modal_send: false,
        modal_receive: false,
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
        modal_heading: this.props.t("edit_label"),
        modal_key: `edit-label-${account.account_name}`

    });
}


export const enableAddAccountModal = function () {
    this.setState({
        modal_show: true,
        modal_send: false,
        modal_receive: false,
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
        modal_send: false,
        modal_receive: false,
        modal_props: { size: "lg", centered: true },
        modal_close: resetShowPrivateModal.bind(this),
        modal_footer: <div> <Button variant="primary" onClick={resetShowPrivateModal.bind(this)}>{this.props.t("close_button")}</Button></div>,
        modal_content: <div className="text-center"> <p> {this.props.t("private_note")}</p> <p className="text-info border border-info"> {key}</p></div>,
        modal_heading: this.props.t("private_key"),
        modal_key: `private-${key}`
    });
}

export const enableHistoryModal = function (address) {
    Promise.all([
        getHistoryApi(address).then(processResponse).then(jsonResponse).then((res) => res.txs),
        getHistoryOmniApi(address).then(processResponse).then(jsonResponse).then(res => res.transactions)
    ])
        .then(responses => {
            console.log("RESPONSES ");
            console.log(responses);
            let txs = responses[1].concat(responses[0]).map(tx => ({
                coin: tx.propertyname === "SafeExchangeCoin" ? "safex" : "bitcoin",
                confirmations: tx.confirmations,
                txid: tx.txid,
                date_time: tx.propertyname === "SafeExchangeCoin" ? new Date(tx.blocktime * 1000) : new Date(tx.time * 1000),
                reference_address: tx.propertyname === "SafeExchangeCoin" ? tx.referenceaddress : tx.vout[0].scriptPubKey.addresses[0],
                sending_address: tx.propertyname === "SafeExchangeCoin" ? tx.sendingaddress : tx.vin[0].addr,
                amount: tx.propertyname === "SafeExchangeCoin" ? tx.amount : (tx.vout !== undefined ? tx.vout[0].value : 0),
                btc_fees: tx.propertyname === "SafeExchangeCoin" ? 0 : tx.fees,
                direction: tx.propertyname === "SafeExchangeCoin" ? (tx.referenceaddress === address ? "receive" : "send") : (tx.vout[0].scriptPubKey.addresses[0] === address ? "receive" : "send")
            }));
            txs.sort((a, b) => {
                return b.date_time.getTime() - a.date_time.getTime();
            });
            setHistoryStates.bind(this)(txs);
        });
}


export const enableReceiveModal = function (address) {
    this.setState({
        modal_show: false,
        modal_send: false,
        modal_receive: true,
        modal_props: { size: "xl", centered: true, dialogClassName: "modal-dialog-history" },
        modal_close: resetReceiveModal.bind(this),
        modal_footer: <div>
            <Button variant="danger" onClick={resetReceiveModal.bind(this)}>{this.props.t("close_button")}</Button>
        </div>,
        address,
        modal_key: `receive-${address}-${this.state.ammount}`,
        modal_heading: this.props.t("receive_button"),

    });
}

export const enableSendModal = function (account) {
    if (account.btc_bal !== 0) {
        this.setState({
            modal_show: false,
            modal_receive: false,
            modal_send: true,
            modal_props: { size: "xl", centered: true, dialogClassName: "modal-dialog-history" },
            modal_close: resetSendModal.bind(this),
            modal_footer: <div>
                <Button variant="success" >{this.props.t("send_button")}</Button>
                <Button variant="danger" onClick={resetSendModal.bind(this)}>{this.props.t("close_button")}</Button>
            </div>,
            account,
            modal_heading: this.props.t("add_account"),
            btc_bal: account.btc_bal

        });
        calculateFee.bind(this)();
    }
    else {
        alert("NO money in the bank!!!");
    }

}




export const setHistoryStates = function (res) {
    this.setState({
        modal_show: true,
        modal_receive: false,
        modal_send: false,
        modal_props: { size: "xl", scrollable: true, dialogClassName: "modal-dialog-history" },
        modal_close: resetHistoryModal.bind(this),
        modal_footer: <div> <Button variant="primary" onClick={resetHistoryModal.bind(this)}>{this.props.t("close_button")}</Button></div>,
        modal_content: <div className="text-center">
            <p>{res.length === 0 ? this.props.t("no_transactions") : `${this.props.t("yes_transactions")} ${res.length}`}</p>
            {res.map((x, i) => { return <History tx={x} key={`history-${i}`} /> })}
        </div>,
        modal_heading: this.props.t("history")
    });

}
export const handleChange = function (event) {
    let val = event.target.value;
    if ((event.target.dataset.amount !== undefined) && (event.target.dataset.amount === "receive")) {
        //ovde uraditi proveru da li ima max 8 decimala
        // val = parseFloat(event.target.value).toFixed(8);
    }
    this.setState({ [event.target.name]: val });
    console.log(event.target.name, val);
    if (event.target.name == "amount") { this.setState({ dollar_amount: (parseFloat(val) * this.state.btc_value).toFixed(8) }); }
    if (event.target.name == "dollar_amount") { this.setState({ amount: (parseFloat(val) / this.state.btc_value).toFixed(8) }); }
    if (event.target.name == "fee") { calculateFee.bind(this)(generateTransactions, val); }
    if (event.target.name == "dollar_fee") { calculateFee.bind(this)(generateTransactions, (parseFloat(val) / this.state.btc_value).toFixed(8)); }


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
        .then(jsonResponse)
        .then((amount) => {
            dispatch(addLegacyBTCBalance(account.account_name, amount));
        })
        .catch((error) => { dispatch(addError(error.message)); });
    getBTCBalancePendingApi(account.address)
        .then(processResponse)
        .then(jsonResponse)
        .then((amount) => {
            dispatch(addLegacyBTCBalancePending(account.account_name, amount));
        })
        .catch((error) => { dispatch(addError(error.message)); });


}

export const changeBTCDollar = function () {
    let btc_dollar = !this.state.btc_dollar;
    this.setState({ btc_dollar: btc_dollar });
    document.getElementById("btc_dollar").innerText = btc_dollar ? this.props.t("btc_to_dollar") : this.props.t("dollar_to_btc");
    document.getElementById("amount_currency").innerText = btc_dollar ? "BTC" : "$";
    document.getElementById("fee_currency").innerText = btc_dollar ? "BTC" : "$";
    document.getElementById("total_currency").innerText = btc_dollar ? "BTC" : "$";

}

export const calculateFee = function (callback = generateTransactions, override_fee = false) {
    this.setState({ txs: null });
    lordOfTheFetch(getFee, [], adjustFee.bind(this), [callback, override_fee], { dispatch: this.props.dispatch });
}
export const adjustFee = function (fee, callback, override_fee) {
    if (this.state.account)
        lordOfTheFetch(getTransactions, [this.state.account.address], callback.bind(this), [fee, override_fee], { dispatch: this.props.dispatch });

}

export function generateTransactions(utxos, feedec, override_fee_dec) {
    let destination = this.state.address;
    let amountdec = this.state.amount;
    let amount = Math.abs(parseInt(amountdec * 100000000));
    let fee = Math.abs(parseInt(feedec * 100000000));
    let override_fee = override_fee_dec !== false ? Math.abs(parseInt(parseFloat(override_fee_dec) * 100000000)) : false;
    let wif = this.state.account.private_key;
    let key = bitcoin.ECPair.fromWIF(wif);
    let running_total = 0;
    let tx = new bitcoin.TransactionBuilder();
    let inputs_num = 0;
    let fee_adj;
    let txs = null;

    if ((amount < this.state.btc_bal) || (override_fee !== false && ((amount + override_fee) <= this.state.btc_bal))) {
        utxos.forEach(txn => {
            if (running_total < (fee + amount)) {
                running_total += txn.satoshis;
                inputs_num += 1;
            }
        });
        fee_adj = (inputs_num * 180) + 100;

        fee = override_fee !== false ? override_fee : Math.trunc(fee * (fee_adj / 1000));
        inputs_num = 0;
        running_total = 0;
        utxos.forEach(txn => {
            if (running_total < (fee + amount)) {
                running_total += txn.satoshis;
                //do not add inputs if destination is not set
                if (destination !== "") {
                    tx.addInput(txn.txid, txn.vout);
                    inputs_num += 1;
                }
            }
        });

        const { address } = bitcoin.payments.p2pkh({ pubkey: key.publicKey })
        if (destination) {
            tx.addOutput(destination, Math.trunc(amount));
        }



        const left_overs = running_total - amount - fee;
        if (destination && (left_overs > 0)) {
            tx.addOutput(address, left_overs);
        }

        if (destination) {
            for (var i = 0; i < inputs_num; i++) {
                tx.sign(i, key);
            }
            txs = tx.build().toHex();
        }
        let json = { txs: txs, fee: parseFloat(fee * 1.0 / 100000000).toFixed(8), dollar_fee: parseFloat((fee * 1.0 / 100000000) * this.state.btc_value).toFixed(8) };
        this.setState(json);
    }
    else { alert("Not enought money"); }
}

export const sendTransactions = function () {
    if (this.state.txs !== null && this.state.address !== "") {
        lordOfTheFetch(broadcastTransactions, [this.state.txs], resetSendModal.bind(this), [], { dispatch: this.props.dispatch });
    }
    else this.props.dispatch(addError("NO_TXS"));
}

export const getBTCDollarValue = function (fromapi = false, callSAFEX = false) {
    if (localStorage.getItem("btc_value") && !fromapi) {
        this.setState({ btc_value: parseFloat(localStorage.getItem("btc_value")) });
    }
    else {
        lordOfTheFetch(getBTCPriceApi, [], callbackForGetBTCPrice.bind(this), [callSAFEX], { dispatch: this.props.dispatch });
    }

}

export const getSAFEXDollarValue = function (fromapi = false) {
    if (localStorage.getItem("safex_value") && !fromapi) {
        this.setState({ safex_value: parseFloat(localStorage.getItem("safex_value")) });
    }
    else {
        lordOfTheFetch(getBTCSAFEXApi, [], callbackForGetSFTBTCPrice.bind(this), [], { dispatch: this.props.dispatch });
    }
}

export const callbackForGetBTCPrice = function (res, callSAFEX) {
    var btc = parseFloat(0).toFixed(2);
    if (res[0].symbol === 'BTC') {
        btc = parseFloat(res[0].price_usd).toFixed(2);
    }
    localStorage.setItem('btc_value', btc);
    this.setState({ btc_value: btc, dollar_amount: parseFloat(parseFloat(this.state.amount) * btc).toFixed(8) });

    if (callSAFEX) {
        getSAFEXDollarValue.bind(this)(true);
    }


}

export const callbackForGetSFTBTCPrice = function (res) {
    let safex = parseFloat(0).toFixed(8);
    if (localStorage.getItem("btc_value")) {
        if (res.hasOwnProperty("close")) {
            safex = (parseFloat(localStorage.getItem("btc_value")) * parseFloat(res.close).toFixed(8)).toFixed(8);
        }
        localStorage.setItem("safex_value", safex);
        this.setState({ safex_value: safex });
    }
    else {
        getBTCDollarValue.bind(this)(true, true);
    }
}

export const calculateAll = function (utxos, feedec, override_fee_dec) {
    let destination = this.state.address;
    let fee = Math.abs(parseInt(feedec * 100000000));
    let override_fee = override_fee_dec !== false ? Math.abs(parseInt(override_fee_dec * 100000000)) : false;
    let btc_bal = this.state.btc_bal;
    let wif = this.state.account.private_key;
    let key = bitcoin.ECPair.fromWIF(wif);
    let inputs_num = 0;
    let running_total = 0;
    let fee_adj = (utxos.length * 180) + 100;

    fee = override_fee !== false ? override_fee : Math.trunc(fee * (fee_adj / 1000));
    let tx = new bitcoin.TransactionBuilder();
    let txs = null; //placeholder for signed and build txs


    utxos.forEach(txn => {
        if (running_total < (btc_bal - fee)) {
            running_total += txn.satoshis;
            if (destination !== "") {
                tx.addInput(txn.txid, txn.vout);
                inputs_num += 1;
            }

        }
    });

    const { address } = bitcoin.payments.p2pkh({ pubkey: key.publicKey });

    if (destination) {
        tx.addOutput(destination, Math.trunc(btc_bal - fee));
    }
    const left_overs = running_total - btc_bal + fee;
    if (destination && (left_overs > 0)) {
        tx.addOutput(address, left_overs);
    }
    if (destination) {
        for (var i = 0; i < inputs_num; i++) {
            tx.sign(i, key);
        }
        txs = tx.build().toHex();
    }
    let json = { txs: txs, fee: parseFloat(fee * 1.0 / 100000000).toFixed(8), dollar_fee: parseFloat((fee * 1.0 / 100000000) * this.state.btc_value).toFixed(8), amount: parseFloat((btc_bal - fee) * 1.0 / 100000000).toFixed(8), dollar_amount: (parseFloat((btc_bal - fee) * 1.0 / 100000000) * this.state.btc_value).toFixed(8) };
    this.setState(json);
}