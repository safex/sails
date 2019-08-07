import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import AddContact from './AddContact';
import Contact from './Contact';
const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    active_account: state.active_account
  };
};


class Contacts extends Component {

  render() {
    let contacts = this.props.contacts.map((x) => { return <Contact contact={x} />; });
    return <div> <AddContact />
      {contacts}
    </div>
  }
}
export default withTranslation('contacts')(connect(mapStateToProps)(Contacts));
