import { processResponse, jsonResponse } from './response';
import { addError } from '../actions/error.action';

let { ipcRenderer } = window.require("electron");


let lordOfTheFetch = function (func, func_data = [], callback = null, callback_data = null, additional = null) {
    func(...func_data)
        .then(processResponse)
        .then(jsonResponse)
        .then((res) => {
            if (res.hasOwnProperty("status")) {
                if (res.status !== 0) {
                    if (res.result && res.result.msg === "Wallet is syncing") { setTimeout(lordOfTheFetch(func, func_data, callback, callback_data, additional), 8000); localStorage.setItem("sync_status", "sync"); }
                    else setTimeout((secondTry)(func, func_data, callback, callback_data, additional), 2000);
                }
                else if (callback) {
                    localStorage.setItem("sync_status", "up_to_date");
                    callback(...[res, ...callback_data]);
                }

            }
            else {
                if (callback)
                    callback(...[res, ...callback_data]);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log(error.message);
            if (error.message === "Failed to fetch") {
                console.log("failed to fetch")
                if (!localStorage.getItem("daemon_status") || localStorage.getItem("daemon_status") === "connected") {
                    ipcRenderer.send('rpc-crashed');
                    localStorage.setItem("daemon_status", "disconnected");
                }

            }
            else {
                if (additional && additional.hasOwnProperty("msg"))
                    console.log(additional.msg);
                if (additional && additional.hasOwnProperty("dispatch")) {
                    console.log(func.name);
                    console.log(error);
                    additional.dispatch(addError(error.message || error.statusText || error || 'UNKNOWN'));
                }
                else {
                    console.log(func.name);
                    console.log(error);
                }
            }

        });
}

let secondTry = function (func, func_data, callback, callback_data, additional) {
    func(...func_data)
        .then(processResponse)
        .then(jsonResponse)
        .then((res) => {
            if (callback) {
                localStorage.setItem("sync_status", "up_to_date");
                callback(...[res, ...callback_data]);
            }

        })
        .catch((error) => {
            if (error.message === "Failed to fetch") {
                if (!localStorage.getItem("daemon_status") || localStorage.getItem("daemon_status") === "connected") {
                    ipcRenderer.send('rpc-crashed');
                    localStorage.setItem("daemon_status", "disconnected");
                }
            }
            else {
                if (additional && additional.hasOwnProperty("msg"))
                    console.log(additional.msg);
                if (additional && additional.hasOwnProperty("dispatch")) {
                    console.log(func.name);
                    console.log(error);
                    additional.dispatch(addError(error.message || error.statusText || error || 'UNKNOWN'));
                }
                else {
                    throw new Error(error)
                }
            }

        });

}

export {
    lordOfTheFetch
}