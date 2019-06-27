import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import Account from './Account';
let homeM = require('../../modules/home.module');

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    active_account:state.active_account
  };
};

class Accounts extends Component {
  
    constructor(props){
       super(props);
    }


    render() {
        let accounts=this.props.accounts.map((x)=>{return <Account account={x}/>});
        return   <div>
        {accounts}
        <button onClick={()=>{}}>{this.props.t("accounts.add")}</button>
         </div>
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Accounts));