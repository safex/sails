import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


class Restore extends Component {
  constructor(props){
    super(props);
  }
  render() {
   return   <div><Link to='/'><button>Back</button></Link></div>
  }
}
export default connect()(Restore);