import {ADD_ACTIVE_ACCOUNT} from '../actions/action.types';

let activeAccountReducer = function (state = {} , action){ 
    switch(action.type){
        case ADD_ACTIVE_ACCOUNT:
            return action.item;
        default:
            return state;      
    }
}
export {
    activeAccountReducer
}