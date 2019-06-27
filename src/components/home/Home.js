import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import Accounts from './Accounts';
import History from './History';

class Home extends Component {
  
    constructor(props){
       super(props);
    }

    render() {
    return   <div> <h1> Home</h1>
        <div><Accounts/> <History/></div> 
        <div> <button>{this.props.t("export")}</button></div>
        </div>
    }
}
export default withTranslation('home')(connect()(Home));