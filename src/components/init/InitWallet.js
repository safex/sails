import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Legacy, Main } from './index';
import { checkIfFileExists } from '../../redux/actions/wallet_exists.action';


class InitWallet extends Component {

  componentDidMount() {
    this.props.checkIfFileExists();
  }


  render() {
    return (<div>{this.props.wallet_exists ? <Legacy key="legacy" /> : <Main key="main" />}</div>)
  }
}
const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkIfFileExists: () => dispatch(checkIfFileExists())
  };
}
export default withTranslation('init')(connect(mapStateToProps, mapDispatchToProps)(InitWallet));
