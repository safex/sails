import {
    SPINNER_START,
    SPINNER_END
} from './action.types';

let spinnerStart = function () {
    return {
        type: SPINNER_START
    }
}

let spinnerEnd = function () {
    return {
        type: SPINNER_END
    }
}

export {
    spinnerStart,
    spinnerEnd
}