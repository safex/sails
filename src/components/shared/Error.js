import React,{Component} from 'react';
import {connect} from 'react-redux';

import { withTranslation } from 'react-i18next';
import error_types from '../../setups/error_types';

let sharedM = require('../../modules/shared.module');
const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    language:state.language,
    error:state.error
  };
};


class LanguageMenu extends Component {
  
    constructor(props){
       super(props);
    }
    componentDidMount() {

    } 


  render() {
      let el=this.props.error.map((x)=>{
          return <p>{this.props.t(x)}</p>
      });
   return  <div>{el}</div>;
  }
}
export default withTranslation('error')(connect(mapStateToProps)(LanguageMenu));