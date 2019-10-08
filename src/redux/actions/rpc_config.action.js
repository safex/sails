import {
    RPC_PORT
} from './action.types';

export const setPort = function (port) {
    return {
        type: RPC_PORT,
        item: port
    }
}