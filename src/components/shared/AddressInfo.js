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
    return (<Row>
      <Col>
        <Row>
          <Col>
            <ButtonToolbar >
              <ButtonGroup className="mr-2">
                <Button variant="primary">{this.props.t("copy")}</Button>
                <Button variant="info">{this.props.t("receive")}</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="secondary"> {this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.address : "X"} </Alert>
          </Col>
        </Row>
      </Col>
    </Row>);
  }
}
export default withTranslation('address_info')(connect(mapStateToProps)(AddressInfo));