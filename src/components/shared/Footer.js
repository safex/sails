import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import NetworkStatus from '../shared/NetworkStatus';
import AddressInfo from '../shared/AddressInfo';


class Footer extends Component {

  render() {
    return (
      <Row>
        <Col xs={4}><NetworkStatus /></Col>
        <Col xs={8}><AddressInfo /></Col>
      </Row>
    );
  }
}
export default withTranslation()(connect()(Footer));