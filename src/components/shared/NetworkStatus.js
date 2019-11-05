import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, ProgressBar } from 'react-bootstrap';


class NetworkStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { network_status: "connected", daemon_status: "connected", sync_status: "sync" }

  }
  componentDidMount() {
    //timer to check local storage and update state
    setInterval(() => {
      let ns = navigator.onLine ? "connected" : "disconnected";
      localStorage.setItem("network_status", ns);
      this.setState({ network_status: ns, daemon_status: localStorage.getItem("daemon_status") || "connected", sync_status: localStorage.getItem("sync_status") || "sync" })
    }, 5000);

  }
  render() {
    return (
      <div style={{ marginLeft: "10px" }}>
        <Row>
          <Col>{this.props.t("network_status")} </Col>
          <Col key={`ns-${this.state.network_status}`}> {this.props.t(this.state.network_status)}</Col>
        </Row>
        <Row>
          <Col>{this.props.t("daemon_status")} </Col>
          <Col key={`ds-${this.state.daemon_status}`} >{this.props.t(this.state.daemon_status)} </Col>
        </Row>
        <Row>
          <Col>{this.props.t("chain_sync")}</Col>
          <Col><ProgressBar now={((234 * 100.00) / 456)} label={`234/456`} /></Col>
        </Row>
      </div>
    );
  }
}
export default withTranslation('network_status')(NetworkStatus);