import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state) => {
  return {
    active_account:state.active_account
  };
};

class Account extends Component {
  
    constructor(props){
       super(props);
    }


    render() {
        let accounts=this.props.account;
        return   <div> Account X </div>;
  }
}
export default withTranslation('home')(connect(mapStateToProps)(Account));