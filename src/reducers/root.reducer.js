import { combineReducers} from 'redux';
import {walletExistsReducer} from './wallet_exists.reducer';
export default combineReducers({ wallet_exists:walletExistsReducer});