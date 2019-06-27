import React,{Component} from 'react';
import {connect} from 'react-redux';

import { withTranslation } from 'react-i18next';

let sharedM = require('../../modules/shared.module');
const mapStateToProps = (state) => {
  return {
    language:state.language,
  };
};


class LanguageMenu extends Component {
  
    constructor(props){
       super(props);
    }
    componentDidMount() {

    } 


  render() {
   return  <select value={this.props.language} onChange={(event)=>sharedM.changeLanguage(this,event)}>
   <option value="en">English</option>
   <option value="rs">Serbian</option>
   </select>;
  }
}
export default withTranslation()(connect(mapStateToProps)(LanguageMenu));
