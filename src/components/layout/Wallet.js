import React, { Component } from 'react';
import TopMenu from '../shared/TopMenu';
import Footer from '../shared/Footer'
import ErrorResponse from '../shared/ErrorResponse';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import routes_second from '../../setups/routes_second';

class Wallet extends Component {


  render() {
    return (
      <>
        <TopMenu />
        <ErrorResponse />
        {routes_second}
        <Footer />
      </>
    );
  }
}
export default withTranslation()(connect()(Wallet));
