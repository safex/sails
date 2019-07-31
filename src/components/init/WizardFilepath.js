import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { LEGACY_DEFAULT_WALLET_PATH } from '../../setups/conf';
import { walletFile, addWizardData, wizardNext, addWizardTouched, addWizardErrors } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';



const mapStateToProps = (state) => {
    return {
        wizard: state.wizard
    };
};

const handleSubmit = (event, dispatch) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        addWizardData(dispatch, { validated: false });
    }
    else {
        addWizardData(dispatch, { validated: true });
        wizardNext(dispatch);

    }

};
let is_valid = function (data) {
    return ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(data) && !this.props.wizard.errors[data]));
}
let is_invalid = function (data) {
    return ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(data) && this.props.wizard.errors[data]));
}





class WizardFilepath extends Component {

    componentDidMount() {
        let data = this.props.prop_names; data.validated = false;
        let falses = {};
        for (var x in this.props.prop_names) {
            if (this.props.prop_names.hasOwnProperty(x)) {
                falses[x] = false;
            }
        }
        addWizardData(this.props.dispatch, data);
        addWizardErrors(this.props.dispatch, falses);
        addWizardTouched(this.props.dispatch, falses);

        
    }


    render() {
        let names = Object.keys(this.props.prop_names);
        let options = null;
        if (this.props.hasOwnProperty("options") && this.props.options) options = this.props.options;
        if (this.props.type==="open" && this.props.hasOwnProperty("legacy_type") && this.props.legacy_type === "default") {
            let leg={}; leg[names[0]]=LEGACY_DEFAULT_WALLET_PATH
            if ((!this.props.wizard.data.hasOwnProperty(names[0]))) {
                addWizardData(this.props.dispatch, leg);
            }
            else if (this.props.wizard.data[names[0]]  != LEGACY_DEFAULT_WALLET_PATH) {
                addWizardData(this.props.dispatch, leg);
            }
        }
        return (
            <Row>
                <Col>
                    <Form noValidate validated={this.props.wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch) }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId={names[0]}>
                                <Form.Label >{this.props.t(names[0])}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.props.wizard.data[names[0]]}
                                    isValid={is_valid.bind(this, names[0])()}
                                    isInvalid={is_invalid.bind(this, names[0])()}
                                    // disabled={this.props.type !== "open" && !(this.props.hasOwnProperty("legacy_type") && this.props.legacy_type == "default")}
                                />
                                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                <Button variant="primary" 
                                        // disabled={this.props.hasOwnProperty("legacy_type") && this.props.legacy_type == "default"}
                                        onClick={() => { walletFile(this.props.dispatch, options, this.props.type, names[0], this.props.wizard.touched, this.props.wizard.errors) }} >{this.props.t("browse_button")}</Button>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="danger" type="button" onClick={this.props.back}>{this.props.t('back_button')}</Button>
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