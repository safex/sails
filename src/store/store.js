import {createStore} from 'redux';
import reducer from '../reducers/root.reducer';
let store=createStore(reducer);
export default store;