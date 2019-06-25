import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
let initM = require('../../modules/init.module');

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists
  };
};


class InitWallet extends Component {
  componentDidMount() {
    initM.checkIfFileExists(this);

} 

  render() {
    let loginB=<div><Link to='/login'><button> Login</button></Link> <p>Your existing safexwallet.dat has been detected</p></div>;
    let createB=<div><Link to='/create'><button>Setup a new wallet</button></Link><p>Choose this option if this is your first time using Safex</p></div>;
    let openB = <div><Link to='/open'><button>Open your existing wallet file</button></Link><p>Load up your existing wallet file and continue using Safex</p></div>;
    let restoreB=<div><Link to='/restore'><button>Restore wallet from keys or seeds</button></Link><p>Enter keys or 25 seed words to restore your Safex wallet.</p></div>;
    let backB=<div><button onClick={()=>{initM.setWalletExistsToFalse(this)}}>Open a different wallet</button><p>Load a wallet from a number of options.</p></div>;
   return   <div>
                { this.props.wallet_exists? loginB:createB }
                { this.props.wallet_exists? backB:openB }
                { this.props.wallet_exists? '':restoreB }
            </div>
  }
}
export default connect(mapStateToProps)(InitWallet);
