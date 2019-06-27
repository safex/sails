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


class Login extends Component {
  constructor(props){
    super(props);
 }

  render() {
    return   <div>
                <div>
                    <label >{this.props.t('login.form.label')}</label>
                    <input id="login_pwd" type="password" onChange = {()=>{}}/>
                    <button onClick={()=>{initM.login(this, document.getElementById('login_pwd').value)}}>{this.props.t('login.form.button')}</button>
                    <Link to='/'><button>{this.props.t('back_button')}</button></Link>
                </div>
            </div>
  }
}
export default  withTranslation('init')(connect(mapStateToProps)(Login));
