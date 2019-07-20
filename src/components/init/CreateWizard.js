import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {initWizardState} from '../../modules/init.module';
import {CreateFilepath, CreatePassword, CreateKeys} from './index';
import {Container} from 'react-bootstrap';
import ErrorResponse from '../shared/ErrorResponse';

const mapStateToProps = (state) => {
    return {
      wallet_exists: state.wallet_exists,
      create_wizard:state.create_wizard
      
    };
  };


class CreateWizard extends Component {
  
    componentDidMount(){
        initWizardState(this.props.dispatch,"create");
    }


   

    render() {
            return (
                <Container>
                    { this.props.create_wizard.step ==1 ? <CreateFilepath history={this.props.history} />:""}
                    { this.props.create_wizard.step ==2 ? <CreatePassword history={this.props.history} />:""}
                    { this.props.create_wizard.step ==3 ? <CreateKeys history={this.props.history} />:""}
                </Container>
               
            );
        
    }
}
export default  withTranslation('init')(connect(mapStateToProps)(CreateWizard));