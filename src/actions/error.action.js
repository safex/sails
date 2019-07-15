import {ADD_ERROR, REMOVE_ERROR} from './action.types';

let addError = function(error){
    return {
        type:ADD_ERROR,
        item: error
    }
}
let removeError = function(){
    return {
        type:REMOVE_ERROR
    }
}

export {
    addError,
    removeError
}