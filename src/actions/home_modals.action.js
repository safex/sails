import {
    HOME_MODAL
} from './action.types';

let addHomeModal = function (modal) {
    return {
        type: HOME_MODAL,
        item: modal
    }
}

export {
    addHomeModal
}