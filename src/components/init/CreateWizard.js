import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {initCreateWizardState} from '../../modules/init.module';
import {CreateFilepath, CreatePassword, CreateKeys} from './index';

const mapStateToProps = (state) => {
    return {
      wallet_exists: state.wallet_exists,
      create_wizard:state.create_wizard
    };
  };


class CreateWizard extends Component {
  
    componentDidMount(){
        initCreateWizardState(this.props.dispatch);
    }

    render() {
        return   <div>
            <div>{ this.props.create_wizard.step ==1 ? <CreateFilepath history={this.props.history} />:""}</div>
            <div>{ this.props.create_wizard.step ==2 ? <CreatePassword history={this.props.history} />:""}</div>
            <div>{ this.props.create_wizard.step ==3 ? <CreateKeys history={this.props.history} />:""}</div>
        </div>;
        
    }
}
export default  withTranslation('init')(connect(mapStateToProps)(CreateWizard));