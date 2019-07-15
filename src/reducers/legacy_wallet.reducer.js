import {ADD_LEGACY_WALLET, REMOVE_LEGACY_WALLET} from '../actions/action.types';
let legacyWalletReducer = function (state = {}, action){ 
    switch(action.type){
        case ADD_LEGACY_WALLET:
            return action.item;
        case REMOVE_LEGACY_WALLET:
            return {};
        default:
            return state      
    }
}
export {legacyWalletReducer}