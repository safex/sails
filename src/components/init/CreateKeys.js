import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { createWizardNext } from '../../modules/init.module';

const mapStateToProps = (state) => {
    return {
        create_wizard: state.create_wizard,
        active_account:state.active_account
    };
};



class CreateKeys extends Component {


    render() {
        return (
            <div>
                <label>{this.props.t("create.form.file_location")}</label>
                <p>{this.props.create_wizard.data.hasOwnProperty("filepath") ? this.props.create_wizard.data.filepath : ""}</p>
                <label>{this.props.t("create.form.wallet_name_label")} </label>
                <p>{this.props.create_wizard.data.hasOwnProperty("wallet_name") ? this.props.create_wizard.data.wallet_name : ""}</p>
                <label>{this.props.t("create.form.public_address")}</label>
                <p>{this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("account")?this.props.active_account.account.address:''): ""}</p>
                <label>{this.props.t("create.form.mnemonic")}</label>
                <p>{this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("account")?this.props.active_account.account.mnemonic:'') : ""}</p>
                <button onClick={() => { createWizardNext(this.props.dispatch,(history)=>{history.push('/w/home');},[this.props.history]) }}>{this.props.t('next_button')}</button>
            </div>);
    }
}
export default withTranslation('init')(connect(mapStateToProps)(CreateKeys));