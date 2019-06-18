import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import App from './components/shared/App';
import * as serviceWorker from './serviceWorker';
import store from './store/store'


let el=<Provider store={store}><App /></Provider>; //not necessary at the moment

ReactDOM.render(el, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
