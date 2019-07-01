import { combineReducers} from 'redux';
import {walletExistsReducer} from './wallet_exists.reducer';
import {languageReducer} from './language.reducer';
import {errorReducer} from './error.reducer';
import {isGuestReducer} from './is_guest.reducer';
import {activeAccountReducer} from './active_account.reducer';
import {accountsReducer} from './accounts.reducer';
import {historyReducer} from './history.reducer';
import {contactsReducer} from './contacts.reducer';

export default combineReducers({ 
    wallet_exists:walletExistsReducer,
    language:languageReducer,
    error:errorReducer,
    is_guest:isGuestReducer,
    active_account:activeAccountReducer,
    accounts:accountsReducer,
    history:historyReducer,
    contacts:contactsReducer
});