import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Alert } from 'react-bootstrap';


class Transaction extends Component {

  render() {
    return (
      <>
        <Row>
          <Col>
            <Alert key={`alert-${this.props.key}`} variant="light">
              {JSON.stringify(this.props.transaction)}
            </Alert>
          </Col>
        </Row>
      </>
    );
  }
}
export default withTranslation('home')(connect()(Transaction));