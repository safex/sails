
module.exports.errorReducer = function (state = [], action){ 
    switch(action.type){
      case 'SET_ERROR':
        return  [...state, action.item] ;
      case 'REMOVE_ERROR':
        return state.slice(state.indexOf(action.item),1);
      default:
        return state;      
    }
}