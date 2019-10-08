import React, { Component } from 'react';
import TopMenu from '../shared/TopMenu';
import Footer from '../shared/Footer'
import ErrorResponse from '../shared/ErrorResponse';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import routes_second from '../../setups/routes_second';
import { Row, Col, Spinner, Container } from 'react-bootstrap';

class Wallet extends Component {



  render() {

    return (
      <>
        <TopMenu />
        <Container>
          <ErrorResponse />
          {this.props.spinner ? <Row><Col sm={{ offset: 5 }}><Spinner animation="border" role="status" /> </Col></Row> : ""}
          {routes_second}
        </Container>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spinner: state.spinner
  }
}
export default withTranslation()(connect(mapStateToProps)(Wallet));
