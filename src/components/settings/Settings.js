import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Button, Row, Col, ButtonToolbar } from 'react-bootstrap';

class Settings extends Component {

  render() {
    return (
      <Row style={{ top:"15px"}}>
        <Col>
          <ButtonToolbar>
            <Button variant="outline-dark">{this.props.t("export")}</Button>
            &nbsp;
            <Button variant="outline-dark">{this.props.t("enable")}</Button>
            &nbsp;
            <Button variant="outline-dark">{this.props.t("manage_accounts")}</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}
export default withTranslation('settings')(connect()(Settings));