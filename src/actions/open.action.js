import {ADD_OPEN_DATA} from './action.types';


let addOpenData = function(data){
    return {
        type:ADD_OPEN_DATA,
        item: data
    }
}

export {
    addOpenData
}