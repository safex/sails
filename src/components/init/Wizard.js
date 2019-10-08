import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { WizardData, WizardFilepath, WizardConfirmPassword, WizardReview, WizardPassword, WizardLegacy } from './index';
import { Form, Row, Col, ProgressBar, Container } from 'react-bootstrap';
import { startRestoringWallet, startCreatingWallet, startOpeningWallet } from '../../redux/actions/init.action';
import { handleChange, handleSelectTab, previousStep, nextStep, walletFile, restore, create, open } from '../../libs/wizard';
import { validateKeys, validateMnemonic, validateConfirmPassword } from '../../libs/validators';


class Wizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            data: {
                open_filepath: "",
                open_password: "",
                create_filepath: "",
                create_password: "",
                create_confirm_password: "",
                restore_type: "mnemonic",
                restore_mnemonic: "",
                restore_address: "",
                restore_view: "",
                restore_spend: "",
                password_visible: false,
                legacy_keys_modal: false,
                legacy_wallet: null
            },
            errors: {
                open_filepath: false,
                open_password: false,
                create_filepath: false,
                create_password: false,
                create_confirm_password: false,
                restore_mnemonic: false,
                restore_address: false,
                restore_view: false,
                restore_spend: false,
                equal: false
            },
            touched: {
                open_filepath: false,
                open_password: false,
                create_filepath: false,
                create_password: false,
                create_confirm_password: false,
                restore_mnemonic: false,
                restore_address: false,
                restore_view: false,
                restore_spend: false
            }
        }
        this.initialState = this.state;
        this.additional = {
            restore: {
                steps: 4,
                data: {
                    show_on_step: 1,
                    prop_names: ["restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"],
                    back: previousStep.bind(this),
                    next: () => {
                        let validation = false;
                        if (this.state.data.restore_type === "mnemonic") {
                            validation = validateMnemonic(this.state.data.restore_mnemonic.trim());
                        }
                        else {
                            validation = validateKeys(this.state.data.restore_address.trim(), this.state.data.restore_view.trim(), this.state.data.restore_spend.trim());
                        }


                        if (validation !== false) {
                            nextStep.bind(this)();
                        }
                    }
                },
                filepath_create: {
                    show_on_step: 2,
                    prop_names: ["create_filepath"],
                    options: {
                        title: this.props.t("choose_filepath"),
                        filters: [{
                            name: 'Sails Wallet',
                            extensions: ['sails']
                        }]
                    },
                    back: () => {
                        this.setState({ data: { ...this.state.data, create_filepath: '' } });
                        this.setState({ touched: { ...this.state.touched, create_filepath: false } });
                        this.setState({ errors: { ...this.state.errors, create_filepath: false } });
                        previousStep.bind(this)();
                    },
                    next: () => {
                        let validation = false;
                        if (this.state.data.create_filepath !== "") validation = true;
                        if (validation) {
                            nextStep.bind(this)();
                        }


                    }

                },
                confirm_password: {
                    show_on_step: 3,
                    prop_names: ["create_password", "create_confirm_password"],
                    form_fields: ["create_filepath", "create_password", "create_confirm_password", "restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"],
                    prev_data: ["create_filepath"],
                    back: () => {
                        this.setState({ data: { ...this.state.data, create_password: '', create_confirm_password: '' } });
                        this.setState({ touched: { ...this.state.touched, create_password: false, create_confirm_password: false } });
                        this.setState({ errors: { ...this.state.errors, create_password: false, create_confirm_password: false } });
                        previousStep.bind(this)();
                    },
                    next: () => {
                        let validation = true;
                        if ((this.state.data.create_password.trim() === "")
                            || (this.state.data.create_confirm_password.trim() === "")
                            || (!validateConfirmPassword(this.state.data.create_password.trim(), this.state.data.create_confirm_password.trim()))) validation = false;

                        if (validation) {
                            nextStep.bind(this)();
                            restore.bind(this)();
                        }

                    }



                },
                review: {
                    show_on_step: 4,
                    form_fields: ["create_filepath", "create_password"],
                    prop_names: ["create_password", "create_confirm_password"]

                }
            },
            open: {
                steps: 2,
                filepath_open: {
                    show_on_step: 1,
                    prop_names: ["open_filepath"],
                    type: "default",
                    options: {
                        title: this.props.t("choose_filepath"),
                        filters: [{
                            name: 'Sails Wallet',
                            extensions: ['sails']
                        }]
                    },
                    back: previousStep.bind(this),
                    next: () => {
                        let validation = false;
                        if (this.state.data.open_filepath !== "") validation = true;
                        if (validation) {
                            nextStep.bind(this)();
                        }
                    }

                },
                password: {
                    show_on_step: 2,
                    last_step: true,
                    prop_names: ["open_password"],
                    form_fields: ["open_filepath", "open_password"],
                    prev_data: ["open_filepath"],
                    back: () => {
                        this.setState({ data: { ...this.state.data, open_password: '' } });
                        this.setState({ touched: { ...this.state.touched, open_password: false } });
                        this.setState({ errors: { ...this.state.errors, open_password: false } });
                        previousStep.bind(this)();
                    },
                    next: () => {
                        let validation = true;
                        if (this.state.data.open_password.trim() === "") validation = false;

                        if (validation) {
                            nextStep.bind(this)();
                            open.bind(this);
                        }

                    }
                }
            },
            create: {
                steps: 3,
                filepath_create: {
                    show_on_step: 1,
                    prop_names: ["create_filepath"],
                    options: {
                        title: this.props.t("choose_filepath"),
                        filters: [{
                            name: 'Sails Wallet',
                            extensions: ['sails']
                        }]
                    },
                    back: previousStep.bind(this),
                    next: () => {
                        let validation = false;
                        if (this.state.data.create_filepath !== "") validation = true;
                        if (validation) {
                            nextStep.bind(this)();
                        }
                    }

                },
                confirm_password: {
                    show_on_step: 2,
                    prop_names: ["create_password", "create_confirm_password"],
                    form_fields: ["create_filepath", "create_password", "create_confirm_password"],
                    prev_data: ["create_filepath"],
                    back: () => {
                        this.setState({ data: { ...this.state.data, create_password: '', create_confirm_password: '' } });
                        this.setState({ touched: { ...this.state.touched, create_password: false, create_confirm_password: false } });
                        this.setState({ errors: { ...this.state.errors, create_password: false, create_confirm_password: false } });
                        previousStep.bind(this)();
                    },
                    next: () => {
                        let validation = true;
                        if ((this.state.data.create_password.trim() === "")
                            || (this.state.data.create_confirm_password.trim() === "")
                            || (!validateConfirmPassword(this.state.data.create_password.trim(), this.state.data.create_confirm_password.trim()))) validation = false;

                        if (validation) {
                            nextStep.bind(this)();
                            create.bind(this)();
                        }

                    }



                },
                review: {
                    show_on_step: 3,
                    form_fields: ["create_filepath", "create_password"],
                    prop_names: ["create_password", "create_confirm_password"]
                }

            },
            legacy: {
                steps: 2,
                filepath_open: {
                    show_on_step: 1,
                    prop_names: ["open_filepath"],
                    type: "legacy",
                    legacy_type: props.hasOwnProperty('legacy_type') ? props.legacy_type : false,
                    options: {
                        title: this.props.t("choose_filepath"),
                        filters: [{
                            name: 'V7 Wallet',
                            extensions: ['dat']
                        }]
                    },
                    back: previousStep.bind(this),
                    next: () => {
                        let validation = false;
                        if (this.state.data.open_filepath !== "") validation = true;
                        if (validation) {
                            nextStep.bind(this)();
                        }
                    }

                },
                password: {
                    show_on_step: 2,
                    last_step: true,
                    prop_names: ["open_password"],
                    form_fields: ["open_filepath", "open_password"],
                    prev_data: ["open_filepath"],
                    back: () => {
                        this.setState({ data: { ...this.state.data, open_password: '' } });
                        this.setState({ touched: { ...this.state.touched, open_password: false } });
                        this.setState({ errors: { ...this.state.errors, open_password: false } });
                        previousStep.bind(this)();
                    },
                    next: () => {
                        let validation = true;
                        if (this.state.data.open_password.trim() === "") validation = false;

                        if (validation) {
                            nextStep.bind(this)();
                            // openLegacy.bind(this);
                        }

                    }
                }
            }

        }
    }




    render() {
        return (
            <Container>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "80%"
                }}>
                    <Row>
                        <Col>
                            <ProgressBar variant="info" now={this.state.step * (100.00 / this.additional[this.props.component].steps)} />
                        </Col>
                    </Row>
                    <Form>
                        <WizardFilepath
                            daemon={this.props.daemon}
                            step={this.state.step}
                            show_on_step={
                                this.additional[this.props.component].hasOwnProperty("filepath_open") ?
                                    (this.additional[this.props.component].filepath_open.hasOwnProperty('show_on_step') ? this.additional[this.props.component].filepath_open.show_on_step : false) : false
                            }
                            key={`${this.props.component}-wizard-filepath-open`}
                            component={this.props.component}
                            history={this.props.history}
                            values={{ "open_filepath": this.state.data.open_filepath }}
                            prop_names={
                                this.additional[this.props.component].hasOwnProperty("filepath_open") ?
                                    (this.additional[this.props.component].filepath_open.hasOwnProperty('prop_names') ? this.additional[this.props.component].filepath_open.prop_names : []) : []
                            }
                            type="open"
                            legacy_type={
                                this.additional[this.props.component].hasOwnProperty("filepath_open") ?
                                    (this.additional[this.props.component].filepath_open.hasOwnProperty('legacy_type') ? this.additional[this.props.component].filepath_open.legacy_type : false) : false
                            }
                            options={
                                this.additional[this.props.component].hasOwnProperty("filepath_open") ?
                                    (this.additional[this.props.component].filepath_open.hasOwnProperty('options') ? this.additional[this.props.component].filepath_open.options : {}) : {}
                            }
                            back={
                                this.additional[this.props.component].hasOwnProperty("filepath_open") ?
                                    (this.additional[this.props.component].filepath_open.hasOwnProperty('back') ? this.additional[this.props.component].filepath_open.back : () => { }) : () => { }
                            }
                            next={
                                this.additional[this.props.component].hasOwnProperty("filepath_open") ?
                                    (this.additional[this.props.component].filepath_open.hasOwnProperty('next') ? this.additional[this.props.component].filepath_open.next : "") : ""
                            }
                            touched={this.state.touched}
                            errors={this.state.errors}
                            handleChange={handleChange.bind(this)}
                            walletFile={walletFile.bind(this)}
                        />

                        <WizardPassword
                            daemon={this.props.daemon}
                            step={this.state.step}
                            show_on_step={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('show_on_step') ? this.additional[this.props.component].password.show_on_step : false) : false
                            }
                            key={`${this.props.component}-wizard-password`}
                            component={this.props.component}
                            history={this.props.history}
                            values={
                                {
                                    "open_password": this.state.data.open_password
                                }
                            }
                            prop_names={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('prop_names') ? this.additional[this.props.component].password.prop_names : []) : []
                            }
                            last_step={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('last_step') ? this.additional[this.props.component].password.last_step : false) : false
                            }
                            prev_data={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('prev_data') ? this.additional[this.props.component].password.prev_data : []) : []
                            }
                            form_fields={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('form_fields') ? this.additional[this.props.component].password.form_fields : []) : []
                            }
                            back={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('back') ? this.additional[this.props.component].password.back : () => { }) : () => { }
                            }
                            next={
                                this.additional[this.props.component].hasOwnProperty("password") ?
                                    (this.additional[this.props.component].password.hasOwnProperty('next') ? this.additional[this.props.component].password.next : "") : ""
                            }
                            data={this.state.data}
                            touched={this.state.touched}
                            errors={this.state.errors}
                            handleChange={handleChange.bind(this)}
                        />
                        <WizardData
                            key={`${this.props.component}-wizard-data`}
                            daemon={this.props.daemon}
                            step={this.state.step}
                            show_on_step={
                                this.additional[this.props.component].hasOwnProperty("data") ?
                                    (this.additional[this.props.component].data.hasOwnProperty('show_on_step') ? this.additional[this.props.component].data.show_on_step : false) : false
                            }
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
                            next={
                                this.additional[this.props.component].hasOwnProperty("data") ?
                                    (this.additional[this.props.component].data.hasOwnProperty('next') ? this.additional[this.props.component].data.next : "") : ""
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
                            show_on_step={
                                this.additional[this.props.component].hasOwnProperty("filepath_create") ?
                                    (this.additional[this.props.component].filepath_create.hasOwnProperty('show_on_step') ? this.additional[this.props.component].filepath_create.show_on_step : false) : false
                            }
                            key={`${this.props.component}-wizard-filepath-create`}
                            component={this.props.component}
                            history={this.props.history}
                            values={{ "create_filepath": this.state.data.create_filepath }}
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
                                    (this.additional[this.props.component].filepath_create.hasOwnProperty('back') ? this.additional[this.props.component].filepath_create.back : () => { }) : () => { }
                            }
                            next={
                                this.additional[this.props.component].hasOwnProperty("filepath_create") ?
                                    (this.additional[this.props.component].filepath_create.hasOwnProperty('next') ? this.additional[this.props.component].filepath_create.next : "") : ""
                            }
                            touched={this.state.touched}
                            errors={this.state.errors}
                            handleChange={handleChange.bind(this)}
                            walletFile={walletFile.bind(this)}
                        />

                        <WizardConfirmPassword
                            daemon={this.props.daemon}
                            step={this.state.step}
                            show_on_step={
                                this.additional[this.props.component].hasOwnProperty("confirm_password") ?
                                    (this.additional[this.props.component].confirm_password.hasOwnProperty('show_on_step') ? this.additional[this.props.component].confirm_password.show_on_step : false) : false
                            }
                            key={`${this.props.component}-wizard-confirm-password`}
                            component={this.props.component}
                            history={this.props.history}
                            values={
                                {
                                    "create_password": this.state.data.create_password,
                                    "create_confirm_password": this.state.data.create_confirm_password
                                }
                            }
                            prop_names={
                                this.additional[this.props.component].hasOwnProperty("confirm_password") ?
                                    (this.additional[this.props.component].confirm_password.hasOwnProperty('prop_names') ? this.additional[this.props.component].confirm_password.prop_names : []) : []
                            }
                            prev_data={
                                this.additional[this.props.component].hasOwnProperty("confirm_password") ?
                                    (this.additional[this.props.component].confirm_password.hasOwnProperty('prev_data') ? this.additional[this.props.component].confirm_password.prev_data : []) : []
                            }
                            form_fields={
                                this.additional[this.props.component].hasOwnProperty("confirm_password") ?
                                    (this.additional[this.props.component].confirm_password.hasOwnProperty('form_fields') ? this.additional[this.props.component].confirm_password.form_fields : []) : []
                            }
                            back={
                                this.additional[this.props.component].hasOwnProperty("confirm_password") ?
                                    (this.additional[this.props.component].confirm_password.hasOwnProperty('back') ? this.additional[this.props.component].confirm_password.back : () => { }) : () => { }
                            }
                            next={
                                this.additional[this.props.component].hasOwnProperty("confirm_password") ?
                                    (this.additional[this.props.component].confirm_password.hasOwnProperty('next') ? this.additional[this.props.component].confirm_password.next : "") : ""
                            }
                            data={this.state.data}
                            touched={this.state.touched}
                            errors={this.state.errors}
                            handleChange={handleChange.bind(this)}
                        />

                        <WizardReview
                            daemon={this.props.daemon}
                            step={this.state.step}
                            show_on_step={
                                this.additional[this.props.component].hasOwnProperty("review") ?
                                    (this.additional[this.props.component].review.hasOwnProperty('show_on_step') ? this.additional[this.props.component].review.show_on_step : false) : false
                            }
                            key={`${this.props.component}-wizard-review`}
                            component={this.props.component}
                            history={this.props.history}
                            data={this.state.data}
                            form_fields={
                                this.additional[this.props.component].hasOwnProperty("review") ?
                                    (this.additional[this.props.component].review.hasOwnProperty('form_fields') ? this.additional[this.props.component].review.form_fields : []) : []
                            }
                            prop_names={
                                this.additional[this.props.component].hasOwnProperty("review") ?
                                    (this.additional[this.props.component].review.hasOwnProperty('prop_names') ? this.additional[this.props.component].review.prop_names : []) : []
                            }
                            handleChange={handleChange.bind(this)}
                            next={nextStep.bind(this)}
                        />
                    </Form>
                </div>
            </Container>
        );

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startRestoringWallet: (api, body) => { dispatch(startRestoringWallet(api, body)) },
        startCreatingWallet: (body) => { dispatch(startCreatingWallet(body)) },
        startOpeningWallet: (body) => { dispatch(startOpeningWallet(body)) }
    }

}
const mapStateToProps = (state) => {
    return {
        daemon: state.daemon
    };
};

export default withTranslation('init')(connect(mapStateToProps, mapDispatchToProps)(Wizard));