import { combineReducers } from 'redux';
import { RESET_APP } from '../actions/action.types';
import { initial_state } from '../setups/initial_state';
import { walletExistsReducer } from './wallet_exists.reducer';
import { languageReducer } from './language.reducer';
import { errorReducer } from './error.reducer';
import { isGuestReducer } from './is_guest.reducer';
import { activeAccountReducer } from './active_account.reducer';
import { accountsReducer } from './accounts.reducer';
import { historyReducer } from './history.reducer';
import { contactsReducer } from './contacts.reducer';
import { legacyWalletReducer } from './legacy_wallet.reducer';
import { legacyAccountsReducer } from './legacy_accounts.reducer';
import { wizardReducer } from './wizard.reducer';
import { homeModalsReducer } from './home_modals.reducer';
import { accountLabelsReducer } from './account_labels.reducer';

let appReducer = combineReducers({
    wallet_exists: walletExistsReducer,
    language: languageReducer,
    error: errorReducer,
    is_guest: isGuestReducer,
    active_account: activeAccountReducer,
    accounts: accountsReducer,
    history: historyReducer,
    contacts: contactsReducer,
    legacy_wallet: legacyWalletReducer,
    wizard: wizardReducer,
    legacy_accounts: legacyAccountsReducer,
    home_modals: homeModalsReducer,
    account_labels: accountLabelsReducer
});

const rootReducer = (state, action) => {
    if (action.type === RESET_APP) {
        initial_state.language = state.language;
        state = initial_state;
    }
    return appReducer(state, action)
}

export { rootReducer };