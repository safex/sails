import {ADD_ERROR, REMOVE_ERROR} from '../actions/action.types';
let errorReducer = function (state =false, action){ 
    switch(action.type){
      case ADD_ERROR:
        return  action.item ;
      case REMOVE_ERROR:
        return false;
      default:
        return state;      
    }
}
export {errorReducer}