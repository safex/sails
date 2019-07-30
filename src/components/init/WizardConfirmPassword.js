import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, wizardNext, addWizardErrors, addWizardTouched, create} from '../../modules/init.module';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { idText } from 'typescript';


const mapStateToProps = (state) => {
    return {
        restore_wizard: state.restore_wizard,
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


  const handleChange = (value, password, prop, dispatch, _touched, _errors, component= "create") =>{
  
      let data={}; data[prop]=value;
      addWizardData(dispatch,data,component);
      data[prop]=true;
      addWizardTouched(dispatch,data,component);
      let error={..._errors};
      
      if(!value){
         error[prop]=true;
      }
      else{
          error[prop]=false;
      }
      if(value!=password) error.equal=true;
      else error.equal=false;
      addWizardErrors(dispatch,error,component);
     
  }

  let is_valid = function(data, equal=false) {
    let err=data; if(equal) err="equal";
    return ((this.props.restore_wizard.touched.hasOwnProperty(data) && this.props.restore_wizard.touched[data]) && (this.props.restore_wizard.errors.hasOwnProperty(err) && !this.props.restore_wizard.errors[err]));
}
let is_invalid= function(data, equal=false) {
    let err=data; if(equal) err="equal";
    return ((this.props.restore_wizard.touched.hasOwnProperty(data) && this.props.restore_wizard.touched[data]) && (this.props.restore_wizard.errors.hasOwnProperty(err) && this.props.restore_wizard.errors[err]));
}


class WizardConfirmPassword extends Component {
    componentDidMount(){
        let data = this.props.prop_names; data.validated = false;
        let falses = {};
        for (var x in this.props.prop_names) {
            if (this.props.prop_names.hasOwnProperty(x)) {
                falses[x] = false;
            }
        }
        addWizardData(this.props.dispatch, data, this.props.component);
        addWizardErrors(this.props.dispatch, falses, this.props.component);
        addWizardTouched(this.props.dispatch, falses, this.props.component);
    }
  

    render() {
        //names[0] password field
        //names[1] confirm password field
        let names = Object.keys(this.props.prop_names);
        let prevs=this.props.prev_data.map(x=>{return <Row> <Col> {this.props.t(x)}</Col> <Col>{this.props.restore_wizard.data[x]}</Col></Row>});
        return (
            <>
             
        <Row>
            <Col>
                {prevs}
            <Row>
                <Col>
                <Form noValidate validated={this.props.restore_wizard.data.validated} onSubmit={(event)=>{handleSubmit(event, this.props.dispatch, this.props.restore_wizard.data)}}>
                   <Form.Row>
                        <Form.Group as={Col} controlId={names[0]}>
                            <Form.Label >{this.props.t(names[0])}</Form.Label>
                            <Form.Control
                            required
                            type="password"
                            value={this.props.restore_wizard.data[names[0]]}
                            isValid ={is_valid.bind(this, names[0])()}
                            isInvalid ={is_invalid.bind(this, names[0])()}
                            onChange={
                                (event)=>{handleChange(event.target.value,this.props.restore_wizard.data[names[1]],names[0], this.props.dispatch, this.props.restore_wizard.touched, this.props.restore_wizard.errors,this.props.component)}
                            }
                        />
                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                       </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId={names[1]}>
                            <Form.Label >{this.props.t(names[1])}</Form.Label>
                            <Form.Control
                            required
                            type="password"
                            value={this.props.restore_wizard.data[names[1]]}
                            isValid ={is_valid.bind(this, names[1], true)()}
                            isInvalid ={is_invalid.bind(this, names[1], true)()}
                            onChange={
                                (event)=>{handleChange(event.target.value,this.props.restore_wizard.data[names[0]],names[1], this.props.dispatch, this.props.restore_wizard.touched, this.props.restore_wizard.errors,this.props.component)}
                            }
                        />
                        <Form.Control.Feedback type="invalid">{this.props.t("passwords_dont_match")}</Form.Control.Feedback>
                        </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="danger" onClick={this.props.back}>{this.props.t('back_button')}</Button>
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
export default withTranslation('init')(connect(mapStateToProps)(WizardConfirmPassword));