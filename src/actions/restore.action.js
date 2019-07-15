import {ADD_RESTORE_DATA} from './action.types';


let addRestoreData = function(data){
    return {
        type:ADD_RESTORE_DATA,
        item: data
    }
}

export {
    addRestoreData
}