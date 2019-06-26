const CHANGE_LANG="CHANGE_LANG";
module.exports.changeLanguage = function(lng){
    return {
        type:CHANGE_LANG,
        item: lng
    }
}