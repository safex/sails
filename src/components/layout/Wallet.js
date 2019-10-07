import React, { Component } from 'react';
import TopMenu from '../shared/TopMenu';
import Footer from '../shared/Footer'
import ErrorResponse from '../shared/ErrorResponse';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import routes_second from '../../setups/routes_second';
import { Container } from 'react-bootstrap';

class Wallet extends Component {


  render() {
    return (
      <>
        <TopMenu />
        <Container>
          <ErrorResponse />
          {routes_second}
        </Container>
        <Footer />
      </>
    );
  }
}
export default withTranslation()(connect()(Wallet));
