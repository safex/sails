import {CHANGE_LANG} from '../actions/action.types'
let languageReducer = function (state = "en", action){ 
    switch(action.type){
      case CHANGE_LANG:
        return action.item;
      default:
        return state      
    }
}
export {
  languageReducer
}