import { combineReducers} from 'redux';
import {RESET_APP} from '../actions/action.types'
import {walletExistsReducer} from './wallet_exists.reducer';
import {languageReducer} from './language.reducer';
import {errorReducer} from './error.reducer';
import {isGuestReducer} from './is_guest.reducer';
import {activeAccountReducer} from './active_account.reducer';
import {accountsReducer} from './accounts.reducer';
import {historyReducer} from './history.reducer';
import {contactsReducer} from './contacts.reducer';
import {legacyWalletReducer} from './legacy_wallet.reducer';
import {legacyAccountsReducer} from './legacy_accounts.reducer';
import {legacyWizardReducer} from './legacy_wizard.reducer';
import {createWizardReducer} from './create_wizard.reducer';
import {openWizardReducer} from './open_wizard.reducer';
import {wizardReducer} from './wizard.reducer';

let rootReducer = combineReducers({ 
    wallet_exists:walletExistsReducer,
    language:languageReducer,
    error:errorReducer,
    is_guest:isGuestReducer,
    active_account:activeAccountReducer,
    accounts:accountsReducer,
    history:historyReducer,
    contacts:contactsReducer,
    legacy_wallet:legacyWalletReducer,
    legacy_wizard:legacyWizardReducer,
    create_wizard:createWizardReducer,
    open_wizard:openWizardReducer,
    wizard:wizardReducer
});

export  {rootReducer};