import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
    return <div>
      <p>{this.props.t("history")}</p>
      {transactions}
    </div>;
  }
}
export default withTranslation('home')(connect(mapStateToProps)(History));