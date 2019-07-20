import {ADD_ACCOUNT, REMOVE_ACCOUNT, ADD_ACCOUNTS} from '../actions/action.types';
let accountsReducer = function (state = {} , action){ 
    switch(action.type){
        case ADD_ACCOUNT:
            let stA={...state};
            stA[action.item.address]= action.item;
            return stA;
        case REMOVE_ACCOUNT:
            let stR={...state};
            delete stR[action.item]
            return stR;
        case ADD_ACCOUNTS:
            let accounts=action.item.reduce((acc, cur, i) => {
                acc[cur.address] = cur;
                return acc;
              }, {});
            return {...state,...accounts};
        default:
            return state      
    }
}
export {accountsReducer}