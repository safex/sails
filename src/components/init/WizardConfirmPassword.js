import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
//import { addWizardData, wizardNext, addWizardErrors, addWizardTouched, create, restore } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';




// const handleSubmit = (event, dispatch, data, names, daemon, component = "create", wallet = null) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false || (form[names[1]].value !== form[names[2]].value)) {
//         event.preventDefault();
//         event.stopPropagation();
//         addWizardData(dispatch, { validated: false });
//     }
//     else {
//         addWizardData(dispatch, { validated: true });
//         if (component === "create") { wizardNext(dispatch, create, [dispatch, data, names, daemon, wallet]); }
//         if (component === "restore") { wizardNext(dispatch, restore, [dispatch, data, names, daemon]); }
//         if (component === "legacy") { wizardNext(dispatch, create, [dispatch, data, names, daemon, wallet]); }

//     }

// };



let is_valid = function (data, equal = false) {
    let err = data; if (equal) err = "equal";
    return ((this.props.touched.hasOwnProperty(data) && this.props.touched[data]) && (this.props.errors.hasOwnProperty(err) && !this.props.errors[err]));
}
let is_invalid = function (data, equal = false) {
    let err = data; if (equal) err = "equal";
    return ((this.props.touched.hasOwnProperty(data) && this.props.touched[data]) && (this.props.errors.hasOwnProperty(err) && this.props.errors[err]));
}


class WizardConfirmPassword extends Component {


    render() {
        //names[0] password field
        //names[1] confirm password field

        let names = this.props.prop_names;
        let prevs = this.props.prev_data.map((x, i) => { return <Row key={`prev-row-${i}`}> <Col key={`prev-col1-${i}`}> {this.props.t(x)}</Col> <Col key={`prev-col2-${i}`}>{this.props.data[x]}</Col></Row> });
        if (this.props.show_on_step === false) return null;
        if (this.props.step !== this.props.show_on_step) return null;
        return (
            <>
                <Row>
                    <Col>
                        {prevs}
                        <Row>
                            <Col>
                                <Form.Row>
                                    <Form.Group as={Col} controlId={names[0]}>
                                        <Form.Label >{this.props.t(names[0])}</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name={names[0]}
                                            data-linked="create_confirm_password"
                                            data-rules="required, confirm_password"
                                            data-field="equal"
                                            value={this.props.values[names[0]]}
                                            isValid={is_valid.bind(this, names[0])()}
                                            isInvalid={is_invalid.bind(this, names[0])()}
                                            onChange={this.props.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId={names[1]}>
                                        <Form.Label >{this.props.t(names[1])}</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name={names[1]}
                                            data-linked="create_password"
                                            data-rules="required, confirm_password"
                                            data-field="equal"
                                            value={this.props.values[names[1]]}
                                            isValid={is_valid.bind(this, names[1], true)()}
                                            isInvalid={is_invalid.bind(this, names[1], true)()}
                                            onChange={this.props.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">{this.props.t("passwords_dont_match")}</Form.Control.Feedback>
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
                    </Col>
                </Row>
            </>

        );

    }
}
export default withTranslation('init')(connect()(WizardConfirmPassword));