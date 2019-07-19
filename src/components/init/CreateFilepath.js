import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { chooseCreateFilepath, addWizardData, wizardBack, wizardNext } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';



const mapStateToProps = (state) => {
    return {
        create_wizard: state.create_wizard
    };
};

const handleSubmit = (event, dispatch) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        addWizardData(dispatch, { validated: false },"create");
    }
    else {
        addWizardData(dispatch, { validated: true },"create");
        wizardNext(dispatch,"create");

    }

};

const handleChange = (value, prop, dispatch, _touched, _errors) => {

    let data = {}; data[prop] = value;
    let touchedN = { ..._touched }; touchedN[prop] = true;
    addWizardData(dispatch, { touched: touchedN },"create");
    let error = { ..._errors };
    addWizardData(dispatch, data,"create");
    if (!value) {
        error[prop] = true;
    }
    else {
        error[prop] = false;
    }
    addWizardData(dispatch, { errors: error },"create");

}




class CreateFilepath extends Component {

    componentDidMount() {
        addWizardData(this.props.dispatch, { touched: { filepath: false, wallet_name: false } },"create");
        addWizardData(this.props.dispatch, { errors: { filepath: false, wallet_name: false } },"create");
        addWizardData(this.props.dispatch, { validated: false },"create");
    }


    render() {
        let options = {
            title: this.props.t("create.form.choose_filepath")
        };
        let filepath_is_valid = (this.props.create_wizard.data.touched.hasOwnProperty('filepath') && this.props.create_wizard.data.touched.filepath) && (this.props.create_wizard.data.errors.hasOwnProperty('filepath') && !this.props.create_wizard.data.errors.filepath);
        let filepath_is_invalid = (this.props.create_wizard.data.touched.hasOwnProperty('filepath') && this.props.create_wizard.data.touched.filepath) && (this.props.create_wizard.data.errors.hasOwnProperty('filepath') && this.props.create_wizard.data.errors.filepath);
        let wallet_name_is_valid = (this.props.create_wizard.data.touched.hasOwnProperty('wallet_name') && this.props.create_wizard.data.touched.wallet_name) && (this.props.create_wizard.data.errors.hasOwnProperty('wallet_name') && !this.props.create_wizard.data.errors.wallet_name);
        let wallet_name_is_invalid = (this.props.create_wizard.data.touched.hasOwnProperty('wallet_name') && this.props.create_wizard.data.touched.wallet_name) && (this.props.create_wizard.data.errors.hasOwnProperty('wallet_name') && this.props.create_wizard.data.errors.wallet_name);
        return (
            <Row>
                <Col>
                    <Form noValidate validated={this.props.create_wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch) }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="create_filepath">
                                <Form.Label >{this.props.t("create.form.choose_filepath")}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.props.create_wizard.data.filepath}
                                    disabled={true}
                                    isValid={filepath_is_valid}
                                    isInvalid={filepath_is_invalid}
                                />
                                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                <Button variant="primary" onClick={() => { chooseCreateFilepath(this.props.dispatch, options, "default", this.props.dispatch, this.props.create_wizard.data.touched, this.props.create_wizard.data.errors) }} >{this.props.t("browse_button")}</Button>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="wallet_name">
                                <Form.Label >{this.props.t("create.form.wallet_name_label")}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.props.create_wizard.data.wallet_name}
                                    isValid={wallet_name_is_valid}
                                    isInvalid={wallet_name_is_invalid}
                                    onChange={
                                        (event) => { handleChange(event.target.value, 'wallet_name', this.props.dispatch, this.props.create_wizard.data.touched, this.props.create_wizard.data.errors) }
                                    }
                                />
                                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="primary" onClick={() => { wizardBack(this.props.dispatch, ['filepath', 'wallet_name'],"create", (history) => { history.push('/'); }, [this.props.history]) }}>{this.props.t('back_button')}</Button>
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
export default withTranslation('init')(connect(mapStateToProps)(CreateFilepath));