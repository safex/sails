import React, { Component } from 'react';
import routes_main from '../../setups/routes_main';
import LanguageMenu from '../shared/LanguageMenu';
import DaemonSetting from '../shared/DaemonSetting';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
class App extends Component {


  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <LanguageMenu />
            </Navbar.Text>
            <Navbar.Text>
              <DaemonSetting />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {routes_main}
      </div>
    );
  }
}
export default withTranslation()(connect()(App));
