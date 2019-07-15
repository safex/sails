import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
let homeM = require('../../modules/home.module');

const mapStateToProps = (state) => {
  return {
    active_account:state.active_account
  };
};

class Account extends Component {
  
    constructor(props){
       super(props);
    }


    render() {

        return   <div onClick={homeM.setActiveAccount(this.dispatch,{account:this.props.account, type:this.props.type})}> Account X </div>;
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Account));