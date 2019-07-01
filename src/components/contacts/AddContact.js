import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
let contactM = require("../../modules/contacts.module");

class AddContact extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div><input id="contact_address" placeholder={this.props.t("address")} />
   <input id="contact_label" placeholder={this.props.t("address")} />
   <button id="contact_add" onClick={contactM.addContact()}> {this.props.t("add")} </button>
    </div>
  }
}
export default withTranslation('contacts')(connect()(AddContact));
