import { processResponse, jsonResponse } from './response';
import { addError } from '../actions/error.action';

let lordOfTheFetch = function (func, func_data = [], callback = null, callback_data = null, additional = null) {
    func(...func_data)
        .then(processResponse)
        .then(jsonResponse)
        .then((res) => {
            if(res.status!==0){
               setTimeout((secondTry)(func,func_data, callback, callback_data, additional),2000)
            }
            else if (callback)
                callback(...[res, ...callback_data]);
        })
        .catch((error) => {
            if (additional && additional.hasOwnProperty("msg"))
                console.log(additional.msg);
            if (additional && additional.hasOwnProperty("dispatch")) {
                console.log(error);
                additional.dispatch(addError(error.statusText));
            }
            else {
                throw new Error(error)
            }
        });
}

let secondTry = function(func, func_data, callback, callback_data, additional){
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
            console.log(error);
            additional.dispatch(addError(error.statusText));
        }
        else {
            throw new Error(error)
        }
    });

}

export {
    lordOfTheFetch
}