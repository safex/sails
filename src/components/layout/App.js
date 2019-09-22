import React, { Component } from 'react';
import routes_main from '../../setups/routes_main';
import LanguageMenu from '../shared/LanguageMenu';
import DaemonSetting from '../shared/DaemonSetting';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap'
class App extends Component {


  render() {
    return (
      <Container>
        <Row>
          <Col>
            <LanguageMenu />
          </Col>
          <Col>
            <DaemonSetting />
          </Col>
        </Row>
        <Row>
          <Col>
            {routes_main}
          </Col>
        </Row>

      </Container>
    );
  }
}
export default withTranslation()(connect()(App));
