import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {setWalletExistsStatus} from '../../modules/init.module';

class Legacy extends Component {
  render() {
    return   <div>
                <h1>{this.props.t("legacy_detected.title")} </h1>
                <h3> {this.props.t("legacy_detected.description")}</h3>
                <button onClick={()=>{setWalletExistsStatus(this.props.dispatch, false)}} >{this.props.t("escape_button")}</button>
                <Link to="/legacy/default" ><button>{this.props.t("proceed_button")}</button></Link>
            </div>
  }
}
export default  withTranslation('init')(connect()(Legacy));