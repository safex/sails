import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { initWizardState, wizardBack, initLegacyWallet } from '../../modules/init.module';
import { WizardData, WizardFilepath, WizardConfirmPassword, WizardReview, WizardPassword, WizardLegacy } from './index';
import { Container, Alert, Form, Row, Col, ProgressBar } from 'react-bootstrap';
import { setError, setTouched, setValidation, resetData, handleChange, handleSelectTab } from '../../libs/wizard';
import { validateKeys, validateMnemonic } from '../../libs/validators';

const mapStateToProps = (state) => {
    return {
        daemon: state.daemon
    };
};

class Wizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            data: {
                restore_filepath: "",
                restore_password: "",
                create_filepath: "",
                create_password: "",
                create_confirm_password: "",
                restore_type: "mnemonic",
                restore_mnemonic: "",
                restore_address: "",
                restore_view: "",
                restore_spend: ""
            },
            errors: {
                restore_filepath: false,
                restore_password: false,
                create_filepath: false,
                create_password: false,
                create_confirm_password: false,
                restore_mnemonic: false,
                restore_address: false,
                restore_view: false,
                restore_spend: false
            },
            touched: {
                restore_filepath: false,
                restore_password: false,
                create_filepath: false,
                create_password: false,
                create_confirm_password: false,
                restore_mnemonic: false,
                restore_address: false,
                restore_view: false,
                restore_spend: false
            },
            validated: false
        }
        this.initialState = this.state;
        this.additional = {
            restore: {
                steps: 4,
                data: {
                    prop_names: ["restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"],
                    back: () => { wizardBack(this.props.dispatch, ["restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"], (history) => { history.push('/'); }, [this.props.history]) }
                },
                filepath_create: {
                    prop_names: [],
                    options: {
                        title: this.props.t("choose_filepath"),
                        filters: [{
                            name: 'Sails Wallet',
                            extensions: ['sails']
                        }]
                    },
                    back: () => { wizardBack(this.props.dispatch, ["create_filepath"]) }
                }

            },
            open: {},
            create: {},
            legacy: {}

        }
    }




    render() {
        return (
            <>
                <Row>
                    <Col>
                        <ProgressBar variant="info" now={this.state.step * (100.00 / this.additional[this.props.component].steps)} />
                    </Col>
                </Row>
                <Form noValidate validated={this.state.validated} onSubmit={this.additional[this.props.component].handleSubmit}>
                    <WizardData
                        key={`${this.props.component}-wizard-data`}
                        daemon={this.props.daemon}
                        step={this.state.step}
                        component={this.props.component}
                        history={this.props.history}
                        setError={this.setError}
                        setTouched={this.setTouched}
                        prop_names={
                            this.additional[this.props.component].hasOwnProperty("data") ?
                                (this.additional[this.props.component].data.hasOwnProperty('prop_names') ? this.additional[this.props.component].data.prop_names : []) : []
                        }
                        back={
                            this.additional[this.props.component].hasOwnProperty("data") ?
                                (this.additional[this.props.component].data.hasOwnProperty('back') ? this.additional[this.props.component].data.back : "") : ""
                        }
                        values={
                            {
                                "restore_type": this.state.data.restore_type,
                                "restore_mnemonic": this.state.data.restore_mnemonic,
                                "restore_address": this.state.data.restore_address,
                                "restore_view": this.state.data.restore_view,
                                "restore_spend": this.state.data.restore_spend

                            }
                        }
                        touched={this.state.touched}
                        errors={this.state.errors}
                        handleChange={handleChange.bind(this)}
                        handleSelectTab={handleSelectTab.bind(this)}
                    />

                    <WizardFilepath
                        daemon={this.props.daemon}
                        step={this.state.step}
                        key={`${this.props.component}-wizard-filepath-create`}
                        component={this.props.component}
                        history={this.props.history}
                        prop_names={
                            this.additional[this.props.component].hasOwnProperty("filepath_create") ?
                                (this.additional[this.props.component].filepath_create.hasOwnProperty('prop_names') ? this.additional[this.props.component].filepath_create.prop_names : []) : []
                        }
                        type="create"
                        options={
                            this.additional[this.props.component].hasOwnProperty("filepath_create") ?
                                (this.additional[this.props.component].filepath_create.hasOwnProperty('options') ? this.additional[this.props.component].filepath_create.options : {}) : {}
                        }
                        back={
                            this.additional[this.props.component].hasOwnProperty("filepath_create") ?
                                (this.additional[this.props.component].filepath_create.hasOwnProperty('back') ? this.additional[this.props.component].filepath_create.options : () => { }) : () => { }
                        } />

                    <WizardConfirmPassword
                        daemon={this.props.daemon}
                        key={`${this.props.component}-wizard-confirm-password`}
                        component={this.props.component}
                        history={this.props.history}
                        prop_names={{ "create_password": "", "create_confirm_password": "" }}
                        prev_data={["create_filepath"]}
                        form_fields={["create_filepath", "create_password", "create_confirm_password", "restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"]}
                        back={() => { wizardBack(this.props.dispatch, ["create_password", "create_confirm_password"]) }} />

                    <WizardReview
                        daemon={this.props.daemon}
                        key={`${this.props.component}-wizard-review`}
                        component={this.props.component}
                        history={this.props.history}
                        form_fields={["create_filepath", "create_password"]}
                        prop_names={["create_password", "create_confirm_password"]} />
                </Form>
            </>
        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(Wizard));