import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import NetworkStatus from '../shared/NetworkStatus';
import AddressInfo from '../shared/AddressInfo';

class Footer extends Component {

  render() {
    return <div><NetworkStatus /><AddressInfo /></div>;
  }
}
export default withTranslation()(connect()(Footer));