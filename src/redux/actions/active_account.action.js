import { ADD_ACTIVE_ACCOUNT } from './action.types';
import { STORE_PUT, STORE_GET } from '../../libs/api_endpoints';
import { spinnerStart, spinnerEnd } from './spinner.action';
import { addError } from './error.action';
import { openAccount } from './accounts.action';
import { Http } from '../../libs/http';

const http = new Http();


export const addActiveAccount = function (account) {
    return (dispatch) => {
        dispatch({
            type: ADD_ACTIVE_ACCOUNT,
            item: account
        })

    }
}

export const setActiveAccount = (account) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        if (!account.hasOwnProperty("label")) {
            return http
                .post(STORE_GET, { key: "account_labels" }, null, null)
                .then(data => {
                    dispatch(spinnerEnd());
                    let labels = null;
                    if (data.status === 0) labels = JSON.parse(data.result.value);
                    else if (data.status === 13) labels = {};
                    else {
                        dispatch(addError(data.status));
                    }
                    let new_account = account;
                    if (labels.hasOwnProperty(account.account_name)) new_account.label = labels[account.account_name];
                    else new_account.label = account.account_name;
                    dispatch(setActiveAccount(new_account));

                })
                .catch(error => {
                    dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
                });
        }
        else {
            return http
                .post(STORE_PUT, { key: "active_account", value: JSON.stringify(account) }, null, null)
                .then(data => {
                    if (data.status !== 0) {
                        dispatch(spinnerEnd());
                        dispatch(addError(data.status));
                    }
                    else {
                        dispatch(spinnerEnd());
                        dispatch(addActiveAccount(account))

                    }
                })
                .catch(error => {
                    dispatch(spinnerEnd());
                    dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
                });
        }


    }
}

export const getActiveAccount = () => {
    return (dispatch) => {
        dispatch(spinnerStart());
        return http
            .post(STORE_GET, { key: "active_account" }, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status === 0) {
                    let acc = JSON.parse(data.result.value);
                    dispatch(addActiveAccount(acc));
                    dispatch(openAccount(acc.account_name, false));
                }
                else if (data.status === 13) {
                    dispatch(openAccount("primary", true))
                }
                else {
                    dispatch(addError(data.status));
                }
            })
            .catch(error => {
                dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
            });
    }
}