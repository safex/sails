import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col, ButtonToolbar } from 'react-bootstrap';
import { resetContactData, contactInputChange, contactSubmit } from '../../modules/contacts.module';

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};


class AddContact extends Component {

  render() {
    return (
      <Form noValidate onSubmit={contactSubmit.bind(this)}>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              id="contact_address"
              value={this.props.contacts.new_contact.address}
              placeholder={this.props.t("address")}
              required
              isValid={this.props.contacts.touched.address && !this.props.contacts.errors.address}
              isInvalid={this.props.contacts.touched.address && this.props.contacts.errors.address}
              onChange={contactInputChange.bind(this)}
            />
            <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              type="text"
              id="contact_label"
              value={this.props.contacts.new_contact.label}
              placeholder={this.props.t("label")}
              required
              isValid={this.props.contacts.touched.label && !this.props.contacts.errors.label}
              isInvalid={this.props.contacts.touched.label && this.props.contacts.errors.label}
              onChange={contactInputChange.bind(this)}
            />
            <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control type="hidden" id="contact_double" isInvalid={this.props.contacts.touched.double && this.props.contacts.errors.double} isValid={this.props.contacts.touched.double && !this.props.contacts.errors.double} />
            <Form.Control.Feedback type="invalid">{this.props.t("double_values")}</Form.Control.Feedback>
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <ButtonToolbar className="justify-content-end">
              <Button variant="success" type="submit">
                {this.props.t("add")}
              </Button> &nbsp;
            <Button variant="danger" type="button" onClick={() => { resetContactData(this.props.dispatch) }}>
                {this.props.t("reset")}
              </Button>
            </ButtonToolbar>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
export default withTranslation('contacts')(connect(mapStateToProps)(AddContact));
