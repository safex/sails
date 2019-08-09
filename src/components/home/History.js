import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {  Row, Col } from 'react-bootstrap';
import Transaction from './Transaction';

const mapStateToProps = (state) => {
  return {
    history: state.history,
    active_account: state.active_account
  };
};

class History extends Component {

  render() {
    let transactions = this.props.history.map((x) => { return <Transaction transaction={x} /> });
    return (
      <>
        <Row>
          <Col>
            <h2>{this.props.t("history")}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {transactions}
          </Col>
        </Row>
      </>
    );
  }
}
export default withTranslation('home')(connect(mapStateToProps)(History));