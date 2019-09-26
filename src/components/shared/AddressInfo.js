import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Button, ButtonGroup, ButtonToolbar, Alert } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};

class AddressInfo extends Component {

  render() {
    return (
      <div >
        <Row>
          <Col>
            <ButtonToolbar className="justify-content-end">
              <Button variant="outline-primary">{this.props.t("copy")}</Button> &nbsp;
              <Button variant="outline-info">{this.props.t("receive")}</Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Alert variant="secondary" style={{ "word-break": "break-all" }}> {this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.address : ""} </Alert>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withTranslation('address_info')(connect(mapStateToProps)(AddressInfo));