import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setWalletExistsStatus } from '../../modules/init.module';
import { Container, Row, Col, Card, Button, ButtonToolbar } from 'react-bootstrap'

class Legacy extends Component {
  render() {
    return (
      <Container>
        <Row
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%"
          }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header>{this.props.t("legacy_detected_title")} </Card.Header>
              <Card.Body>
                <Card.Text>
                  {this.props.t("legacy_detected_description")}
                </Card.Text>
                <Row>
                  <Col>
                    <ButtonToolbar className="justify-content-center">
                      <Button variant="primary" onClick={() => { setWalletExistsStatus(this.props.dispatch, false) }}>{this.props.t("escape_button")}</Button>
                      &nbsp;
                      {/* <Link to="/legacy/default" > */}
                      <Button variant="primary" onClick={() => { this.props.history.push("/legacy/default"); }}>{this.props.t("proceed_button")}</Button>
                      {/* </Link> */}
                    </ButtonToolbar>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    );
  }
}
export default withTranslation('init')(withRouter(connect()(Legacy)));