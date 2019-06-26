import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LanguageMenu from '../shared/LanguageMenu';
import { withTranslation } from 'react-i18next';
let initM = require('../../modules/init.module');

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    language:state.language,
    error:state.error
  };
};


class Open extends Component {
  componentDidMount() {
  } 

  render() {
   return   <div><LanguageMenu/>
                <input type="file" id="open_file" onChange={()=>{}}/>
                <input type="password" id="open_password"  onChange={()=>{}}/>
                <button onClick={()=>{initM.open(this, document.getElementById("open_file").files[0].path, document.getElementById("open_password").val )}}> {this.props.t("open.form.button")}</button>
            
            <Link to='/'><button>{this.props.t('back_button')}</button></Link></div>
  }
}
export default withTranslation('init')(connect(mapStateToProps)(Open));