module.exports.languageReducer = function (state = "en", action){ 
    switch(action.type){
      case 'CHANGE_LANG':
        return action.item;
      default:
        return state      
    }
}