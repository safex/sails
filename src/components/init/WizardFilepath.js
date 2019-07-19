import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { chooseCreateFilepath, addWizardData, wizardBack, wizardNext, addWizardTouched, addWizardErrors } from '../../modules/init.module';
import { Row, Col, Form, Button } from 'react-bootstrap';



const mapStateToProps = (state) => {
    return {
        restore_wizard: state.restore_wizard
    };
};

const handleSubmit = (event, dispatch) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        addWizardData(dispatch, { validated: false },"restore");
    }
    else {
        addWizardData(dispatch, { validated: true },"restore");
        wizardNext(dispatch,"restore");

    }

};

const handleChange = (value, prop, dispatch) => {

    let data = {}; data[prop] = value;
    addWizardData(dispatch, data,"restore");
    data[prop]=true;
    addWizardTouched(dispatch, data, "restore");
    if (!value) {
        data[prop] = true;
    }
    else {
        data[prop] = false;
    }
    addWizardErrors(dispatch, data,"create");

}





class CreateFilepath extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        addWizardData(this.props.dispatch, {create_filepath: false, create_wallet_name: false},this.props.component);
        addWizardData(this.props.dispatch, { create_filepath: false, create_wallet_name: false  },this.props.component);
        addWizardData(this.props.dispatch, { validated: false },this.props.component);
    }


    render() {
        let options = {
            title: this.props.t("choose_filepath")
        };
        let filepath_is_valid = (this.props.restore_wizard.touched.hasOwnProperty('create_filepath') && this.props.restore_wizard.touched.create_filepath) && (this.props.restore_wizard.errors.hasOwnProperty('create_filepath') && !this.props.create_wizard.errors.create_filepath);
        let filepath_is_invalid = (this.props.restore_wizard.touched.hasOwnProperty('create_filepath') && this.props.restore_wizard.touched.create_filepath) && (this.props.restore_wizard.errors.hasOwnProperty('create_filepath') && this.props.create_wizard.errors.create_filepath);
        let wallet_name_is_valid = (this.props.restore_wizard.touched.hasOwnProperty('create_wallet_name') && this.props.restore_wizard.touched.create_wallet_name) && (this.props.restore_wizard.errors.hasOwnProperty('create_wallet_name') && !this.props.create_wizard.errors.create_wallet_name);
        let wallet_name_is_invalid = (this.props.restore_wizard.touched.hasOwnProperty('create_wallet_name') && this.props.restore_wizard.touched.create_wallet_name) && (this.props.restore_wizard.errors.hasOwnProperty('create_wallet_name') && this.props.create_wizard.errors.create_wallet_name);
        return (
            <Row>
                <Col>
                    <Form noValidate validated={this.props.create_wizard.data.validated} onSubmit={(event) => { handleSubmit(event, this.props.dispatch) }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="create_filepath">
                                <Form.Label >{this.props.t("choose_filepath")}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.props.create_wizard.data.filepath}
                                    disabled={true}
                                    isValid={filepath_is_valid}
                                    isInvalid={filepath_is_invalid}
                                />
                                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                                <Button variant="primary" onClick={() => { chooseCreateFilepath(this.props.dispatch, options, "", this.props.dispatch, this.props.create_wizard.data.touched, this.props.create_wizard.data.errors) }} >{this.props.t("browse_button")}</Button>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="wallet_name">
                                <Form.Label >{this.props.t("wallet_name_label")}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.props.create_wizard.data.create_wallet_name}
                                    isValid={wallet_name_is_valid}
                                    isInvalid={wallet_name_is_invalid}
                                    onChange={
                                        (event) => { handleChange(event.target.value, 'create_wallet_name', this.props.dispatch) }
                                    }
                                />
                                <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="primary" onClick={() => { wizardBack(this.props.dispatch, ['create_filepath', 'create_wallet_name'],"create", (history) => { history.push('/'); }, [this.props.history]) }}>{this.props.t('back_button')}</Button>
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