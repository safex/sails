import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
let sharedM = require('../../modules/shared.module');

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab:state.active_tab,
    lang:state.language,
    accounts: state.accounts
  };
};


class NetworkStatus extends Component {
  componentDidMount() {

   } 

  render() {
    
   return   <div>
               
            </div>
  }
}
export default connect(mapStateToProps)(NetworkStatus);