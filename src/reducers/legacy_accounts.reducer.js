import {ADD_LEGACY_ACCOUNT, REMOVE_LEGACY_ACCOUNT, ADD_LEGACY_ACCOUNTS} from '../actions/action.types';
let legacyAccountsReducer = function (state = {} , action){ 
    switch(action.type){
        case ADD_LEGACY_ACCOUNT:
            let stA={...state};
            stA[action.item.address]= action.item;
            return stA;
        case REMOVE_LEGACY_ACCOUNT:
            let stR={...state};
            delete stR[action.item]
            return stR;
        case ADD_LEGACY_ACCOUNTS:
            return action.item;
        default:
            return state      
    }
}
export {legacyAccountsReducer}