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
    let variant = this.props.type !== 1 ? "secondary" : "light";
    if (this.props.active_account.hasOwnProperty("account") && this.props.hasOwnProperty("account")) {
      if (this.props.active_account.account.address === this.props.account.address) { variant = "dark"; }
    }
    return (
      <Button variant={variant} size="lg" onClick={() => { setActiveAccount(this.props.dispatch, { account: this.props.account, type: this.props.type }) }} block>
        {this.props.account.label}
      </Button>);
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Account));