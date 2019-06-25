import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
let initM = require('../../modules/init.module');

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    wallet:state.wallet
  };
};


class Login extends Component {
  componentDidMount() {

} 

  render() {
   return   <div> <label>Pwd</label> <input type="password"/> <button onClick={()=>{initM.login(this)}}>Login</button><Link to='/'><button>Back</button></Link></div>
  }
}
export default connect(mapStateToProps)(Login);
