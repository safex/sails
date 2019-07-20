import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account
  };
};

class NetworkStatus extends Component {

  render() {
    return <div>
      <p>{this.props.t("network_status")} : {this.props.t("connected")}</p>
      <p>{this.props.t("bitcoin_network_status")} :  {this.props.t("disconnected")} </p>
      <p>{this.props.t("chain_sync")} : 123/456</p> 
    </div>
  }
}
export default withTranslation('network_status')(connect(mapStateToProps)(NetworkStatus));