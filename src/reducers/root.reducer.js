import { combineReducers} from 'redux'
import {responseReducer} from './response.reducer';
export default combineReducers({response:responseReducer});