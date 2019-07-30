import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, addWizardErrors, addWizardTouched, wizardNext} from '../../modules/init.module';
import { Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';



const mapStateToProps = (state) => {
    return {
        restore_wizard: state.restore_wizard
    };
};

const handleSubmit = (event, dispatch, type, names) => {
    const form = event.currentTarget;
    let validation=false;
    if(type=="mnemonic"){
        validation=validateMnemonic(form[names[1]].value);
    }
    else{
        validation=validateKeys(form[names[2]].value, form[names[3]].value, form[names[4]].value);
    }
    
   if (validation === false) {
      event.preventDefault();
    event.stopPropagation();

       addWizardData(dispatch, { validated: false }, "restore");
     }
     else {
        addWizardData(dispatch, { validated: true }, "restore");
         wizardNext(dispatch, "restore");

    }

};

const validateKeys = function(address, view, spend){
    if((address=='') || (view=='') || (spend=='')) 
    return false;
    else return true;
}

const validateMnemonic = function(mnemonic){
    return mnemonic.trim().split(" ").length==25;
}

const handleChange = (dispatch,value, name, type, rules = []) =>{
    let data={}; let errors={}; 
    data[name]=value;
    addWizardData(dispatch,data, "restore");
    data[name]=true;
    addWizardTouched(dispatch, data, "restore");
    if(!value){
       errors[name]=true;
    }
    else{
        errors[name]=false;
    }
    if(type=="mnemonic"){
        if(value.trim().split(" ").length!=25) errors[name]=true;
        else errors[name]=false;
    }
    addWizardErrors(dispatch,errors, "restore");
}
let is_valid = function(field, type, data) {
    return (this.props.restore_wizard.data[field] == type) && ((this.props.restore_wizard.touched.hasOwnProperty(data) && this.props.restore_wizard.touched[data]) && (this.props.restore_wizard.errors.hasOwnProperty(data) && !this.props.restore_wizard.errors[data]));
}
let is_invalid= function(field, type, data) {
    return (this.props.restore_wizard.data[field] == type) && ((this.props.restore_wizard.touched.hasOwnProperty(data) && this.props.restore_wizard.touched[data]) && (this.props.restore_wizard.errors.hasOwnProperty(data) && this.props.restore_wizard.errors[data]));
}


class WizardData extends Component {
    constructor(props) {
        super(props);
        /*
        prop_names
        0 - tab value prop name
        1 - mnemonic text area
        2 - adress input
        3 - private view key
        4 - private spend key
        */
    }

    

    componentDidMount() {
        
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
        console.log("restore wizard data");
        console.log(this.props.restore_wizard.data);

        let names = Object.keys(this.props.prop_names);
        // let address_is_valid =is_valid(names[0], "keys", names[2]).bind(this);
        // let address_is_invalid = is_invalid(names[0], "keys", names[2]).bind(this);
        // let view_is_valid = is_valid(names[0], "keys", names[3]).bind(this);
        // let view_is_invalid = is_invalid(names[0], "keys", names[3]).bind(this);
        // let spend_is_valid = is_valid(names[0], "keys", names[4]).bind(this);
        // let spend_is_invalid = is_invalid(names[0], "keys", names[4]).bind(this);
        return (
            <Row>
                <Col>
                    <Form noValidate validated={this.props.restore_wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch,this.props.restore_wizard.data[names[0]], names ) }}>
                        <Tabs id="controlled-tab-example" activeKey={this.props.restore_wizard.data[names[0]]} onSelect={(val) => { let t = {}; t[names[0]] = val; addWizardData(this.props.dispatch, t, "restore") }}>
                            <Tab eventKey="mnemonic" title={this.props.t("mnemonic")}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId={names[1]}>
                                        <Form.Label >{this.props.t("25_word_mnemonic")}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.props.restore_wizard.data[names[1]]}
                                            isValid={is_valid.bind(this, names[0], "mnemonic", names[1])()}
                                            isInvalid={is_invalid.bind(this,names[0], "mnemonic", names[1])()}
                                            onChange={
                                                (event) => { handleChange(this.props.dispatch,event.target.value, names[1], "mnemonic");}
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")} {this.props.t("required_25_words")}</Form.Control.Feedback>
                                      
                                    </Form.Group>
                                </Form.Row>
                            </Tab>
                            <Tab eventKey="keys" title={this.props.t("keys")}>
                            <Form.Row>
                                    <Form.Group as={Col} controlId={names[2]}>
                                        <Form.Label >{this.props.t("address")}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.props.restore_wizard.data[names[2]]}
                                            isValid={is_valid.bind(this, names[0], "keys", names[2])()}
                                            isInvalid={is_invalid.bind(this,names[0], "keys", names[2])()}
                                            onChange={
                                                (event) => { handleChange(this.props.dispatch,event.target.value, names[2], "keys");}
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                      
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId={names[3]}>
                                        <Form.Label >{this.props.t("private_view")}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.props.restore_wizard.data[names[3]]}
                                            isValid={is_valid.bind(this, names[0], "keys", names[3])()}
                                            isInvalid={is_invalid.bind(this,names[0], "keys", names[3])()}
                                            onChange={
                                                (event) => { handleChange(this.props.dispatch,event.target.value, names[3], "keys");}
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                      
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId={names[4]}>
                                        <Form.Label >{this.props.t("private_spend")}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.props.restore_wizard.data[names[4]]}
                                            isValid={is_valid.bind(this, names[0], "keys", names[4])()}
                                            isInvalid={is_invalid.bind(this,names[0], "keys", names[4])()}
                                            onChange={
                                                (event) => { handleChange(this.props.dispatch,event.target.value, names[4], "keys");}
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                      
                                    </Form.Group>
                                </Form.Row>


                            </Tab>
                        </Tabs>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="danger" onClick={this.props.back}>{this.props.t('back_button')}</Button>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="success" type="submit" >{this.props.t('next_button')}</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Col>

            </Row>



        );
    }
}
export default withTranslation('init')(connect(mapStateToProps)(WizardData));