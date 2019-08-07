import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class AddAccountOptions extends Component {

    render() {
        return   <div> 
            <p>{this.props.t("accounts.file")}</p>
            <p>{this.props.t("accounts.keys")}</p>
            <p>{this.props.t("accounts.seed")}</p>

        </div>;
  }
}
export default withTranslation('home')(connect()(AddAccountOptions));