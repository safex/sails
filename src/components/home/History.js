import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import Transaction from './Transaction';

const mapStateToProps = (state) => {
  return {
    history: state.history,
    active_account: state.active_account
  };
};


class History extends Component {

  render() {

    let history = null;
    if (this.props.history) { history = Object.values(this.props.history); }

    let transactions = history.map((x, i) => { let rand = (Math.random() * 1000) / 1000; return <Transaction key={`transaction-${i}-${rand}`} transaction={x} /> });


    return (
      <>
        <Row>
          <Col>
            <h3>{this.props.t("history")}</h3>
          </Col>
        </Row>
        <Row style={{ maxHeight: "290px", "height": "290px", overflowY: "auto" }}>
          <Col>
            Number of transactions: {this.props.history.hasOwnProperty("ntx") ? this.props.history.ntx : 0}
            {transactions}
          </Col>
        </Row>
      </>
    );
  }
}
export default withTranslation('home')(connect(mapStateToProps)(History));