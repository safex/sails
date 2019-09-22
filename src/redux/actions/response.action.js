const ADD_RESPONSE = "ADD_RESPONSE";
module.exports.addResponse = function(msg){
    return {
        type:ADD_RESPONSE,
        item: msg
    }
}