import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import Transaction from './Transaction';

const mapStateToProps = (state) => {
  return {
    historyT: state.history,
    active_account: state.active_account
  };
};


class History extends Component {

  render() {

    let history = [];
    if (this.props.active_account.type === 1) {
      history = this.props.historyT || [];
    }
    else {
      history = this.props.historyT.hasOwnProperty("ntx") ? Object.values(this.props.historyT) : [];
    }
    let transactions = null;
    if (Array.isArray(history)) {
      transactions = history.map((x, i) => { let rand = (Math.random() * 1000) / 1000; return <Transaction key={`transaction-${i}-${rand}`} transaction={x} /> });
    }

    return (
      <>
        <Row>
          <Col>
            <h2>{this.props.t("history")}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            Number of transactions: {this.props.historyT.hasOwnProperty("ntx") ? this.props.historyT.ntx : this.props.historyT.length}
            {transactions}
          </Col>
        </Row>
      </>
    );
  }
}
export default withTranslation('home')(connect(mapStateToProps)(History));