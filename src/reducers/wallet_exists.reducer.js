import { WALLET_EXISTS } from '../actions/action.types';


let walletExistsReducer = function (state = false, action) {
  switch (action.type) {
    case WALLET_EXISTS:
      return action.item;
    default:
      return state;
  }
}

export {
  walletExistsReducer
};
