import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, wizardBack, wizardNext, create} from '../../modules/init.module';
import {Row, Col, Form, Button} from 'react-bootstrap';


const mapStateToProps = (state) => {
    return {
        create_wizard: state.create_wizard,
    };
};

const handleSubmit = (event, dispatch, data) => {
    const form = event.currentTarget;
   if (form.checkValidity() === false || (form.password.value!=form.confirm_password.value) ) {
      event.preventDefault();
      event.stopPropagation();
      addWizardData(dispatch, {validated:false},"create");
   }
   else{
       addWizardData(dispatch, {validated:true},"create");
       wizardNext(dispatch,"create", create, [ dispatch,data])
  
   }
  
  };
  
  const handleChange = (value, password, prop, dispatch, _touched, _errors) =>{
  
      let data={}; data[prop]=value;
      let touchedN={..._touched}; touchedN[prop]=true;
      addWizardData(dispatch,{touched:touchedN},"create");
      let error={..._errors};
      addWizardData(dispatch,data,"create");
      if(!value){
         error[prop]=true;
      }
      else{
          error[prop]=false;
      }
      if(value!=password) error.equal=true;
      else error.equal=false;
      addWizardData(dispatch,{errors:error},"create");
     
  }


class CreatePassword extends Component {
    componentDidMount(){
        addWizardData(this.props.dispatch,{touched:{...this.props.create_wizard.data.touched, ...{password:false, confirm_password:false}}},"create");
        addWizardData(this.props.dispatch,{errors:{...this.props.create_wizard.data.errors,...{password:false, confirm_password:false}}},"create");
        addWizardData(this.props.dispatch,{validated:false},"create");
    }
  

    render() {
        let password_is_valid= (this.props.create_wizard.data.touched.hasOwnProperty('password') && this.props.create_wizard.data.touched.password) && (this.props.create_wizard.data.errors.hasOwnProperty('password') && !this.props.create_wizard.data.errors.password);
        let password_is_invalid= (this.props.create_wizard.data.touched.hasOwnProperty('password') && this.props.create_wizard.data.touched.password) && (this.props.create_wizard.data.errors.hasOwnProperty('password') && this.props.create_wizard.data.errors.password);
        let confirm_password_is_valid=(this.props.create_wizard.data.touched.hasOwnProperty('confirm_password') && this.props.create_wizard.data.touched.confirm_password) && (this.props.create_wizard.data.errors.hasOwnProperty('equal') && !this.props.create_wizard.data.errors.equal);
        let confirm_password_is_invalid=(this.props.create_wizard.data.touched.hasOwnProperty('confirm_password') && this.props.create_wizard.data.touched.confirm_password) && (this.props.create_wizard.data.errors.hasOwnProperty('equal') && this.props.create_wizard.data.errors.equal);
        return (
            <>
             
        <Row>
            <Col>
            <Row>
                <Col>
                    {this.props.t("create.form.file_location")}
                </Col>
                <Col>
                    {this.props.create_wizard.data.filepath}
                </Col>
            </Row>
            <Row>
                <Col>
                {this.props.t("create.form.wallet_name_label")}
                </Col>
                <Col>
                    {this.props.create_wizard.data.wallet_name }
                </Col>
            </Row>
            <Row>
                <Col>
                <Form noValidate validated={this.props.create_wizard.data.validated} onSubmit={(event)=>{handleSubmit(event, this.props.dispatch, this.props.create_wizard.data)}}>
                   <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label >{this.props.t("create.form.password")}</Form.Label>
                            <Form.Control
                            required
                            type="password"
                            value={this.props.create_wizard.data.password}
                            isValid = {password_is_valid}
                            isInvalid = {password_is_invalid}
                            onChange={
                                (event)=>{handleChange(event.target.value,this.props.create_wizard.data.confirm_password,'password', this.props.dispatch, this.props.create_wizard.data.touched, this.props.create_wizard.data.errors)}
                            }
                        />
                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                       </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="confirm_password">
                            <Form.Label >{this.props.t("create.form.confirm_password")}</Form.Label>
                            <Form.Control
                            required
                            type="password"
                            value={this.props.create_wizard.data.confirm_password}
                            isValid = {confirm_password_is_valid}
                            isInvalid = {confirm_password_is_invalid}
                            onChange={
                                (event)=>{handleChange(event.target.value,this.props.create_wizard.data.password,'confirm_password', this.props.dispatch, this.props.create_wizard.data.touched, this.props.create_wizard.data.errors)}
                            }
                        />
                        <Form.Control.Feedback type="invalid">{this.props.t("passwords_dont_match")}</Form.Control.Feedback>
                        </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="primary"  onClick={() => {wizardBack(this.props.dispatch, ['password', 'confirm_password'],"create")  }}>{this.props.t('back_button')}</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="primary" type="submit" >{this.props.t('next_button')}</Button> 
                        </Form.Group>
                    </Form.Row>
                    
                </Form>
                </Col>
               
           </Row>
            </Col>
        </Row>
           </> 
           
        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(CreatePassword));