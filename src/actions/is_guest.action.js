const LOGIN= "LOGIN";
const LOGOUT='LOGOUT';
module.exports.login = function(){
    return {
        type:LOGIN
    }
}
module.exports.logout = function(){
    return {
        type:LOGOUT
    }
}