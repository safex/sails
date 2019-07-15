import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addCreateWizardData, createWizardBack, createWizardNext, removeCreateWizardData , create} from '../../modules/init.module';

const mapStateToProps = (state) => {
    return {
        create_wizard: state.create_wizard
    };
};



class CreatePassword extends Component {

    render() {

        let file_location = this.props.create_wizard.data.hasOwnProperty("filepath") ? this.props.create_wizard.data.filepath : "";
        let wallet_name = this.props.create_wizard.data.hasOwnProperty("wallet_name") ? this.props.create_wizard.data.wallet_name : "";
        return (
        <div>
            <label>{this.props.t("create.form.file_location")}</label>
            <p>{file_location}</p>
            <label>{this.props.t("create.form.wallet_name_label")} </label>
            <p>{wallet_name}</p>
            <label>{this.props.t("create.form.password")}</label>
            <input value={this.props.create_wizard.data.hasOwnProperty('password') ? this.props.create_wizard.data.password : ''} type="password" id="create_password" onChange={(event) => { addCreateWizardData(this.props.dispatch, { password: event.target.value }) }} placeholder={this.props.t("create.form.password")} />
            <label>{this.props.t("create.form.repeat_password")}</label>
            <input value={this.props.create_wizard.data.hasOwnProperty('repeat_password') ? this.props.create_wizard.data.repeat_password : ''} type="password" id="create_password_repeat" onChange={(event) => { addCreateWizardData(this.props.dispatch, { repeat_password: event.target.value }) }} placeholder={this.props.t("create.form.repeat_password")} />
            <button onClick={() => { createWizardBack(this.props.dispatch, ['password', 'repeat_password']) }}>{this.props.t('back_button')}</button>
            <button onClick={() => { createWizardNext(this.props.dispatch, create, [ this.props.dispatch, this.props.create_wizard.data]) }}>{this.props.t('next_button')}</button>
        </div>
        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(CreatePassword));