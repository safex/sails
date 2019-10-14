import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, ProgressBar } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};

class NetworkStatus extends Component {

  render() {
    return (
      <div style={{ marginLeft: "10px" }}>
        <Row>
          < Col > {this.props.t("network_status")} </ Col>
          <Col> {this.props.t("connected")}</Col>
        </Row>
        <Row>
          <Col>{this.props.t("bitcoin_network_status")} </Col>
          <Col>{this.props.t("disconnected")} </Col>
        </Row>
        <Row>
          <Col>{this.props.t("chain_sync")}</Col>
          <Col><ProgressBar now={((234 * 100.00) / 456)} label={`234/456`} /></Col>
        </Row>
      </div >
    );
  }
}
export default withTranslation('network_status')(connect(mapStateToProps)(NetworkStatus));