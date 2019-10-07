import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Legacy, Main } from './index';
import { checkIfFileExists } from '../../modules/init.module';


const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists
  };
};


class InitWallet extends Component {

  componentDidMount() {
    checkIfFileExists(this.props.dispatch);
  }


  render() {
    return (<div>{this.props.wallet_exists ? <Legacy key="legacy" /> : <Main key="main" />}</div>)


  }
}
export default withTranslation('init')(connect(mapStateToProps)(InitWallet));
