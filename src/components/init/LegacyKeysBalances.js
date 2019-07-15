import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { addCreateWizardData, createWizardBack, createWizardNext, removeCreateWizardData , create} from '../../modules/init.module';
let { chooseWalletFile, addLegacyWizardData, legacyWizardNext, legacyWizardBack, openLegacy } = require('../../modules/init.module');

const mapStateToProps = (state) => {
  return {
    legacy_wizard: state.legacy_wizard,
    legacy_wallet:state.legacy_wallet
  };
};

class LegacyKeysBalances extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
   
    let options = {
      title: this.props.t("create.form.choose_filepath")
    };
    let file_location = this.props.legacy_wizard.data.hasOwnProperty("create_filepath") ? this.props.legacy_wizard.data.create_filepath : this.props.t("create.form.choose_filepath");
    return (
    <div>
      {
          /*
      <h1>{this.props.t("login.form.legacy_detected")}</h1>;
      <p>{this.props.t("detected")} :</p>

      <p>{this.props.t("bitcoin_key_sets")} :</p>
      <p>{this.props.t("bitcoins_on_all_wallets")} :</p>
      <p>{this.props.t("safe_exchange_coins_total")} :</p>
      <p>{this.props.t("safex_key_sets")} :</p>
      <p>{this.props.t("safex_tokens")} :</p>
      <p>{this.props.t("safex_cash")} :</p>

      <button>{this.props.t("view_keys_balance")} </button>

      <label>{file_location}</label>
      <button onClick={() => { chooseCreateFilepath(this.props.dispatch, options, "legacy") }}>{this.props.t("browse_button")}</button>

      <label>{this.props.t("create.form.wallet_name_label")} </label>
      <input value={this.props.legacy_wizard.data.hasOwnProperty('create_wallet_name') ? this.props.legacy_wizard.data.create_wallet_name : ''} type="text" id="create_name" onChange={(event) => { addLegacyWizardData(this.props.dispatch, { create_wallet_name: event.target.value }) }} placeholder={this.props.t("create.form.wallet_name")} />
        
      <label>{this.props.t("create.form.password")}</label>
      <input value={this.props.legacy_wizard.data.hasOwnProperty('create_password') ? this.props.legacy_wizard.data.create_password : ''} type="password" id="create_password" onChange={(event) => { addLegacyWizardData(this.props.dispatch, { create_password: event.target.value }) }} placeholder={this.props.t("create.form.password")} />
        
      <label>{this.props.t("create.form.repeat_password")}</label>
      <input value={this.props.legacy_wizard.data.hasOwnProperty('create_repeat_password') ? this.props.legacy_wizard.data.create_repeat_password : ''} type="password" id="create_password_repeat" onChange={(event) => { addLegacyWizardData(this.props.dispatch, { create_repeat_password: event.target.value }) }} placeholder={this.props.t("create.form.repeat_password")} />
        
      <p>
      {this.props.t("legacy_create_desc")}
      </p>
     
      <button onClick={() => { createWizardNext(this.props.dispatch) }}>{this.props.t('next_button')}</button> */
     }
    </div>
    );

  }
}
export default  withTranslation('init')(connect(mapStateToProps)(LegacyKeysBalances));