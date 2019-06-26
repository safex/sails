let languageAction=require('../actions/language.action.js');
module.exports.changeLanguage= function(that, event){
    that.props.dispatch(languageAction.changeLanguage(event.target.value));
    that.props.i18n.changeLanguage(event.target.value);   
}