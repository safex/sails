import React,{Component} from 'react';
import routes_main from '../../setups/routes_main';
import LanguageMenu from '../shared/LanguageMenu';
import ErrorResponse from '../shared/ErrorResponse';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {Container} from 'react-bootstrap'
class App extends Component {


  render() {
    return <div><Container><ErrorResponse> <LanguageMenu/> {routes_main} </ErrorResponse></Container></div>;
  }
}
export default withTranslation()(connect()(App));
