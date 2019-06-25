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


class Open extends Component {
  componentDidMount() {

} 

  render() {
   return   <div><Link to='/'><button>Back</button></Link></div>
  }
}
export default connect(mapStateToProps)(Open);