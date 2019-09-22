import { ADD_DAEMON_HOST, ADD_DAEMON_PORT, ADD_DAEMON_MODAL } from './action.types';

let addDaemonHost = function (host) {
    return {
        type: ADD_DAEMON_HOST,
        item: host
    };
}

let addDaemonPort = function (port) {
    return {
        type: ADD_DAEMON_PORT,
        item: port
    };
}

let addDaemonModal = function (show) {
    return {
        type: ADD_DAEMON_MODAL,
        item: show
    };
}

export {
    addDaemonHost,
    addDaemonPort,
    addDaemonModal
}