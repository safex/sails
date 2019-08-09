
let responseReducer = function (state = "", action) {
  switch (action.type) {
    case 'ADD_RESPONSE':
      return action.item;
    default:
      return state
  }
}
export { responseReducer }