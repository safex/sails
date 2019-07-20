import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {chooseWalletFile , addWizardData, addWizardErrors, addWizardTouched, wizardBack, wizardNext } from '../../modules/init.module';
import {Row, Col, Form, Button} from 'react-bootstrap';



const mapStateToProps = (state) => {
    return {
        open_wizard: state.open_wizard
    };
};

const handleSubmit = (event, dispatch) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    addWizardData(dispatch, {validated:false},"open");
  }
  else{
      addWizardData(dispatch, {validated:true},"open");
      wizardNext(dispatch,"open");

  }

};



class OpenFilepath extends Component {
   
    componentDidMount(){
        addWizardData(this.props.dispatch,{validated:false},"open");
        addWizardErrors(this.props.dispatch,{filepath:false},"open");
        addWizardTouched(this.props.dispatch,{filepath:false},"open");
    }
 

    render() {
        let options = {
            title: this.props.t("open.form.choose_filepath"),
            filters: [
              { name: 'v8 Wallet', extensions: ['*'] },
            ]
          };
        let filepath_is_valid= (this.props.open_wizard.touched.hasOwnProperty('filepath') && this.props.open_wizard.touched.filepath) && (this.props.open_wizard.errors.hasOwnProperty('filepath') && !this.props.open_wizard.errors.filepath);
        let filepath_is_invalid= (this.props.open_wizard.touched.hasOwnProperty('filepath') && this.props.open_wizard.touched.filepath) && (this.props.open_wizard.errors.hasOwnProperty('filepath') && this.props.open_wizard.errors.filepath);
        return (
            <Row>
                <Col>
                <Form noValidate validated={this.props.open_wizard.data.validated} onSubmit={(event)=>{handleSubmit(event, this.props.dispatch)}}>
                   <Form.Row>
                        <Form.Group as={Col} controlId="open_filepath">
                            <Form.Label >{this.props.t("create.form.choose_filepath")}</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            value={this.props.open_wizard.data.filepath}
                            disabled={true}
                            isValid = {filepath_is_valid}
                            isInvalid = {filepath_is_invalid}
                        />
                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                        <Button  variant="primary" onClick={() => { chooseWalletFile(this.props.dispatch, options, "default", this.props.open_wizard.touched, this.props.open_wizard.errors) }} >{this.props.t("browse_button")}</Button>
                        </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="primary"  onClick={() => { wizardBack(this.props.dispatch, ['filepath'],"open", (history) => { history.push('/'); }, [this.props.history]) }}>{this.props.t('back_button')}</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="primary" type="submit" >{this.props.t('next_button')}</Button> 
                        </Form.Group>
                    </Form.Row>
                    
                </Form>
                </Col>
               
           </Row>
         
         
               
        );
    }
}
export default withTranslation('init')(connect(mapStateToProps)(OpenFilepath));