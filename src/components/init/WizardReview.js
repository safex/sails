import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { wizardNext, addWizardData } from '../../modules/init.module';

import { Row, Col, Card, Button } from 'react-bootstrap';

class WizardReview extends Component {


    render() {
        if ((this.props.step !== 4) && (this.props.component === "restore")) {
            return null;
        }
        return (
            <>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                {this.props.t(this.props.form_fields[0])}
                            </Col>
                            <Col>
                                {this.props.data[this.props.form_fields[0]]}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                {this.props.t(this.props.form_fields[1])}
                            </Col>
                            <Col>
                                {(this.props.data.hasOwnProperty('password_visible') && this.props.data.password_visible) ? this.props.data[this.props.form_fields[1]] : "*".repeat(this.props.data[this.props.form_fields[1]].length)}
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
                                            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.address : '') : ""}
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
                                            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.mnemonic : '') : ""}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={() => { alert("not available") }} >{this.props.t('print_backup_button')}</Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button variant="info" onClick={() => { wizardNext(this.props.dispatch, (history) => { history.push('/w/home'); }, [this.props.history]) }} >{this.props.t('next_button')}</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        active_account: state.active_account
    };
};
export default withTranslation('init')(connect(mapStateToProps)(WizardReview));