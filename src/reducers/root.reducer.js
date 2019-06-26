import { combineReducers} from 'redux';
import {walletExistsReducer} from './wallet_exists.reducer';
import {languageReducer} from './language.reducer';
import {errorReducer} from './error.reducer';
export default combineReducers({ wallet_exists:walletExistsReducer,language:languageReducer,error:errorReducer});