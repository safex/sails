import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import NetworkStatus from '../shared/NetworkStatus';
import AddressInfo from '../shared/AddressInfo';


class Footer extends Component {

  render() {
    return (
      <>
        <Row style={
          {
            position: "absolute",
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%"

          }
        }>
          <Col md={4} xs={12}><NetworkStatus /></Col>
          <Col md={8} xs={12}><AddressInfo /></Col>
        </Row >
      </>


    );
  }
}
export default withTranslation()(connect()(Footer));