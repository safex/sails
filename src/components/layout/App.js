import React, { Component } from 'react';
import routes_main from '../../setups/routes_main';
import { LanguageMenu, DaemonSetting, AppBar } from '../shared/';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Navbar } from 'react-bootstrap'
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
            <Navbar.Text>
              <AppBar />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {routes_main}
      </div>
    );
  }
}
export default withTranslation()(connect()(App));
