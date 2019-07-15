import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {initLegacyWizardState} from '../../modules/init.module';
import {LegacyLogin, LegacyCreate} from './index';

const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    legacy_wizard:state.legacy_wizard
  };
};

class LegacyWizard extends Component {
   
    componentDidMount(){
        initLegacyWizardState(this.props.dispatch);
    }

    render() {
        return   <div>
            <div>{ this.props.legacy_wizard.step ==1 ? <LegacyLogin type={this.props.match.params.type} history={this.props.history} />:""}</div>
            <div>{ this.props.legacy_wizard.step ==2 ? <LegacyCreate history={this.props.history} />:""}</div>
        </div>;
        
    }
}
export default  withTranslation('init')(connect(mapStateToProps)(LegacyWizard));