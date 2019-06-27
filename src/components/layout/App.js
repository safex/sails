import React,{Component} from 'react';
import routes_main from '../../setups/routes_main';
import LanguageMenu from '../shared/LanguageMenu';
import Error from '../shared/Error';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
class App extends Component {


  render() {
    return <div> <LanguageMenu/> {routes_main} <Error/></div>;
  }
}
export default withTranslation()(connect()(App));
