import {ADD_OPEN_DATA} from '../actions/action.types';

let openReducer = function (state = {} , action){ 
    switch(action.type){
        case ADD_OPEN_DATA:
            return {...state, ...action.item};
        default:
            return state;      
    }
}
export {
    openReducer
}