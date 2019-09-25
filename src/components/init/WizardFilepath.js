import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { LEGACY_DEFAULT_WALLET_PATH } from '../../setups/conf';
import { walletFile, addWizardData, wizardNext, addWizardTouched, addWizardErrors } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';



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
    return ((this.props.touched.hasOwnProperty(data) && this.props.touched[data]) && (this.props.errors.hasOwnProperty(data) && !this.props.errors[data]));
}
let is_invalid = function (data) {
    return ((this.props.touched.hasOwnProperty(data) && this.props.touched[data]) && (this.props.errors.hasOwnProperty(data) && this.props.errors[data]));
}





class WizardFilepath extends Component {



    render() {
        let names = this.props.prop_names;
        let options = null;
        if (this.props.hasOwnProperty("options") && this.props.options) options = this.props.options;
        if (this.props.type === "open" && this.props.hasOwnProperty("legacy_type") && this.props.legacy_type === "default") {
            if ((!this.props.values.hasOwnProperty(names[0]))) {
                this.props.handleChange({ target: { name: names[0], value: LEGACY_DEFAULT_WALLET_PATH } });

            }
            else if (this.props.values[names[0]] !== LEGACY_DEFAULT_WALLET_PATH) {
                this.props.handleChange({ target: { name: names[0], value: LEGACY_DEFAULT_WALLET_PATH } });
            }
        }
        
        if (this.props.show_on_step === false) return null;
        if (this.props.step !== this.props.show_on_step) return null;
        return (
            <Row>
                <Col>
                    <Form.Row>
                        <Form.Group as={Col} controlId={names[0]}>
                            <Form.Label >{this.props.t(names[0])}</Form.Label>
                            <Form.Control
                                required
                                data-rules="required"
                                type="text"
                                value={this.props.values[names[0]] || ''}
                                isValid={is_valid.bind(this, names[0])()}
                                isInvalid={is_invalid.bind(this, names[0])()}
                                readOnly={true}
                            />
                            <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                            <Button variant="primary"
                                onClick={() => { this.props.walletFile(this.props.options, this.props.type, names[0]) }} >{this.props.t("browse_button")}</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="danger" type="button" onClick={this.props.back}>{this.props.t('back_button')}</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="success" type="button" onClick={this.props.next}>{this.props.t('next_button')}</Button>
                        </Form.Group>
                    </Form.Row>
                </Col>
            </Row>



        );
    }
}
export default withTranslation('init')(connect()(WizardFilepath));