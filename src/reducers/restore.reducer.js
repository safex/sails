import {ADD_RESTORE_DATA} from '../actions/action.types';

let restoreReducer = function (state = {} , action){ 
    switch(action.type){
        case ADD_RESTORE_DATA:
            return {...state, ...action.item};
        default:
            return state;      
    }
}
export {
    restoreReducer
}