import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { getAccounts } from '../../modules/home.module';
import Account from './Account';

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  };
};

class Accounts extends Component {

  componentDidMount() {
    getAccounts(this.props.dispatch);
  }



  render() {
    let accounts = null;
    if (this.props.accounts) { accounts = Object.values(this.props.accounts).map((x, i) => { let rand = (Math.random() * 100) / 100; return <Account key={`account-0-${i}-${rand}`} account={x} /> }); }
    return (
      <>
        <Row>
          <Col>
            <h3>{this.props.t("accounts")}</h3>
          </Col>
        </Row>
        <Row style={{ maxHeight: "290px", height: "290px", overflowY: "auto" }}>
          <Col>
            {accounts}
          </Col>
        </Row>
      </>

    );
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Accounts));