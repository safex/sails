import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
let sfxM = require("../../modules/sfx.module");

const mapStateToProps = (state) => {
  return {
    active_account:state.active_account
  };
};
class SFX extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   (<div> 
     <p>{this.props.t("balance")}: {this.props.active_account?"":""}</p>
     <h1> SFX </h1>
     <input id="sfx_ammount" placeholder={this.props.t("ammount")} />
     <input id="sfx_pid" placeholder={this.props.t("pid")} />
     <input id="sfx_address" placeholder={this.props.t("address")}/>
     <input id="sfx_note" placeholder={this.props.t("note")}/>
     <button> {this.props.t('adjust')}</button>
     <button> {this.props.t('send')}</button>

     </div>);
  }
}
export default withTranslation('sfx')(connect(mapStateToProps)(SFX));