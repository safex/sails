import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { chooseCreateFilepath, addCreateWizardData, createWizardBack, createWizardNext } from '../../modules/init.module';

const mapStateToProps = (state) => {
    return {
        create_wizard: state.create_wizard
    };
};



class CreateFilepath extends Component {


    render() {
        let options = {
            title: this.props.t("create.form.choose_filepath")
        };
        let file_location = this.props.create_wizard.data.hasOwnProperty("filepath") ? this.props.create_wizard.data.filepath : "";
        return (
            <div>
                <label>{this.props.t("create.form.choose_filepath")}</label>
                <button onClick={() => { chooseCreateFilepath(this.props.dispatch, options, "default") }}>{this.props.t("browse_button")}</button>
                <p>{file_location}</p>
                <input value={this.props.create_wizard.data.hasOwnProperty('wallet_name') ? this.props.create_wizard.data.wallet_name : ''} type="text" id="create_name" onChange={(event) => { addCreateWizardData(this.props.dispatch, { wallet_name: event.target.value }) }} placeholder={this.props.t("create.form.wallet_name")} />
                <button onClick={() => { createWizardBack(this.props.dispatch, ['filepath', 'wallet_name'], (history) => { history.push('/'); }, [this.props.history]) }}>{this.props.t('back_button')}</button>
                <button onClick={() => { createWizardNext(this.props.dispatch) }}>{this.props.t('next_button')}</button>
            </div>);
    }
}
export default withTranslation('init')(connect(mapStateToProps)(CreateFilepath));