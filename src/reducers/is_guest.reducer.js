let isGuestReducer = function (state = true, action){ 
    switch(action.type){
        case 'LOGIN':
            return false;
        case 'LOGOUT':
            return true;
        default:
            return state      
    }
}
export {
    isGuestReducer
}