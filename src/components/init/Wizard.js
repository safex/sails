import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { initWizardState } from '../../modules/init.module';
import {  WizardData, WizardFilepath, WizardConfirmPassword, WizardPassword, WizardReview} from './index';
import { Container, Alert} from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    restore_wizard: state.restore_wizard
  };
};

class Wizard extends Component {
    constructor(props){
        super(props);
    }

  componentWillMount() {
      //component value create/legacy/open/restore
    initWizardState(this.props.dispatch, this.props.component);
  }

  render() {
    var component;
    switch(this.props.component){
        case 'restore':
            switch(this.props.restore_wizard.step){
                case 1:
                    component = <WizardData component="restore" history={this.props.history} prop_names={{"restore_type":"mnemonic", "restore_mnemonic":"", "restore_address":"", "restore_view":"", "restore_spend":""}} back={[]}/>;
                    break;
                case 2:
                    component = <WizardFilepath component="restore" history={this.props.history} prop_names={["create_filepath"]} type="create" />;
                    break;
                case 3:
                    component=<WizardConfirmPassword component="restore" history={this.props.history} prop_name={["create_password", "create_confirm_password"]}/>;
                    break;
                case 4:
                    component=<WizardReview component="restore" history={this.props.history} prop_name={["create_password", "create_confirm_password"]}/>;
                    break;
                default:
                    component =<Alert variant="danger" history={this.props.history} onClose={() => {}} dismissible> <Alert.Heading>Oh snap! You got an error!</Alert.Heading><p> Report it to the Safex wallet team :D</p></Alert>;
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