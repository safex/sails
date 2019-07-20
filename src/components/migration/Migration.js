import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

class Migration extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return   <div> <h1> Migration </h1> </div>
  }
}
export default withTranslation('migration')(connect()(Migration));