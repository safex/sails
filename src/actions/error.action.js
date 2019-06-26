const SET_ERROR="SET_ERROR";
const REMOVE_ERROR="REMOVE_ERROR";
module.exports.setError = function(type){
    return {
        type:SET_ERROR,
        item: type
    }
}
module.exports.removeError = function(type){
    return {
        type:REMOVE_ERROR,
        item: type
    }
}