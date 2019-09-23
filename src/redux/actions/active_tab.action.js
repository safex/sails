import { ADD_ACTIVE_TAB } from './action.types';

let addActiveTab = function (tab) {
    return {
        TYPE: ADD_ACTIVE_TAB,
        item: tab
    }
}

export {
    addActiveTab
}