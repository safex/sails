import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class Contact extends Component {

  render() {
    return <div><h1> {this.props.contact.label}</h1>  <h1> {this.props.contact.address}</h1>  </div>
  }
}
export default withTranslation('contacts')(connect()(Contact));
