import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { initWizardState, wizardBack, initLegacyWallet } from '../../modules/init.module';
import { WizardData, WizardFilepath, WizardConfirmPassword, WizardReview, WizardPassword, WizardLegacy } from './index';
import { Container, Alert } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        wizard: state.wizard,
        daemon: state.daemon
    };
};

class Wizard extends Component {
    componentWillMount() {
        //component value create/legacy/open/restore
        initWizardState(this.props.dispatch, this.props.component);

    }
    render() {
        var component;
        switch (this.props.component) {
            case 'restore':
                switch (this.props.wizard.step) {
                    case 1:
                        component = <WizardData
                            daemon={this.props.daemon}
                            key="restore-wizard-data"
                            component="restore"
                            history={this.props.history}
                            prop_names={{ "restore_type": "mnemonic", "restore_mnemonic": "", "restore_address": "", "restore_view": "", "restore_spend": "" }}
                            back={() => { wizardBack(this.props.dispatch, ["restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"], (history) => { history.push('/'); }, [this.props.history]) }} />;
                        break;
                    case 2:
                        component = <WizardFilepath
                            daemon={this.props.daemon}
                            key="restore-wizard-filepath"
                            component="restore"
                            history={this.props.history}
                            prop_names={{ "create_filepath": "" }}
                            type="create"
                            options={{
                                title: this.props.t("choose_filepath"),
                                filters: [{
                                    name: 'Sails Wallet',
                                    extensions: ['sails']
                                }]
                            }}
                            back={() => { wizardBack(this.props.dispatch, ["create_filepath"]) }} />;
                        break;
                    case 3:
                        component = <WizardConfirmPassword
                            daemon={this.props.daemon}
                            key="restore-wizard-confirm-password"
                            component="restore"
                            history={this.props.history}
                            prop_names={{ "create_password": "", "create_confirm_password": "" }}
                            prev_data={["create_filepath"]}
                            form_fields={["create_filepath", "create_password", "create_confirm_password", "restore_type", "restore_mnemonic", "restore_address", "restore_view", "restore_spend"]}
                            back={() => { wizardBack(this.props.dispatch, ["create_password", "create_confirm_password"]) }} />;
                        break;
                    case 4:
                        component = <WizardReview
                            daemon={this.props.daemon}
                            key="restore-wizard-review"
                            component="restore"
                            history={this.props.history}
                            form_fields={["create_filepath", "create_password"]}
                            prop_names={["create_password", "create_confirm_password"]} />;
                        break;
                    default:
                        component = <Alert
                            key="restore-wizard-alert"
                            variant="danger"
                            history={this.props.history}
                            dismissible >
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p> Report it to the Safex wallet team :D</p>
                        </Alert>;
                        break;
                }
                break;
            case 'create':
                switch (this.props.wizard.step) {
                    case 1:
                        component = <WizardFilepath
                            daemon={this.props.daemon}
                            key="create-wizard-filepath"
                            component="create"
                            history={this.props.history}
                            prop_names={{ "create_filepath": "" }}
                            type="create"
                            options={{
                                title: this.props.t("choose_filepath"),
                                filters: [{
                                    name: 'Sails Wallet',
                                    extensions: ['sails']
                                }]
                            }}
                            back={() => { wizardBack(this.props.dispatch, ["create_filepath"], (history) => { history.push('/'); }, [this.props.history]) }} />;
                        break;
                    case 2:
                        component = <WizardConfirmPassword
                            daemon={this.props.daemon}
                            key="create-wizard-confirm-password"
                            component="create"
                            history={this.props.history}
                            prop_names={{ "create_password": "", "create_confirm_password": "" }}
                            prev_data={["create_filepath"]}
                            form_fields={["create_filepath", "create_password", "create_confirm_password"]}
                            back={() => { wizardBack(this.props.dispatch, ["create_password", "create_confirm_password"]) }} />;
                        break;
                    case 3:
                        component = <WizardReview
                            daemon={this.props.daemon}
                            key="create-wizard-review"
                            component="create"
                            history={this.props.history}
                            form_fields={["create_filepath", "create_password"]}
                            prop_names={["create_password", "create_confirm_password"]} />;
                        break;
                    default:
                        component = <Alert
                            key="create-wizard-alert"
                            variant="danger"
                            history={this.props.history}
                            dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p> Report it to the Safex wallet team :D</p>
                        </Alert>;
                        break;
                }
                break;
            case 'open':
                switch (this.props.wizard.step) {
                    case 1:
                        component = <WizardFilepath
                            daemon={this.props.daemon}
                            key="open-wizard-filepath"
                            component="open"
                            history={this.props.history}
                            prop_names={{ "open_filepath": "" }}
                            type="open"
                            options={{
                                title: this.props.t("choose_filepath"),
                                filters: [{
                                    name: 'Sails Wallet',
                                    extensions: ['sails']
                                }]
                            }}
                            back={() => { wizardBack(this.props.dispatch, ["open_filepath"], (history) => { history.push('/'); }, [this.props.history]) }} />;
                        break;
                    case 2:
                        component = <WizardPassword
                            daemon={this.props.daemon}
                            key="open-wizard-password"
                            component="open"
                            history={this.props.history}
                            prop_names={{ "open_password": "" }}
                            prev_data={["open_filepath"]}
                            form_fields={["open_filepath", "open_password"]}
                            back={() => { wizardBack(this.props.dispatch, ["open_password"]) }} />;
                        break;
                    default:
                        component = <Alert
                            key="open-wizard-alert"
                            variant="danger"
                            history={this.props.history}
                            dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p> Report it to the Safex wallet team :D</p>
                        </Alert>;
                        break;
                }
                break;
            case 'legacy':
                switch (this.props.wizard.step) {
                    case 1:
                        component = <WizardFilepath
                            daemon={this.props.daemon}
                            key="legacy-wizard-filepath-open"
                            legacy_type={this.props.legacy_type}
                            component="legacy"
                            history={this.props.history}
                            prop_names={{ "open_filepath": "" }}
                            type="open"
                            options={{
                                title: this.props.t("choose_filepath"),
                                filters: [{
                                    name: 'V7 Wallet',
                                    extensions: ['dat']
                                }]
                            }}
                            back={() => { wizardBack(this.props.dispatch, ["open_filepath"], (history) => { history.push('/'); }, [this.props.history]) }} />;
                        break;
                    case 2:
                        component = <WizardPassword
                            daemon={this.props.daemon}
                            key="legacy-wizard-password"
                            component="legacy"
                            history={this.props.history}
                            prop_names={{ "open_password": "" }}
                            prev_data={["open_filepath"]}
                            form_fields={["open_filepath", "open_password"]}
                            back={() => { wizardBack(this.props.dispatch, ["open_password"]) }} />;
                        break;
                    case 3:
                        component = <WizardLegacy
                            daemon={this.props.daemon}
                            key="legacy-wizard-legacy"
                            component="legacy"
                            history={this.props.history}
                            back={() => { wizardBack(this.props.dispatch, [], (dispatch) => { initLegacyWallet(dispatch); }, [this.props.dispatch]) }} />;
                        break;
                    case 4:
                        component = <WizardFilepath
                            daemon={this.props.daemon}
                            key="legacy-wizard-filepath-create"
                            legacy_type={this.props.legacy_type}
                            component="legacy"
                            history={this.props.history}
                            prop_names={{ "create_filepath": "" }}
                            type="create"
                            options={{
                                title: this.props.t("choose_filepath"),
                                filters: [{
                                    name: 'Sails Wallet',
                                    extensions: ['sails']
                                }]
                            }}
                            back={() => { wizardBack(this.props.dispatch, ["create_filepath"]) }} />;
                        break;
                    case 5:
                        component = <WizardConfirmPassword
                            daemon={this.props.daemon}
                            key="legacy-wizard-confirm-password"
                            component="legacy"
                            history={this.props.history}
                            prop_names={{ "create_password": "", "create_confirm_password": "" }}
                            prev_data={["create_filepath"]}
                            form_fields={["create_filepath", "create_password", "create_confirm_password"]}
                            back={() => { wizardBack(this.props.dispatch, ["create_password", "create_confirm_password"]) }} />;
                        break;
                    case 6:
                        component = <WizardReview
                            daemon={this.props.daemon}
                            key="legacy-wizard-review"
                            component="legacy"
                            history={this.props.history}
                            form_fields={["create_filepath", "create_password"]}
                            prop_names={["create_password", "create_confirm_password"]} />;
                        break;
                    default:
                        component = <Alert
                            key="legacy-wizard-aler"
                            variant="danger"
                            history={this.props.history}
                            dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p> Report it to the Safex wallet team :D</p>
                        </Alert>;
                        break;
                }
                break;
            default:
                break;
        }

        return (
            <Container>
                {component}
            </Container>
        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(Wizard));