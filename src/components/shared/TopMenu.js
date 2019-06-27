import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab:state.active_tab,
  };
};


class TopMenu extends Component {
  render() {
    let info = <div > {this.props.t("active")} : {this.props.active_account?"":"X"}</div> 
    let homeB=<Link to='/w/home'><button> {this.props.t("home")} </button></Link>;
    let sfxB=<Link to='/w/sfx'><button> {this.props.t("sfx")} </button></Link>;
    let sftB=<Link to='/w/sft'><button> {this.props.t("sft")} </button></Link>;
    let contactB = <Link to='/w/contacts'><button> {this.props.t("contacts")} </button></Link>;
    let settingsB=<Link to='/w/settings'><button> {this.props.t("settings")} </button></Link>;
    let migrationB=<Link to='/w/migrations'><button> {this.props.t("migrations")} </button></Link>;
    let bitcoinB=<Link to='/w/bitcoin'><button> {this.props.t("bitcoin")} </button></Link>;
   return   <div>
                { info }
                { homeB }
                { sfxB }
                { sftB }
                { contactB }
                {this.props.active_account? migrationB:''}
                {this.props.active_account? bitcoinB:''}
                { settingsB }
           
            </div>;
  }
}
export default withTranslation('top_menu')( connect(mapStateToProps)(TopMenu));