import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { initWizardState } from '../../modules/init.module';
import { LegacyLogin, LegacyCreate, LegacyReview } from './index';
import { Container } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    legacy_wizard: state.legacy_wizard
  };
};

class LegacyWizard extends Component {

  componentDidMount() {
    initWizardState(this.props.dispatch,"legacy");
  }

  render() {
    return (
      <Container>
        {this.props.legacy_wizard.step == 1 ? <LegacyLogin type={this.props.match.params.type} history={this.props.history} /> : ""}
        {this.props.legacy_wizard.step == 2 ? <LegacyCreate history={this.props.history} /> : ""}
        {this.props.legacy_wizard.step == 3 ? <LegacyReview history={this.props.history} /> : ""}
      </Container>
    );

  }
}
export default withTranslation('init')(connect(mapStateToProps)(LegacyWizard));