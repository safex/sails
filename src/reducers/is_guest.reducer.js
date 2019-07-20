module.exports.isGuestReducer = function (state = true, action){ 
    switch(action.type){
        case 'LOGIN':
            return false;
        case 'LOGIN':
            return true;
        default:
            return state      
    }
}