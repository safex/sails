import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
let sharedM = require('../../modules/shared.module.js');

const mapStateToProps = (state) => {
  return {
  };
};


class NetworkStatus extends Component {
  componentDidMount() {

   } 

  render() {
    
   return   <div></div>
  }
}
export default connect(mapStateToProps)(NetworkStatus);