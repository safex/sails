import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Modal, Table, Button, Container, Card } from 'react-bootstrap';
import { addWizardData, wizardNext } from '../../modules/init.module';

const mapStateToProps = (state) => {
    return {
        wizard: state.wizard,
        legacy_wallet: state.legacy_wallet,
        legacy_accounts: state.legacy_accounts
    };
};

class LegacyBTCCard extends Component {
    render() {

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.account.label}</Card.Title>
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.t("address")}</td>
                                <td>{this.props.account.public_key}</td>
                            </tr>
                            <tr>
                                <td>{this.props.t("private_key")}</td>
                                <td>{this.props.account.private_key}</td>
                            </tr>
                            <tr>
                                <td>{this.props.t("balance")}</td>
                                <td>{this.props.t("pending_balance")}</td>
                            </tr>
                            <tr>
                                <td>{this.props.account.safex_bal}</td>
                                <td>{this.props.account.pending_safex_bal}</td>
                            </tr>
                            <tr>
                                <td>{this.props.t("btc_balance")}</td>
                                <td>{this.props.t("pending_btc_balance")}</td>
                            </tr>
                            <tr>
                                <td>{parseFloat(this.props.account.btc_bal*1.0/100000000).toFixed(8)}</td>
                                <td>{parseFloat(this.props.account.pending_btc_bal*1.0/100000000).toFixed(8)}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Card.Body>

            </Card>);
    }


}
class LegacySAFEXCard extends Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.account.public_addr}</Card.Title>

                    <Table>
                        <thead>
                            <tr>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.t("private_view")}</td>
                                <td>{this.props.account.view.sec}</td>
                            </tr>
                            <tr>
                                <td>{this.props.t("private_spend")}</td>
                                <td>{this.props.account.spend.sec}</td>
                            </tr>
                            <tr>
                                <td>{this.props.t("public_view")}</td>
                                <td>{this.props.account.view.pub}</td>
                            </tr>
                            <tr>
                                <td>{this.props.t("public_spend")}</td>
                                <td>{this.props.account.spend.pub}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Card.Body>

            </Card>);
    }


}

class WizardLegacy extends Component {
    render() {
        let btc_card = this.props.legacy_accounts ? Object.values(this.props.legacy_accounts).map((x, i) => { return <LegacyBTCCard key={`legacy-btc-${i}-${x.btc_bal}-${x.pending_btc_bal}-${x.safex_bal}-${x.pending_safex_bal}`} account={x} t={this.props.t} /> }) : [];
        let safex_card = this.props.accounts ? Object.values(this.props.accounts).map((x, i) => { if (x) { return <LegacySAFEXCard key={`legacy-safex-${i}`} account={x} t={this.props.t} /> } else return null; }) : [];
        let btc_bal = Object.values(this.props.legacy_accounts) !== [] ? Object.values(this.props.legacy_accounts).reduce((s, x) => { return s + Number(x.btc_bal ? x.btc_bal : 0); }, 0) : 0;
        let safex_bal = Object.values(this.props.legacy_accounts) !== [] ? Object.values(this.props.legacy_accounts).reduce((s, x) => { return s + Number(x.safex_bal ? x.safex_bal : 0); }, 0) : 0;
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
                                    <td>{this.props.legacy_wallet.hasOwnProperty('keys') ? this.props.legacy_wallet.keys.length : 0}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("bitcoins_on_all_wallets")} </td>
                                    <td>{(parseFloat(btc_bal) / 100000000).toFixed(8)} BTC</td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("safe_exchange_coins_total")}</td>
                                    <td>{safex_bal} SAFEX ({this.props.t("unmigrated")})</td>
                                </tr>
                                <tr>
                                    <td>{this.props.t("safex_key_sets")}</td>
                                    <td>{this.props.legacy_wallet.hasOwnProperty('safex_keys') ? this.props.legacy_wallet.safex_keys.length : 0}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
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

                                            {btc_card}

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2>{this.props.t("safex_key_sets")}</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {safex_card}
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