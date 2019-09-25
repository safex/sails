import {spinnerStart, spinnerEnd} from './spinner.action';
export const startRestoringWallet = (endpoint, body) => {
    return (dispatch) => {
        dispatch(spinnerStart());
        
    }
}