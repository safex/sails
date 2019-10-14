import {
    WALLET_EXISTS,
    ADD_ERROR
} from './action.types';
import { LEGACY_DEFAULT_WALLET_PATH } from '../../setups/conf';
import { checkFileForFlags, readFilePromise } from "../../libs/legacy_wallet";

export const addWalletExistsStatus = (status) => {
    return (dispatch) => {
        dispatch({
            type: WALLET_EXISTS,
            item: status
        });
    }
}
export const checkIfFileExists = () => {
    return (dispatch) => {
        readFilePromise(LEGACY_DEFAULT_WALLET_PATH)
            .then(checkFileForFlags)
            .then((status) => { dispatch(addWalletExistsStatus(status)) })
            .catch((error) => { dispatch({ type: ADD_ERROR, item: error.message }) });
    }
}
