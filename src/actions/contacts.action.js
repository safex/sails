const ADD_CONTACT="ADD_CONTACT";
const REMOVE_CONTACT="REMOVE_CONTACT";
module.exports.addContact = function(contact){
    return {
        type:ADD_CONTACT,
        item: contact
    }
}
module.exports.removeContact = function(contact){
    return {
        type:REMOVE_CONTACT,
        item: contact
    }
}