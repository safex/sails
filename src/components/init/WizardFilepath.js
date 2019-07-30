import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { walletFile,  addWizardData, wizardBack, wizardNext, addWizardTouched, addWizardErrors } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';



const mapStateToProps = (state) => {
    return {
        restore_wizard: state.restore_wizard
    };
};

const handleSubmit = (event, dispatch, component="create") => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        addWizardData(dispatch, { validated: false },component);
    }
    else {
        addWizardData(dispatch, { validated: true },component);
        wizardNext(dispatch,component);

    }

};
let is_valid = function( data) {
    return ((this.props.restore_wizard.touched.hasOwnProperty(data) && this.props.restore_wizard.touched[data]) && (this.props.restore_wizard.errors.hasOwnProperty(data) && !this.props.restore_wizard.errors[data]));
}
let is_invalid= function(data) {
    return ((this.props.restore_wizard.touched.hasOwnProperty(data) && this.props.restore_wizard.touched[data]) && (this.props.restore_wizard.errors.hasOwnProperty(data) && this.props.restore_wizard.errors[data]));
}





class WizardFilepath extends Component {
    constructor(props){
        super(props);
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
        console.log("restore wizard fielpath");
        console.log(this.props.restore_wizard.data);
        let names = Object.keys(this.props.prop_names);
        let options = null;
        if(this.props.hasOwnProperty("options") && this.props.options) options=this.props.options;
        return (
            <Row>
                <Col>
                    <Form noValidate validated={this.props.restore_wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch, this.props.component) }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId={names[0]}>
                                <Form.Label >{this.props.t(names[0])}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.props.restore_wizard.data[names[0]]}
                                    isValid={is_valid.bind(this, names[0])()}
                                    isInvalid={is_invalid.bind(this,names[0])()}
                                    disabled={ this.props.type!="open"}
                                />
                                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                <Button variant="primary" onClick={() => { walletFile(this.props.dispatch, options, this.props.component, this.props.type,names[0], this.props.restore_wizard.touched, this.props.restore_wizard.errors) }} >{this.props.t("browse_button")}</Button>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="primary" onClick={this.props.back}>{this.props.t('back_button')}</Button>
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
export default withTranslation('init')(connect(mapStateToProps)(WizardFilepath));