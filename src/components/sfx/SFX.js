import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class SFX extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div> <h1> SFX </h1></div>
  }
}
export default withTranslation('sfx')(connect()(SFX));