import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {Link} from 'react-router-dom'


class Restore extends Component {
  constructor(props){
    super(props);
  }
  render() {
   return   <div>
     <input id="private_view" placeholder={this.props.t("restore.form.private_view")} />
     <input id="public_view" placeholder={this.props.t("restore.form.public_view")} />
     <input id="private_spend" placeholder={this.props.t("restore.form.private_spend")} />
     <input id="public_spend" placeholder={this.props.t("restore.form.public_spend")} />
     <input id="seeds" placeholder={this.props.t("restore.form.seeds")} />
     <button>{this.props.t("button")}</button>
     <Link to='/'><button>Back</button></Link></div>
  }
}
export default withTranslation('init')(connect()(Restore));