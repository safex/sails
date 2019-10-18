import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';
import { setAccountLabelsApi } from '../api/go/account_labels.api';
import { deleteAccountApi } from '../api/go/accounts.api';
import { addError } from '../actions/error.action';
import { addAccountLabels } from '../actions/account_labels.action';
import { getAccounts } from './home.module';

export const changeLabel = function () {
    let labels = { ...this.props.account_labels };
    labels[this.state.account_name] = this.state.new_label_value || this.state.current_label_value;
    lordOfTheFetch(setAccountLabelsApi, [labels], callbackForSaveLabels, [this.setState, this.props.dispatch, labels], { dispatch: this.props.dispatch });
    this.setState({ modal_label: false, current_label_value: "", new_label_value: "", account_name: "" });

}

export const deleteAccount = function () {
    lordOfTheFetch(deleteAccountApi, [this.state.account_name], callbackForDeleteAccount, [this.setState, this.props.dispatch], { dispatch: this.props.dispatch });
    this.setState({ modal_delete: false, current_label_value: "", account_name: "" });

}

export const resetModalLabelStates = function () {
    this.setState({ modal_label: false, current_label_value: "", new_label_value: "", account_name: "" });
}
export const resetModalDeleteStates = function () {
    this.setState({ modal_delete: false, account_name: "", current_label_value: "" });
}


export const inputOnChange = function (e) {
    this.setState({ new_label_value: e.target.value });
}


const callbackForSaveLabels = function (res, setState, dispatch, labels) {
    console.log("SAVE LABELS");
    if (res.status !== 0) dispatch(addError(res.status));
    else {

        dispatch(addAccountLabels(labels));
        getAccounts(dispatch, true)
    }
}

const callbackForDeleteAccount = function (res, setState, dispatch) {
    if (res.status !== 0) dispatch(addError(res.status));
    else {

        getAccounts(dispatch, true)
    }
}