import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Modal, Table, Button, Container } from 'react-bootstrap';
import { addWizardData, wizardNext } from '../../modules/init.module';

const mapStateToProps = (state) => {
    return {
        wizard: state.wizard,
        legacy_wallet: state.legacy_wallet
    };
};

class WizardLegacy extends Component {
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <h1>{this.props.t("legacy_detected_title")}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th colSpan="2">{this.props.t("detected")} :</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.t("btc_key_sets")}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("bitcoins_on_all_wallets")} </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("safe_exchange_coins_total")}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("safex_key_sets")}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("safex_tokens")} </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("safex_cash")}</td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={() => { addWizardData(this.props.dispatch, { keys_modal: true }) }}>{this.props.t("view_keys_balance")} </Button>
                        <Modal centered size="lg" show={this.props.wizard.data.keys_modal} onHide={() => { addWizardData(this.props.dispatch, { keys_modal: false }) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.props.t("keys_and_balances")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h2>{this.props.t("btc_key_sets")}</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.props.legacy_wallet.hasOwnProperty('keys') ? JSON.stringify(this.props.legacy_wallet.keys) : "None"}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2>{this.props.t("safex_key_sets")}</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.props.legacy_wallet.hasOwnProperty('safex_keys') ? JSON.stringify(this.props.legacy_wallet.safex_keys) : "None"}
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={(event) => { addWizardData(this.props.dispatch, { keys_modal: false }) }}>  {this.props.t("close_button")} </Button>

                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="danger" type="button" onClick={this.props.back}>{this.props.t('back_button')}</Button>
                    </Col>
                    <Col>
                        <Button variant="primary" type="button" onClick={() => { wizardNext(this.props.dispatch) }} >{this.props.t('next_button')}</Button>
                    </Col>
                </Row>
            </>
        );
    }
}
export default withTranslation('init')(connect(mapStateToProps)(WizardLegacy));