import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import Accounts from './Accounts';
import History from './History';





class Home extends Component {
    render() {
    return   (
        <div> 
            <h1> Home</h1>
            <div>{this.props.active_account}</div>
            <div><Accounts/> <History/></div> 
            <div> <button>{this.props.t("export")}</button></div>
        </div>
    );
    }
}
export default withTranslation('home')(connect()(Home));