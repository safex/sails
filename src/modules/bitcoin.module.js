import { legacyAccountsApi } from '../api/go';
import { legacyTransactionApi } from '../api/legacy';
import { replaceLegacyAccounts } from '../redux/actions/legacy_accounts.action';
import { addError } from '../redux/actions/error.action';
import { lordOfTheFetch } from '../libs/one_fetch_to_rule_them_all';


const bitcoin = window.require('bitcoinjs-lib');

let getLegacyAccounts = function (dispatch) {
    lordOfTheFetch(legacyAccountsApi.getLegacyAccountsApi, [], callbackForGetLegacyAccounts, [dispatch], { dispatch: dispatch });
}


// getLegacyAccounts
let callbackForGetLegacyAccounts = function (res, dispatch) {
    if (res.status === 0) {
        if (res.result.value !== "") dispatch(replaceLegacyAccounts(JSON.parse(res.result.value)));
    }
    else if (res.status !== 13) {
        dispatch(addError(res.status));
    }
}

export {
    getLegacyAccounts
} 