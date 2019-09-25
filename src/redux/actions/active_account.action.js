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
    return (dispatch, getState) => {
        console.log("SET ACTIVE ACCOUNT");
        console.log(getState);
        http
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

export const getActiveAccount = () => {
    return (dispatch, getState) => {
        console.log("GET ACTIVE ACCOUNT");
        console.log(getState);
        return http
            .post(STORE_GET, { key: "active_account" }, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status === 0) {
                    dispatch(addActiveAccount(JSON.parse(data.result.value)))
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