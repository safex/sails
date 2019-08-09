import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';


class Transaction extends Component {

  render() {
    return (
      <>
        <Row>
          <Col>
            Transaction X
            </Col>
        </Row>
      </>
    );
  }
}
export default withTranslation('home')(connect()(Transaction));