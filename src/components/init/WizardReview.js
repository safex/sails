import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { wizardNext, addWizardData, makePDF } from '../../modules/init.module';

import { Row, Col, Card, Button } from 'react-bootstrap';


const mapStateToProps = (state) => {
    return {
        wizard: state.wizard,
        active_account: state.active_account,
        error: state.error
    };
};



class WizardReview extends Component {


    render() {
        console.log(this.props.active_account);
        return (
            <>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                {this.props.t(this.props.form_fields[0])}
                            </Col>
                            <Col>
                                {this.props.wizard.data[this.props.form_fields[0]]}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                {this.props.t(this.props.form_fields[1])}
                            </Col>
                            <Col>
                                {(this.props.wizard.data.hasOwnProperty('password_visible') && this.props.wizard.data.password_visible) ? this.props.wizard.data[this.props.form_fields[1]] : "*".repeat(this.props.wizard.data[this.props.form_fields[1]].length)}
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={() => {
                                    let val = (this.props.wizard.data.hasOwnProperty('password_visible') ? !this.props.wizard.data.password_visible : true);
                                    addWizardData(this.props.dispatch, { password_visible: val });
                                }}>{(this.props.wizard.data.hasOwnProperty('password_visible') && this.props.wizard.data.password_visible) ? this.props.t('hide_pwd_button') : this.props.t('view_pwd_button')}</Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Card bg="info" text="white" >
                                    <Card.Header>{this.props.t("address")}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("address") ? this.props.active_account.address : '') : ""}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Card bg="info" text="white" >
                                    <Card.Header>{this.props.t("mnemonic")}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("mnemonic") ? this.props.active_account.mnemonic : '') : ""}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={() => { makePDF.bind(this)(); }} >{this.props.t('print_backup_button')}</Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={() => { wizardNext(this.props.dispatch, (history) => { history.push('/w/home'); }, [this.props.history]) }} >{this.props.t('next_button')}</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
export default withTranslation('init')(connect(mapStateToProps)(WizardReview));