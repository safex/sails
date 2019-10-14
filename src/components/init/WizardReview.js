import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { wizardNext, addWizardData } from '../../modules/init.module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { Row, Col, Card, Button } from 'react-bootstrap';

class WizardReview extends Component {


    render() {
        if (this.props.show_on_step === false) return null;
        if (this.props.step !== this.props.show_on_step) return null;
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
                                <FontAwesomeIcon
                                    icon={(this.props.data.hasOwnProperty('password_visible') && this.props.data.password_visible) ? faEyeSlash : faEye}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        let val = (this.props.data.hasOwnProperty('password_visible') ? !this.props.data.password_visible : true);
                                        this.props.handleChange({ target: { name: "password_visible", value: val } });
                                    }}
                                />
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
                                <Button variant="primary" onClick={() => { alert("not available") }} >{this.props.t('print_backup_button')}</Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button variant="info" onClick={this.props.next} >{this.props.t('next_button')}</Button>
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