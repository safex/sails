import { ADD_ERROR, REMOVE_ERROR } from './action.types';

export const addError = function (error) {
    return (dispatch) => {
        dispatch({
            type: ADD_ERROR,
            item: error
        });
    }
}
export const removeError = function () {
    return (dispatch) => {
        dispatch({
            type: REMOVE_ERROR
        });
    }
}
