import {
    ADD_DAEMON_HOST,
    ADD_DAEMON_PORT,
    ADD_DAEMON_MODAL
} from '../actions/action.types';
let daemonReducer = function (state = { host: '127.0.0.1', port: 38001, daemon_modal: false }, action) {

    switch (action.type) {
        case ADD_DAEMON_HOST:
            return { ...state, host: action.item };
        case ADD_DAEMON_PORT:
            return { ...state, port: action.item };
        case ADD_DAEMON_MODAL:
            return { ...state, daemon_modal: action.item };
        default:
            return state;
    }
}
export { daemonReducer }