import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class SFT extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div> <h1> SFT </h1> </div>
  }
}
export default withTranslation('sft')(connect()(SFT));