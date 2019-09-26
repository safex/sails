import { spinnerStart, spinnerEnd } from './spinner.action';
import { addError } from './error.action';
import { openAccount } from './accounts.action';
import { Http } from '../../libs/http';
import { INIT_CLOSE, INIT_CREATE } from '../../libs/api_endpoints'
import { RESET_APP } from './action.types';

const http = new Http();
export const startRestoringWallet = (endpoint, body) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        return http
            .post(endpoint, body, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status !== 0) {
                    dispatch(addError(data.status));
                }
                else {
                    dispatch(openAccount("primary", true));
                }
            })
            .catch(error => {
                dispatch(spinnerEnd());
                dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
            });

    }
}

export const closeWallet = (history) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        return http
            .post(INIT_CLOSE, null, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status !== 0) {
                    dispatch(addError(data.status));
                }
                else {
                    dispatch({
                        type: RESET_APP
                    });
                    history.push('/');
                }
            })
            .catch(error => {
                dispatch(spinnerEnd());
                dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
            });

    }
}

export const startCreatingWallet = (body) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        return http
            .post(INIT_CREATE, body, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status !== 0) {
                    dispatch(addError(data.status));
                }
                else {
                    dispatch(openAccount("primary", true));
                }
            })
            .catch(error => {
                dispatch(spinnerEnd());
                dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
            });

    }

}