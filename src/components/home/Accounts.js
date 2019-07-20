import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import Account from './Account';
import {getAccounts, getLegacyAccounts} from '../../modules/home.module';
let homeM = require('../../modules/home.module');

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    legacy_accounts:state.legacy_accounts,
    active_account:state.active_account
  };
};

class Accounts extends Component {
  
    componentDidMount(){
      // getAccounts(this.props.dispatch);
      // getLegacyAccounts(this.props.dispatch);
    }



    render() {
        let accounts;
        for(let address in this.props.accounts){
          accounts+=<Account account={this.props.accounts[address]} type={1} /> ;
        }
        for(let address in this.props.legacy_accounts){
          accounts+=<Account account={this.props.accounts[address]} type={0} /> ;
        }
        return   <div>
        {accounts}
        <button onClick={()=>{}}>{this.props.t("accounts.add")}</button>
         </div>
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Accounts));