import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/root.reducer';
import thunk from 'redux-thunk';
let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;