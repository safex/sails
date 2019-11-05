import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './setups/serviceWorker';
import store from './store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './setups/i18n';
import App from './components/layout/App';
import { setPort } from './actions/rpc_config.action';
import history from "./setups/history";
import { open } from './modules/init.module';

let { ipcRenderer } = window.require("electron");
ipcRenderer.once('receive-port', ((event, arg) => {
    store.dispatch(setPort(arg));
    localStorage.clear();
    localStorage.setItem("port", arg);

}));
ipcRenderer.send('react-is-ready-to-receive-port');

ipcRenderer.on('rpc-restored', ((event) => {
    if (localStorage.getItem("path") && localStorage.getItem("pwd")) {
        let port = localStorage.getItem("port");
        let daemon = localStorage.getItem("daemon") ? JSON.parse(localStorage.getItem("daemon")) : {};
        let pwd = localStorage.getItem("pwd");
        let path = localStorage.getItem("path");
        localStorage.clear();
        if (port) localStorage.setItem('port', port);
        if (daemon) localStorage.setItem("daemon", JSON.stringify(daemon));
        localStorage.setItem("path", path);
        localStorage.setItem("pwd", pwd);
        localStorage.setItem("daemon_status", "connected");
        console.log("TRY TO REOPEN");
        setTimeout(() => { open(store.dispatch, history, { filepath: path.trim(), password: pwd.trim() }, ["filepath", "password"], daemon); }, 2000);

    }
    else {
        let port = localStorage.getItem("port");
        localStorage.clear();
        if (port) localStorage.setItem('port', port);
        localStorage.setItem("daemon_status", "connected");
        history.push('/');
    }

}));

ipcRenderer.on('rpc-not-restored', ((event) => {
    console.log("RPC NOT RESTORED");
}));
ipcRenderer.on('rpc-not-crashed', ((event) => {
    console.log("RPC NOT CRASHED");
    localStorage.setItem("daemon_status", "connected");
}));
ReactDOM.render(<I18nextProvider i18n={i18n}><Provider store={store}><div><App /></div></Provider></I18nextProvider>, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
