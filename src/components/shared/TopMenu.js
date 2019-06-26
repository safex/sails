import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
let sharedM = require('../../modules/shared.module.js');

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab:state.active_tab
  };
};


class TopMenu extends Component {
  componentDidMount() {

   } 

  render() {
    let info = <div >Active: {this.props.active_account}</div> 
    let homeB=<Link to='/home'><button> Home</button></Link>;
    let sfxB=<Link to='/sfx'><button> SFX</button></Link>;
    let sftB=<Link to='/sft'><button>SFT</button></Link>;
    let contactB = <Link to='/contacts'><button>Contacts</button></Link>;
    let settingsB=<Link to='/settings'><button>Settings</button></Link>;
    let logoutB=<button onClick={}>Logout</button>
    let langB=<button onClick={}>Language</button>
   return   <div>
                { info }
                { homeB }
                { sfxB }
                { sftB }
                { contactB }
                { settingsB }
                { logoutB }
                { langB }
            </div>
  }
}
export default connect(mapStateToProps)(TopMenu);