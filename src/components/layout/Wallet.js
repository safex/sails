import React,{Component} from 'react';
import TopMenu from '../shared/TopMenu';
import Footer from '../shared/Footer'
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import routes_second from '../../setups/routes_second';

class Wallet extends Component {


  render() {
    return <div>
            <TopMenu/>
                {routes_second}
            <Footer/>
         </div>;
  }
}
export default withTranslation()(connect()(Wallet));
