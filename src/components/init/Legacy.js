import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWalletExistsStatus } from '../../redux/actions/wallet_exists.action';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as R from '../../setups/routes';

class Legacy extends Component {
  render() {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>{this.props.t("legacy_detected_title")} </Card.Header>
            <Card.Body>
              <Card.Text>
                {this.props.t("legacy_detected_description")}
              </Card.Text>
              <Row>
                <Col><Button variant="primary" onClick={(event) => { this.props.addWalletExistsStatus(false) }}>{this.props.t("escape_button")}</Button></Col>
                <Col><Link to={R.LEGACY_DEFAULT} ><Button variant="primary">{this.props.t("proceed_button")}</Button></Link></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addWalletExistsStatus: (status) => {
      dispatch(addWalletExistsStatus(status));
    }
  }
}
export default withTranslation('init')(connect(null, mapDispatchToProps)(Legacy));