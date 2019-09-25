import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, addWizardErrors, addWizardTouched, wizardNext, open, openLegacy } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        wizard: state.wizard,
    };
};

const handleSubmit = (event, dispatch, history, data, names, daemon, component = "open") => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        addWizardData(dispatch, { validated: false });
    }
    else {
        addWizardData(dispatch, { validated: true });
        if (component === "open") { wizardNext(dispatch, open, [dispatch, history, data, names, daemon]); }
        if (component === "legacy") { wizardNext(dispatch, openLegacy, [dispatch, data, names]); }

    }
};

const handleChange = (value, prop, dispatch, _touched, _errors) => {
    let data = {}; data[prop] = value;
    addWizardData(dispatch, data);
    data[prop] = true;
    addWizardTouched(dispatch, data);
    let error = { ..._errors };
    if (!value) {
        error[prop] = true;
    }
    else {
        error[prop] = false;
    }
    addWizardErrors(dispatch, error);
}


let is_valid = function (data) {
    return ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(data) && !this.props.wizard.errors[data]));
}
let is_invalid = function (data) {
    return ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(data) && this.props.wizard.errors[data]));
}
class WizardPassword extends Component {
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
        let names = this.props.prop_names;
        let prevs = this.props.prev_data.map((x, i) => { return <Row key={`prevs-row-${i}`}> <Col key={`prevs-col1-${i}`}> {this.props.t(x)}</Col> <Col key={`prevs-col2-${i}`}>{this.props.wizard.data[x]}</Col></Row> });
        if (this.props.show_on_step === false) return null;
        if (this.props.step !== this.props.show_on_step) return null;
        return (
            <Row>
                <Col>
                    {prevs}
                    <Row>
                        <Col>
                            <Form noValidate validated={this.props.wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch, this.props.history, this.props.wizard.data, this.props.form_fields, this.props.daemon, this.props.component) }}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId={names[0]}>
                                        <Form.Label >{this.props.t(names[0])}</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            value={this.props.wizard.data[names[0]]}
                                            isValid={is_valid.bind(this, names[0])()}
                                            isInvalid={is_invalid.bind(this, names[0])()}
                                            onChange={
                                                (event) => { handleChange(event.target.value, names[0], this.props.dispatch, this.props.wizard.touched, this.props.wizard.errors) }
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Button variant="primary" type="button" onClick={this.props.back}>{this.props.t('back_button')}</Button>
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
export default withTranslation('init')(connect(mapStateToProps)(WizardPassword));