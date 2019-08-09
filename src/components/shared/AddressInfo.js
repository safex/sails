import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};

class AddressInfo extends Component {

  render() {
    return <div>
      <button>{this.props.t("copy")}</button>
      <button>{this.props.t("qr_code")}</button>
      <p>{this.props.t("receive")}</p>
      <p>{this.props.active_account ? this.props.active_account.address : "X"}</p>
    </div>;
  }
}
export default withTranslation('address_info')(connect(mapStateToProps)(AddressInfo));