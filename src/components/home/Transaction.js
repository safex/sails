import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';


class Transaction extends Component {
  
    constructor(props){
       super(props);
    }


    render() {
        let transaction=this.props.transaction;
        return   <div> Transaction X </div>;
  }
}
export default withTranslation('home')(connect()(Transaction));