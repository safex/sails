import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class Settings extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div> <h1> Settings </h1>
   <button>{this.props.t("export")}</button>
   <button>{this.props.t("enable")}</button>
   </div>
  }
}
export default withTranslation('settings')(connect()(Settings));