import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class Bitcoin extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div> <h1> Bitcoin </h1> </div>
  }
}
export default withTranslation('bitcoin')(connect()(Bitcoin));