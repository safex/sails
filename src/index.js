import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './setups/serviceWorker';
import store from './redux/store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './setups/i18n';
import App from './components/layout/App';


ReactDOM.render(<I18nextProvider i18n={i18n}><Provider store={store}><div><App/></div></Provider></I18nextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
