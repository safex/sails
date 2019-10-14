import { RPC_PORT } from '../actions/action.types';
let rpcConfigReducer = function (state = 2905, action) {
    switch (action.type) {
        case RPC_PORT:
            return action.item;
        default:
            return state
    }
}
export { rpcConfigReducer }