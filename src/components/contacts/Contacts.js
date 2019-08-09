import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import AddContact from './AddContact';
import Contact from './Contact';
import { getContactsCounterFromWallet, getContactsFromWallet } from '../../modules/contacts.module';
const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};


class Contacts extends Component {

  componentDidMount() {
    getContactsFromWallet(this.props.dispatch);
    getContactsCounterFromWallet(this.props.dispatch);
  }


  render() {
    let contacts = Object.values(this.props.contacts.contacts).map((x) => { return x ? <><Row><Col><Contact key={`contact-${x.id}`} contact={x} /></Col></Row><br/></> : ""; });
    return (
      <Container>
        <Row>
          <Col>
            <AddContact />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            {contacts}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default withTranslation('contacts')(connect(mapStateToProps)(Contacts));
