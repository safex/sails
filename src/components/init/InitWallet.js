import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
let initM = require('../../modules/init.module');

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists
  };
};


class InitWallet extends Component {
  
    constructor(props){
       super(props);
    }
    componentDidMount() {
        initM.checkIfFileExists(this);

    } 


  render() {
    
    let loginB=<div><Link to='/login'><button> {this.props.t("login.button")}</button></Link> <p>{this.props.t("login.description")}</p></div>;
    let createB=<div><Link to='/create'><button>{this.props.t('create.button')}</button></Link><p>{this.props.t('create.description')}</p></div>;
    let openB = <div><Link to='/open'><button>{this.props.t('open.button')}</button></Link><p>{this.props.t('open.description')}</p></div>;
    let restoreB=<div><Link to='/restore'><button>{this.props.t('restore.button')}</button></Link><p>{this.props.t('restore.description')}</p></div>;
    let backB=<div><button onClick={()=>{initM.setWalletExistsToFalse(this)}}>{this.props.t('back.button')}</button><p>{this.props.t('back.description')}</p></div>;
   return   <div>
                { this.props.wallet_exists? loginB:createB }
                { this.props.wallet_exists? backB:openB }
                { this.props.wallet_exists? '':restoreB }
                <Link to='/w/home'><button>Wallet</button></Link>
            </div>
  }
}
export default withTranslation('init')(connect(mapStateToProps)(InitWallet));
