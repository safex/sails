import {
    ACCOUNT_LABELS
} from './action.types';

import { STORE_PUT, STORE_GET } from '../../libs/api_endpoints';
import { spinnerStart, spinnerEnd } from './spinner.action';
import { addError } from './error.action';
import { Http } from '../../libs/http';

const http = new Http();

export const addAccountLabels = function (labels) {
    return (dispatch) => {
        dispatch({
            type: ACCOUNT_LABELS,
            item: labels
        });
    }

}

export const setActiveLabels = (labels) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        http
            .post(STORE_PUT, { key: "account_labels", value: JSON.stringify(labels) }, null, null)
            .then(data => {
                if (data.status !== 0) {
                    dispatch(spinnerEnd());
                    dispatch(addError(data.status));
                }
                else {
                    dispatch(spinnerEnd());
                    dispatch(addAccountLabels(labels));

                }
            })
            .catch(error => {
                dispatch(spinnerEnd());
                dispatch(addError(error.message || error.statusText || error || "UNKNOWN"));
            });



    }
}

export const getAccountLabels = () => {
    return (dispatch) => {
        dispatch(spinnerStart());
        return http
            .post(STORE_GET, { key: "account_labels" }, null, null)
            .then(data => {
                dispatch(spinnerEnd());
                if (data.status === 0) {
                    dispatch(addAccountLabels(JSON.parse(data.result.value)))
                }
                else if (data.status === 13) {
                    dispatch(addAccountLabels({}));
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