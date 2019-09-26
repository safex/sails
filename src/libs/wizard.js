import { validateMnemonic, validateConfirmPassword } from './validators';
import { INIT_RESTORE_SEEDS, INIT_RESTORE_KEYS } from './api_endpoints';
import { DAEMON_HOST, DAEMON_PORT, NET_TYPE } from '../setups/conf';
import { EventEmitter } from 'events';
let { dialog } = window.require("electron").remote;
export const setError = function (prop, value) {
    this.setState({ errors: { ...this.state.errors, [prop]: value } });
}
export const setTouched = function (prop, value) {
    this.setState({ touched: { ...this.state.touched, [prop]: value } });
}
export const setValidation = function (value) {
    this.setState({ validated: value });
}

export const resetData = function () {
    this.setState(this.initialState);
}
export const handleChange = function (event) {

    const { name, value } = event.target;
    this.setState({ data: { ...this.state.data, [name]: value } });
    this.setState({ touched: { ...this.state.touched, [name]: true } });
    let rules = [];
    if (event.target.hasOwnProperty("dataset")) {
        if ((event.target.dataset.rules) !== undefined && (event.target.dataset.rules != "")) rules = event.target.dataset.rules.split(",");
    }
    rules.forEach(rule => {
        switch (rule.trim()) {
            case "required":
                (value.trim() !== "") ? this.setState({ errors: { ...this.state.errors, [name]: false } }) : this.setState({ errors: { ...this.state.errors, [name]: true } });
                break;
            case "25_words":
                validateMnemonic(value.trim()) ? this.setState({ errors: { ...this.state.errors, [name]: false } }) : this.setState({ errors: { ...this.state.errors, [name]: true } });
                break;
            case "confirm_password":
                let linked = event.target.dataset.linked;
                let field = event.target.dataset.field;
                validateConfirmPassword(value.trim(), this.state.data[linked].trim()) ? this.setState({ errors: { ...this.state.errors, [field]: false } }) : this.setState({ errors: { ...this.state.errors, [field]: true } });
                break;
            default:
                break;
        }
    });




}
export const handleSelectTab = function (val) {
    this.setState({
        data: { ...this.state.data, restore_type: val }
    });
}

export const previousStep = function () {
    if (this.state.step == 1) { resetData.bind(this)(); this.props.history.push('/'); }
    else {
        this.setState({
            step: (this.state.step - 1)
        });
    }
}

export const nextStep = function () {
    if (this.state.step + 1 <= this.additional[this.props.component].steps) this.setState({ step: (this.state.step + 1) });
    else if (this.state.step + 1 > this.additional[this.props.component].steps) this.props.history.push("/w/home");
}

export const walletFile = function (options = null, type = "create", name = "create_filepath") {

    if (type === "create") {
        dialog.showSaveDialog(options, (path) => {
            let path_ext = path;
            if (path && !path_ext.endsWith('.sails')) {
                path_ext += ".sails";
            }
            this.setState({ touched: { ...this.state.touched, [name]: true } });
            this.setState({ data: { ...this.state.data, [name]: path_ext } });
            if (!path) {
                this.setState({ errors: { ...this.state.errors, [name]: true } });
            }
            else {
                this.setState({ errors: { ...this.state.errors, [name]: false } });
            }
        });
    }
    else {
        dialog.showOpenDialog(options, (files) => {
            this.setState({ touched: { ...this.state.touched, [name]: true } });
            if (files !== undefined && files.length > 0) {
                this.setState({ data: { ...this.state.data, [name]: files[0] } });
                this.setState({ errors: { ...this.state.errors, [name]: false } });
            }
            if (files === undefined) {
                this.setState({ data: { ...this.state.data, [name]: '' } });
                this.setState({ errors: { ...this.state.errors, [name]: true } });
            }
        });
    }

}
export const restore = function () {
    let daemon_host = this.props.daemon.daemon_host || DAEMON_HOST;
    let daemon_port = this.props.daemon.daemon_port || DAEMON_PORT;
    let body = {
        path: this.state.data.create_filepath.trim(),
        password: this.state.data.create_password.trim(),
        nettype: NET_TYPE,
        daemon_host: daemon_host,
        daemon_port: daemon_port
    };
    let endpoint = null;
    if (this.state.data.restore_type === "mnemonic") {
        body = { ...body, seed: this.state.data.restore_mnemonic.trim(), password_mnemonic: "" }
        endpoint = INIT_RESTORE_SEEDS;
    }
    else {
        body = { ...body, address: this.state.data.restore_address.trim(), spendkey: this.state.data.restore_spend.trim(), viewkey: this.state.data.restore_view.trim() };
        endpoint = INIT_RESTORE_KEYS;
    }
    this.props.startRestoringWallet(endpoint, body);
}

export const create = function () {
    let daemon_host = this.props.daemon.daemon_host || DAEMON_HOST;
    let daemon_port = this.props.daemon.daemon_port || DAEMON_PORT;
    this.props.startCreatingWallet({
        path: this.state.data.create_filepath.trim(),
        password: this.state.data.create_password.trim(),
        nettype: NET_TYPE,
        daemon_host: daemon_host,
        daemon_port: daemon_port
    });

}

