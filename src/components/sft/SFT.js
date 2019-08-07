import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};
class SFT extends Component {

  render() {
    return (<div>
      <p>{this.props.t("balance")}: {this.props.active_account ? "" : ""}</p>
      <h1> SFT </h1>
      <input id="sft_ammount" placeholder={this.props.t("ammount")} />
      <input id="sft_pid" placeholder={this.props.t("pid")} />
      <input id="sft_address" placeholder={this.props.t("address")} />
      <input id="sft_note" placeholder={this.props.t("note")} />
      <button> {this.props.t('adjust')}</button>
      <button> {this.props.t('send')}</button>

    </div>);
  }
}
export default withTranslation('sft')(connect(mapStateToProps)(SFT));