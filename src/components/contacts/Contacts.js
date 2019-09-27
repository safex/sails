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
    let cnts = Object.values(this.props.contacts.contacts);
    return (
     <>
        <Row>
          <Col>
            <AddContact/>
          </Col>
        </Row>
        <br />
        <Row style={{maxHeight:"250px", "height":"250px", overflowY:"auto"}}>
          <Col>
            {cnts.map((x, i) => { let add = (Math.random() * 100) / 100; return x ? <Row key={`row-${i}`}><Col key={`col-${i}`}><Contact key={`contact-${x.id}-${add}`} contact={cnts[i]} all={cnts} /></Col></Row> : ""; })}
          </Col>
        </Row>
      </>
    );
  }
}
export default withTranslation('contacts')(connect(mapStateToProps)(Contacts));
