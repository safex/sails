let languageAction=require('../actions/language.action.js');
let activeAccountAction=require('../actions/active_account.action.js');

module.exports.changeLanguage= function(that, event){
    that.props.dispatch(languageAction.changeLanguage(event.target.value));
    that.props.i18n.changeLanguage(event.target.value);   
}

module.exports.setActiveAccount= function(){  
}

module.exports.getActiveAccount= function(){  
}
