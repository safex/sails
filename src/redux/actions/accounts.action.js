import { ADD_ACCOUNT, REMOVE_ACCOUNT, ADD_ACCOUNTS } from './action.types';
import { ACCOUNT_OPEN } from '../../libs/api_endpoints';
import { spinnerStart, spinnerEnd } from './spinner.action';
import { addError } from './error.action';
import { setActiveAccount } from './active_account.action'
import { Http } from '../../libs/http';

const http = new Http();

export const addAccount = function (account) {
    return (dispatch) => {
        dispatch(
            {
                type: ADD_ACCOUNT,
                item: account
            }
        );
    }
}
export const removeAccount = function (account) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_ACCOUNT,
            item: account
        });

    }
}
export const addAccounts = function (accounts) {
    return (dispatch) => {
        dispatch({
            type: ADD_ACCOUNTS,
            item: accounts
        })

    }
}


export const openAccount = (account, set_active = false) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        return http
            .post(ACCOUNT_OPEN, { name: account }, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status !== 0) {
                    dispatch(addError(data.status));
                }
                else {
                    if (set_active) {
                        dispatch(setActiveAccount({ account: data.result.info, type: 0 }));
                    }

                }
            })
            .catch(error => {
                dispatch(spinnerEnd());
                dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
            });


    }
}

