import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { LEGACY_DEFAULT_WALLET_PATH } from '../../setups/conf';
import { chooseWalletFile, addWizardData,addWizardErrors, addWizardTouched, wizardNext, wizardBack, openLegacy } from '../../modules/init.module';
import { Row, Col, Button, Form } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    legacy_wizard: state.legacy_wizard
  };
};

const handleSubmit = (event, dispatch,data) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    addWizardData(dispatch, {validated:false},"legacy");
  }
  else{
      addWizardData(dispatch, {validated:true},"legacy");
      wizardNext(dispatch,"legacy", openLegacy, [dispatch, data])

  }

};

const passwordChange = (value, dispatch, _touched, _errors) =>{
  
    
  addWizardData(dispatch,{legacy_password:value},"legacy");
  addWizardTouched(dispatch,{legacy_password:true},"legacy");
  let error;
  if(!value){
     error=true;
  }
  else{
      error=false;
  }
  addWizardErrors(dispatch,{legacy_password:error},"legacy");
 
}


class LegacyLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    addWizardData(this.props.dispatch,{validated:false},"legacy");
    addWizardErrors(this.props.dispatch,{legacy_filepath:false, legacy_password:false},"legacy");
    addWizardTouched(this.props.dispatch,{legacy_filepath:false, legacy_password:false},"legacy");

  }


  render() {

    if (this.props.type == "default") {
      if ((!this.props.legacy_wizard.data.hasOwnProperty("legacy_filepath"))) {
        addWizardData(this.props.dispatch, { legacy_filepath: LEGACY_DEFAULT_WALLET_PATH },"legacy");
      }
      else if (this.props.legacy_wizard.data.legacy_filepath != LEGACY_DEFAULT_WALLET_PATH) {
        addWizardData(this.props.dispatch, { legacy_filepath: LEGACY_DEFAULT_WALLET_PATH },"legacy");
      }
    }
    let options = {
      title: this.props.t("create.form.choose_filepath"),
      filters: [
        { name: 'v7 Wallet', extensions: ['dat'] },
      ]
    };
    let legacy_filepath_is_valid = (this.props.legacy_wizard.touched.hasOwnProperty('legacy_filepath') && this.props.legacy_wizard.touched.legacy_filepath) && (this.props.legacy_wizard.errors.hasOwnProperty('legacy_filepath') && !this.props.legacy_wizard.errors.legacy_filepath);
    let legacy_filepath_is_invalid = (this.props.legacy_wizard.touched.hasOwnProperty('legacy_filepath') && this.props.legacy_wizard.touched.legacy_filepath) && (this.props.legacy_wizard.errors.hasOwnProperty('legacy_filepath') && this.props.legacy_wizard.errors.legacy_filepath);
    let legacy_password_is_valid = (this.props.legacy_wizard.touched.hasOwnProperty('legacy_password') && this.props.legacy_wizard.touched.legacy_password) && (this.props.legacy_wizard.errors.hasOwnProperty('legacy_password') && !this.props.legacy_wizard.errors.legacy_password);
    let legacy_password_is_invalid = (this.props.legacy_wizard.touched.hasOwnProperty('legacy_password') && this.props.legacy_wizard.touched.legacy_password) && (this.props.legacy_wizard.errors.hasOwnProperty('legacy_password') && this.props.legacy_wizard.errors.legacy_password);


    return (
      <Row>
        <Col>
        {this.props.type != "default" ? '':<h1>{this.props.t("login.form.legacy_detected")}</h1>}
          <Form noValidate validated={this.props.legacy_wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch, this.props.legacy_wizard.data) }}>
            <Form.Row>
              <Form.Group as={Col} controlId="legacy_filepath">
              {this.props.type != "default" ? <Form.Label >{this.props.t("create.form.choose_filepath")}</Form.Label> : ''}
                <Form.Control
                  required
                  type="text"
                  value={this.props.legacy_wizard.data.legacy_filepath}
                  disabled={true}
                  isValid={legacy_filepath_is_valid}
                  isInvalid={legacy_filepath_is_invalid}
                />
                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                {this.props.type != "default" ? <Button variant="primary" onClick={() => { chooseWalletFile(this.props.dispatch, options, "legacy", this.props.legacy_wizard.touched, this.props.legacy_wizard.errors) }}>{this.props.t("browse_button")}</Button> : ''}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="legacy_password">
                <Form.Label >{this.props.t("legacy.password")}</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={this.props.legacy_wizard.data.legacy_password}
                  isValid={legacy_password_is_valid}
                  isInvalid={legacy_password_is_invalid}
                  onChange={
                    (event) => { passwordChange(event.target.value, this.props.dispatch, this.props.legacy_wizard.touched, this.props.legacy_wizard.errors) }
                  }
                />
                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Button variant="primary" onClick={() => { wizardBack(this.props.dispatch, ['legacy_filepath', 'legacy_password'],"legacy", (history) => { history.push('/'); }, [this.props.history]) }}>{this.props.t('back_button')}</Button>
              </Form.Group>
              <Form.Group as={Col}>
                <Button variant="primary" type="submit" >{this.props.t('next_button')}</Button>
              </Form.Group>
            </Form.Row>

          </Form>
        </Col>

      </Row>);




  }
}
export default withTranslation('init')(connect(mapStateToProps)(LegacyLogin));
