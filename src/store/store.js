import {createStore} from 'redux';
import {rootReducer} from '../reducers/root.reducer';
let store=createStore(rootReducer);
export default store;