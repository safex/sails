import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class Contacts extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div><h1> Contacts</h1> </div>
  }
}
export default withTranslation('contacts')(connect()(Contacts));