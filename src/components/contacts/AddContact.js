import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import { addNewContact, addContactData, resetContactData } from '../../modules/contacts.module';

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};

const handleSubmit = (event, contacts, dispatch) => {
  event.preventDefault();
  event.stopPropagation();
  const form = event.currentTarget;
  if (form.checkValidity() !== false) {
    addNewContact(dispatch,contacts);
  }
};

const handleChange = (value, prop, all, dispatch) => {
  all[prop] = value;
  addContactData(dispatch, all);
}

class AddContact extends Component {

  render() {
    return (
      <Form noValidate onSubmit={(event) => { handleSubmit(event, this.props.contacts, this.props.dispatch) }}>
        <Form.Row>
          <Col>
            <Form.Control type="text" id="contact_address" value={this.props.contacts.new_contact.address} placeholder={this.props.t("address")} required onChange={(event) => { handleChange(event.target.value, "address", this.props.contacts.new_contact, this.props.dispatch) }} />
          </Col>
          <Col>
            <Form.Control type="text" id="contact_label" value={this.props.contacts.new_contact.label} placeholder={this.props.t("label")} onChange={(event) => { handleChange(event.target.value, "label", this.props.contacts.new_contact, this.props.dispatch) }} />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Button variant="primary" type="submit">
              {this.props.t("add")}
            </Button>
          </Col>
          <Col>
            <Button variant="danger" type="button" onClick={(event) => { resetContactData(this.props.dispatch) }}>
              {this.props.t("reset")}
            </Button>
          </Col>


        </Form.Row>

      </Form>
    );
  }
}
export default withTranslation('contacts')(connect(mapStateToProps)(AddContact));
