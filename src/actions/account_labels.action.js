import {
    ACCOUNT_LABELS
} from './action.types';

let addAccountLabels = function (labels) {
    return {
        type: ACCOUNT_LABELS,
        item: labels
    }
}

export {
    addAccountLabels
}