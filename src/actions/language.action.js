import {CHANGE_LANG} from './action.types';
let changeLanguage = function(lng){
    return {
        type:CHANGE_LANG,
        item: lng
    }
}
export {
    changeLanguage
}