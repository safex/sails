import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
let sharedM = require('../../modules/shared.module.js');

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab:state.active_tab,
    lang:state.language
  };
};


class LegacyMenu extends Component {
  componentDidMount() {

   } 

  render() {
    let migrationB=<Link to='/migration'><button> Migration</button></Link>;
    let bitcoinB=<Link to='/bitcoin'><button> Bitcoin </button></Link>;
   return   <div>
                { migrationB }
                { bitcoinB }
            </div>
  }
}
export default connect(mapStateToProps)(LegacyMenu);