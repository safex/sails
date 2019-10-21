import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Legacy, Main } from './index';
import { checkIfFileExists } from '../../modules/init.module';
import { connectToDaemon } from '../../modules/shared.module';
import ErrorResponse from '../shared/ErrorResponse';


const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists
  };
};


class InitWallet extends Component {

  componentDidMount() {
    checkIfFileExists(this.props.dispatch);
    connectToDaemon.bind(this)();
  }


  render() {
    return (
      <div>
        <ErrorResponse />
        {this.props.wallet_exists ? <Legacy key="legacy" /> : <Main key="main" />}
      </div>
    );


  }
}
export default withTranslation('init')(connect(mapStateToProps)(InitWallet));
