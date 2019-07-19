import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { initWizardState } from '../../modules/init.module';
import { OpenFilepath, OpenPassword } from './index';
import { Container } from 'react-bootstrap'

const mapStateToProps = (state) => {
    return {
        open_wizard: state.open_wizard
    };
};


class OpenWizard extends Component {

    componentDidMount() {
        initWizardState(this.props.dispatch,"open");
    }

    render() {
        return (
            <Container>
                {this.props.open_wizard.step == 1 ? <OpenFilepath history={this.props.history} /> : ""}
                {this.props.open_wizard.step == 2 ? <OpenPassword history={this.props.history} /> : ""}
            </Container>

        );

    }
}
export default withTranslation('init')(connect(mapStateToProps)(OpenWizard));