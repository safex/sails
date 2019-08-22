import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};

class NetworkStatus extends Component {

  render() {
    return (
      <Row>
        <Col>
          <Row>
            <Col>{this.props.t("network_status")} </Col>
            <Col> {this.props.t("connected")}</Col>
          </Row>
          <Row>
            <Col>{this.props.t("bitcoin_network_status")} </Col>
            <Col>{this.props.t("disconnected")} </Col>
          </Row>
          <Row>
            <Col>{this.props.t("chain_sync")}</Col>
            <Col>123/456</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default withTranslation('network_status')(connect(mapStateToProps)(NetworkStatus));