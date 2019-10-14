import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Button, Row, Col } from 'react-bootstrap';

import { setActiveAccount } from '../../modules/home.module';



class Account extends Component {

  render() {
    let variant = "secondary";
    if (this.props.active_account && this.props.hasOwnProperty("account") && this.props.active_account !== undefined && this.props.account !== undefined) {
      if (this.props.active_account.address === this.props.account.address) { variant = "dark"; }
    }

    return (
      <Row>
        <Col>
          <Button variant={variant} size="lg" onClick={setActiveAccount.bind(this)} block>
            {this.props.account.label || "Enter your label here"}
          </Button>
        </Col>
      </Row>);
  }
}

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};
export default withTranslation('home')(connect(mapStateToProps)(Account));