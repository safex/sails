import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { LEGACY_DEFAULT_WALLET_PATH } from '../../setups/conf';
let { chooseWalletFile, addLegacyWizardData, legacyWizardNext, legacyWizardBack, openLegacy } = require('../../modules/init.module');

const mapStateToProps = (state) => {
  return {
    legacy_wizard: state.legacy_wizard
  };
};

class LegacyLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
   
  }


  render() {

    if (this.props.type == "default") {
      if ((!this.props.legacy_wizard.data.hasOwnProperty("legacy_filepath"))) {
        addLegacyWizardData(this.props.dispatch,{legacy_filepath:LEGACY_DEFAULT_WALLET_PATH});
      }
      else if (this.props.legacy_wizard.data.legacy_filepath != LEGACY_DEFAULT_WALLET_PATH) {
        addLegacyWizardData(this.props.dispatch,{legacy_filepath:LEGACY_DEFAULT_WALLET_PATH});
      }
    }
    let options = {
      title: this.props.t("create.form.choose_filepath"),
      filters: [
        { name: 'v7 Wallet', extensions: ['dat'] },
      ]
    };


    let file_button = <button onClick={() => { chooseWalletFile(this.props.dispatch, options, "legacy") }}>{this.props.t("create.form.choose_filepath")}</button>;
    let file_location = this.props.legacy_wizard.data.hasOwnProperty("legacy_filepath") ? this.props.legacy_wizard.data.legacy_filepath : "";
    let detected_label = <h1>{this.props.t("login.form.legacy_detected")}</h1>;
    return <div>
      <div>
        {this.props.type != "default" ? file_button : detected_label}
        <p>{file_location}</p>

        <input id="login_pwd" type="password" onChange={(event) => { addLegacyWizardData(this.props.dispatch, {legacy_password: event.target.value}) }} placeholder={this.props.t('login.form.password')} />
        <button onClick={() => { legacyWizardNext(this.props.dispatch, openLegacy,[this.props.dispatch,this.props.legacy_wizard.data]) }}>{this.props.t('login.form.button')}</button>
        <button onClick={() => { legacyWizardBack(this.props.dispatch,['legacy_password','legacy_filepath'],(history)=>{ history.push('/');},[this.props.history]) }}>{this.props.t('back_button')}</button>

      </div>
    </div>
  }
}
export default withTranslation('init')(connect(mapStateToProps)(LegacyLogin));
