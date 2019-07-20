import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, addWizardErrors, addWizardTouched, wizardNext, chooseCreateFilepath, createLegacy, wizardBack } from '../../modules/init.module';
import {Container, Row, Col, Button, Form, Table, Modal } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    legacy_wizard: state.legacy_wizard,
    legacy_wallet: state.legacy_wallet
  };
};
const handleSubmit = (event, dispatch, data, history, wallet) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false || (form.create_password.value != form.create_confirm_password.value)) {
    event.preventDefault();
    event.stopPropagation();
    addWizardData(dispatch, { validated: false },"legacy");
  }
  else {
    addWizardData(dispatch, { validated: true },"legacy");
    wizardNext(dispatch ,"legacy",createLegacy, [dispatch, data, wallet])

  }

};

const handleChange = (value, password, prop, dispatch) => {
  let data = {};
  data[prop] = true;
  let error = {};
  addWizardTouched(dispatch, data,"legacy");
  data[prop] = value;
  addWizardData(dispatch, data,"legacy");
  if ((prop == "create_password") || (prop == "create_confirm_password")) {
    if (value != password) error.equal = true;
    else error.equal = false;
  }
  if (!value) {
    error[prop] = true;
  }
  else {
    error[prop] = false;
  }
  addWizardErrors(dispatch, error,"legacy");

}


class LegacyCreate extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    addWizardTouched(this.props.dispatch, { ...this.props.legacy_wizard.touched, ...{ create_password: false, create_confirm_password: false, create_filepath: false, create_wallet_name: false } },"legacy");
    addWizardErrors(this.props.dispatch, { ...this.props.legacy_wizard.errors, ...{ create_password: false, create_confirm_password: false, create_filepath: false, create_wallet_name: false } },"legacy");
    addWizardData(this.props.dispatch, { validated: false, keys_modal: false },"legacy");
  }

  render() {
    let options = {
      title: this.props.t("create.form.choose_filepath")
    };

    let create_filepath_is_valid = (this.props.legacy_wizard.touched.hasOwnProperty('create_filepath') && this.props.legacy_wizard.touched.create_filepath) && (this.props.legacy_wizard.errors.hasOwnProperty('create_filepath') && !this.props.legacy_wizard.errors.create_filepath);
    let create_filepath_is_invalid = (this.props.legacy_wizard.touched.hasOwnProperty('create_filepath') && this.props.legacy_wizard.touched.create_filepath) && (this.props.legacy_wizard.errors.hasOwnProperty('create_filepath') && this.props.legacy_wizard.errors.create_filepath);
    let create_wallet_name_is_valid = (this.props.legacy_wizard.touched.hasOwnProperty('create_wallet_name') && this.props.legacy_wizard.touched.create_wallet_name) && (this.props.legacy_wizard.errors.hasOwnProperty('create_wallet_name') && !this.props.legacy_wizard.errors.create_wallet_name);
    let create_wallet_name_is_invalid = (this.props.legacy_wizard.touched.hasOwnProperty('create_wallet_name') && this.props.legacy_wizard.touched.create_wallet_name) && (this.props.legacy_wizard.errors.hasOwnProperty('create_wallet_name') && this.props.legacy_wizard.errors.create_wallet_name);
    let create_password_is_valid = (this.props.legacy_wizard.touched.hasOwnProperty('create_password') && this.props.legacy_wizard.touched.create_password) && (this.props.legacy_wizard.errors.hasOwnProperty('create_password') && !this.props.legacy_wizard.errors.create_password);
    let create_password_is_invalid = (this.props.legacy_wizard.touched.hasOwnProperty('create_password') && this.props.legacy_wizard.touched.create_password) && (this.props.legacy_wizard.errors.hasOwnProperty('create_password') && this.props.legacy_wizard.errors.create_password);
    let create_confirm_password_is_valid = (this.props.legacy_wizard.touched.hasOwnProperty('create_confirm_password') && this.props.legacy_wizard.touched.create_confirm_password) && (this.props.legacy_wizard.errors.hasOwnProperty('equal') && !this.props.legacy_wizard.errors.equal);
    let create_confirm_password_is_invalid = (this.props.legacy_wizard.touched.hasOwnProperty('create_confirm_password') && this.props.legacy_wizard.touched.create_confirm_password) && (this.props.legacy_wizard.errors.hasOwnProperty('equal') && this.props.legacy_wizard.errors.equal);
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h1>{this.props.t("login.form.legacy_detected")}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan="2">{this.props.t("login.form.detected")} :</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.props.t("login.form.bitcoin_key_sets")}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.props.t("login.form.bitcoins_on_all_wallets")} </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.props.t("login.form.safe_exchange_coins_total")}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.props.t("login.form.safex_key_sets")}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.props.t("login.form.safex_tokens")} </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.props.t("login.form.safex_cash")}</td>
                    <td></td>
                  </tr>

                </tbody>
              </Table>
            </Col>
            <Col>
              <Button variant="primary" onClick={() => { addWizardData(this.props.dispatch, {keys_modal:true},"legacy") }}>{this.props.t("login.form.view_keys_balance")} </Button>
              <Modal  centered  size="lg" show={this.props.legacy_wizard.data.keys_modal} onHide={()=>{addWizardData(this.props.dispatch, {keys_modal:false},"legacy")}}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.props.t("keys_and_balances")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Container>
                  <Row>
                    <Col>
                    <h2>{this.props.t("btc_key_sets")}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    {this.props.legacy_wallet.hasOwnProperty('keys')? JSON.stringify(this.props.legacy_wallet.keys):"None"}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <h2>{this.props.t("safex_key_sets")}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    {this.props.legacy_wallet.hasOwnProperty('safex_keys')? JSON.stringify(this.props.legacy_wallet.safex_keys):"None"}
                    </Col>
                  </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={(event)=>{addWizardData(this.props.dispatch, {keys_modal:false},"legacy")}}>  {this.props.t("close_button")} </Button>

                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form noValidate validated={this.props.legacy_wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch,this.props.legacy_wizard.data, this.props.history, this.props.legacy_wallet) }}>
                <Form.Row>
                  <Form.Group as={Col} controlId="create_filepath">
                    <Form.Label >{this.props.t("create.form.choose_filepath")}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={this.props.legacy_wizard.data.create_filepath}
                      disabled={true}
                      isValid={create_filepath_is_valid}
                      isInvalid={create_filepath_is_invalid}
                      onChange={
                        (event) => { handleChange(event.target.value, '', 'create_filepath', this.props.dispatch) }
                      }
                    />
                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                    <Button variant="primary" onClick={() => { chooseCreateFilepath(this.props.dispatch, options, "legacy", this.props.dispatch, this.props.legacy_wizard.touched, this.props.legacy_wizard.errors) }} >{this.props.t("browse_button")}</Button>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="create_wallet_name">
                    <Form.Label >{this.props.t("create.form.wallet_name_label")}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={this.props.legacy_wizard.create_wallet_name}
                      isValid={create_wallet_name_is_valid}
                      isInvalid={create_wallet_name_is_invalid}
                      onChange={
                        (event) => { handleChange(event.target.value, '', 'create_wallet_name', this.props.dispatch) }
                      }
                    />
                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="create_password">
                    <Form.Label >{this.props.t("create.form.password")}</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      value={this.props.legacy_wizard.data.create_password}
                      isValid={create_password_is_valid}
                      isInvalid={create_password_is_invalid}
                      onChange={
                        (event) => { handleChange(event.target.value, this.props.legacy_wizard.data.create_confirm_password, 'create_password', this.props.dispatch) }
                      }
                    />
                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="create_confirm_password">
                    <Form.Label >{this.props.t("create.form.confirm_password")}</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      value={this.props.legacy_wizard.data.create_confirm_password}
                      isValid={create_confirm_password_is_valid}
                      isInvalid={create_confirm_password_is_invalid}
                      onChange={
                        (event) => { handleChange(event.target.value, this.props.legacy_wizard.data.create_password, 'create_confirm_password', this.props.dispatch) }
                      }
                    />
                    <Form.Control.Feedback type="invalid">{this.props.t("passwords_dont_match")}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Button variant="primary" onClick={() => { wizardBack(this.props.dispatch, ['keys_modal', 'create_password', 'create_confirm_password', 'create_filepath', 'create_wallet_name'],"legacy") }}>{this.props.t('back_button')}</Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button variant="primary" type="submit" >{this.props.t('next_button')}</Button>
                  </Form.Group>
                </Form.Row>

              </Form></Col>
          </Row>
          <Row>
            <Col>

              {this.props.t("login.form.legacy_create_desc")}
            </Col>
          </Row>
        </Col>
      </Row>
    );

  }
}
export default withTranslation('init')(connect(mapStateToProps)(LegacyCreate));