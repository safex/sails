import { processResponse, jsonResponse } from './response';
import { addError } from '../actions/error.action';

let lordOfTheFetch = function (func, func_data = [], callback = null, callback_data = null, additional = null) {
    func(...func_data)
        .then(processResponse)
        .then(jsonResponse)
        .then((res) => {
            if (res.hasOwnProperty("status")) {
                if (res.status !== 0) {

                    if (res.status === 4) throw Error(res.status);
                    if (res.status === 5) throw Error(res.status);
                    if (res.status === 6) throw Error(res.status);
                    if (res.result.msg === "Wallet is syncing") setTimeout(lordOfTheFetch(func, func_data, callback, callback_data, additional), 6000);
                    else setTimeout((secondTry)(func, func_data, callback, callback_data, additional), 2000);
                }
                else if (callback)
                    callback(...[res, ...callback_data]);
            }
            else {
                if (callback)
                    callback(...[res, ...callback_data]);
            }
        })
        .catch((error) => {
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
        });
}

let secondTry = function (func, func_data, callback, callback_data, additional) {
    func(...func_data)
        .then(processResponse)
        .then(jsonResponse)
        .then((res) => {
            if (callback)
                callback(...[res, ...callback_data]);
        })
        .catch((error) => {
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
        });

}

export {
    lordOfTheFetch
}