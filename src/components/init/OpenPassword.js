import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, addWizardErrors, addWizardTouched, wizardBack, wizardNext, open} from '../../modules/init.module';
import {Row, Col, Form, Button} from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        open_wizard: state.open_wizard
    };
};

const handleSubmit = (event, dispatch, history, data) => {
    const form = event.currentTarget;
   if (form.checkValidity() === false ) {
      event.preventDefault();
      event.stopPropagation();
      addWizardData(dispatch, {validated:false},"open");
   }
   else{
       addWizardData(dispatch, {validated:true},"open");
       wizardNext(dispatch,"open", open, [ dispatch,history,data])
  
   }
  
  };
  
  const passwordChange = (value, dispatch, _touched, _errors) =>{
  
    
      addWizardData(dispatch,{password:value},"open");
      addWizardTouched(dispatch,{password:true},"open");
      let error;
      if(!value){
         error=true;
      }
      else{
          error=false;
      }
      addWizardErrors(dispatch,{password:error},"open");
     
  }


class OpenPassword extends Component {
    componentDidMount(){
        addWizardTouched(this.props.dispatch,{...this.props.open_wizard.touched, ...{password:false}},"open");
        addWizardErrors(this.props.dispatch,{...this.props.open_wizard.errors,...{password:false}},"open");
        addWizardData(this.props.dispatch,{validated:false},"open");
    }

    render() {
        let password_is_valid= (this.props.open_wizard.touched.hasOwnProperty('password') && this.props.open_wizard.touched.password) && (this.props.open_wizard.errors.hasOwnProperty('password') && !this.props.open_wizard.errors.password);
        let password_is_invalid= (this.props.open_wizard.touched.hasOwnProperty('password') && this.props.open_wizard.touched.password) && (this.props.open_wizard.errors.hasOwnProperty('password') && this.props.open_wizard.errors.password);
       return (
        <Row>
            <Col>
            <Row>
                <Col>
                    {this.props.t("create.form.file_location")}
                </Col>
                <Col>
                    {this.props.open_wizard.data.filepath}
                </Col>
            </Row>
            <Row>
                <Col>
                <Form noValidate validated={this.props.open_wizard.data.validated} onSubmit={(event)=>{handleSubmit(event, this.props.dispatch, this.props.history,this.props.open_wizard.data)}}>
                   <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label >{this.props.t("open.form.password")}</Form.Label>
                            <Form.Control
                            required
                            type="password"
                            value={this.props.open_wizard.data.password}
                            isValid = {password_is_valid}
                            isInvalid = {password_is_invalid}
                            onChange={
                                (event)=>{passwordChange(event.target.value,this.props.dispatch, this.props.open_wizard.touched, this.props.open_wizard.errors)}
                            }
                        />
                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                       </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="primary"  onClick={() => {wizardBack(this.props.dispatch, ['password'],"open")  }}>{this.props.t('back_button')}</Button>
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
            
           
        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(OpenPassword));