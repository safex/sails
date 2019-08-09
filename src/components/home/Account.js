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

    return (
      <Button variant={this.props.type ? "default" : "info"} size="lg" onClick={() => { setActiveAccount(this.dispatch, { account: this.props.account, type: this.props.type }) }} block>
        {this.props.account.label}
      </Button>);
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Account));