import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { setActiveAccount } from '../../modules/home.module';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};

class Account extends Component {

  render() {
    console.log(this.props.account);
    let variant = this.props.type !== 1 ? "secondary" : "light";
    if (this.props.active_account.hasOwnProperty("account") && this.props.hasOwnProperty("account") && this.props.active_account.account!==undefined && this.props.account!==undefined) {
      if (this.props.active_account.account.address === this.props.account.address) { variant = "dark"; }
    }

    return (
      <Button variant={variant} size="lg" onClick={setActiveAccount.bind(this)} block>
        {this.props.account.label}
      </Button>);

      //
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Account));