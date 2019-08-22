import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, wizardNext, addWizardErrors, addWizardTouched, create, restore} from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';


const mapStateToProps = (state) => {
    return {
        wizard: state.wizard,
        legacy_wallet: state.legacy_wallet
    };
};

const handleSubmit = (event, dispatch, data, names, component = "create", wallet = null) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || (form[names[1]].value !== form[names[2]].value)) {
        event.preventDefault();
        event.stopPropagation();
        addWizardData(dispatch, { validated: false });
    }
    else {
        addWizardData(dispatch, { validated: true });
        if (component === "create") { wizardNext(dispatch,  create, [dispatch, data, names, wallet]); }
        if (component === "restore") { wizardNext(dispatch, restore, [dispatch, data, names]); }
        if (component === "legacy") { wizardNext(dispatch,  create, [dispatch, data, names, wallet]); }

    }

};


const handleChange = (value, password, prop, dispatch, _touched, _errors) => {

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
    if (value !== password) error.equal = true;
    else error.equal = false;
    addWizardErrors(dispatch, error);

}

let is_valid = function (data, equal = false) {
    let err = data; if (equal) err = "equal";
    return ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(err) && !this.props.wizard.errors[err]));
}
let is_invalid = function (data, equal = false) {
    let err = data; if (equal) err = "equal";
    return ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(err) && this.props.wizard.errors[err]));
}


class WizardConfirmPassword extends Component {
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
        //names[0] password field
        //names[1] confirm password field
        let names = Object.keys(this.props.prop_names);
        let prevs = this.props.prev_data.map((x,i) => { return <Row key={`prev-row-${i}`}> <Col key={`prev-col1-${i}`}> {this.props.t(x)}</Col> <Col key={`prev-col2-${i}`}>{this.props.wizard.data[x]}</Col></Row> });
        return (
            <>

                <Row>
                    <Col>
                        {prevs}
                        <Row>
                            <Col>
                                <Form noValidate validated={this.props.wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch, this.props.wizard.data, this.props.form_fields, this.props.component, this.props.legacy_wallet) }}>
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
                                                    (event) => { handleChange(event.target.value, this.props.wizard.data[names[1]], names[0], this.props.dispatch, this.props.wizard.touched, this.props.wizard.errors) }
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
                                                value={this.props.wizard.data[names[1]]}
                                                isValid={is_valid.bind(this, names[1], true)()}
                                                isInvalid={is_invalid.bind(this, names[1], true)()}
                                                onChange={
                                                    (event) => { handleChange(event.target.value, this.props.wizard.data[names[0]], names[1], this.props.dispatch, this.props.wizard.touched, this.props.wizard.errors) }
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">{this.props.t("passwords_dont_match")}</Form.Control.Feedback>
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
                    </Col>
                </Row>
            </>

        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(WizardConfirmPassword));