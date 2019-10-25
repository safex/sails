import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, ButtonGroup, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  getLegacyAccounts,
  enableEditLabelModal,
  enableAddAccountModal,
  enableShowPrivateModal,
  enableHistoryModal,
  enableReceiveModal,
  enableSendModal,
  copyAddressToClipboard,
  toArchive,
  handleChange,
  getBalances,
  calculateFee,
  changeBTCDollar,
  getBTCDollarValue,
  calculateAll,
  generateTransactions,
  getSAFEXDollarValue
} from '../../modules/bitcoin.module';
import { addActiveTab } from '../../actions/active_tab.action';
import QRCode from 'qrcode.react';

class LegacyCard extends Component {

  componentDidMount() {
    getBalances(this.props.dispatch, this.props.account);

  }
  render() {

    return (
      <Row style={{ height: "200px", minHeight: "200px" }}>
        <Col>
          <Card >
            <Card.Header>
              <OverlayTrigger
                key="edit-label"
                placement="right"
                overlay={<Tooltip id="tooltip-edit-label"> {this.props.t("edit_label")} </Tooltip>}
              >
                <FontAwesomeIcon icon={faPencilAlt} style={{ cursor: "pointer" }} onClick={() => { this.props.enableEditLabelModal(this.props.account) }} />
              </OverlayTrigger> &nbsp;
                    {this.props.account.label}</Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} md={2}>
                  <Button variant="outline-primary" size="sm" block onClick={() => { copyAddressToClipboard(this.props.account.address) }}>{this.props.t("copy_button").toUpperCase()}</Button>
                </Col>
                <Col xs={12} md={6} style={{ wordBreak: "break-all" }}>
                  {this.props.account.public_key}
                </Col>
                <Col xs={12} md={2}>
                  <Button variant="outline-info" size="sm" disabled={this.props.account.btc_bal !== 0 ? false : true} block onClick={() => { this.props.enableSendModal(this.props.account) }}> <FontAwesomeIcon icon={faUpload} /> &nbsp; {this.props.t("send_button").toUpperCase()}</Button>
                </Col>
                <Col xs={12} md={2}>
                  <Button variant="outline-success" size="sm" block onClick={() => { this.props.enableReceiveModal(this.props.account.address) }}> <FontAwesomeIcon icon={faDownload} /> &nbsp; {this.props.t("receive_button").toUpperCase()}</Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={2}>
                  <p className="text-left text-primary">{this.props.account.pending_btc_bal !== 0 ? `${parseFloat(this.props.pending_btc_bal * 1.0 / 100000000).toFixed(8)} pending` : ""} &nbsp; &nbsp; {this.props.account.pending_safex_bal !== 0 ? `${this.props.pending_safex_bal} pending` : ""}</p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} md={6}>
                  <ButtonGroup size="sm">
                    {/* <Button onClick={() => { this.props.toArchive(this.props.account.account_name) }}>{this.props.t("archive_button").toUpperCase()}</Button> */}
                    <Button onClick={() => { this.props.enableHistoryModal(this.props.account.address) }}>{this.props.t("history_button").toUpperCase()}</Button>
                    <Button onClick={() => { this.props.enableShowPrivateModal(this.props.account.private_key) }}>{this.props.t("show_private_button").toUpperCase()}</Button>
                  </ButtonGroup>
                </Col>
                <Col xs={12} md={6} >
                  <p className="align-middle text-info bg-light w-100">
                    <span className="ml-3">{this.props.account.safex_bal}</span><span className="ml-1 ml-1">SAFEX</span> <span className="ml-0 mr-3">${parseFloat(parseFloat(this.props.account.safex_bal) * this.props.safex_value).toFixed(2)}</span>
                    <span className="ml-3">{this.props.account.btc_bal !== 0 ? parseFloat(this.props.account.btc_bal * 1.0 / 100000000).toFixed(8) : parseFloat(0).toFixed(8)}</span><span className="ml-1 ml-1">BITCOIN</span> <span className="ml-0 mr-3">${parseFloat(parseFloat(this.props.account.btc_bal / 100000000) * this.props.btc_value).toFixed(2)}</span>
                  </p>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>

      </Row>
    );
  }


}

class Bitcoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_show: false,
      modal_props: {},
      modal_heading: "",
      modal_content: "",
      modal_footer: "",
      modal_key: "modal",
      account: null,
      new_label: "",
      address: '',
      amount: '0.00000546',
      dollar_amount: "0.00",
      fee: 0.00000500,
      dollar_fee: 0.00000000,
      btc_dollar: true,
      txs: null,
      history: []
    };
    this.initialState = this.state;



  }

  componentDidMount() {

    getLegacyAccounts(this.props.dispatch);
    calculateFee.bind(this)();
    getBTCDollarValue.bind(this)(true);
    getSAFEXDollarValue.bind(this)(true);
    this.props.dispatch(addActiveTab("bitcoin"));
  }

  render() {
    let legacy_accounts = null;
    if (this.props.legacy_accounts) {
      legacy_accounts = Object.values(this.props.legacy_accounts).map(
        (x, i) => {
          if (x && !x.archived)
            return <LegacyCard
              key={`legacy-${x.account_name}-${x.label}`}
              t={this.props.t}
              dispatch={this.props.dispatch}
              account={x}
              enableEditLabelModal={enableEditLabelModal.bind(this)}
              enableShowPrivateModal={enableShowPrivateModal.bind(this)}
              enableHistoryModal={enableHistoryModal.bind(this)}
              enableReceiveModal={enableReceiveModal.bind(this)}
              enableSendModal={enableSendModal.bind(this)}
              toArchive={toArchive.bind(this)}
              btc_value={this.state.btc_value}
              safex_value={this.state.safex_value}
            />;
        });
    }
    return (
      <div >
        <Row className="justify-content-end" style={{ margin: "4px" }}>
          <Col xs={12} md={3}>
            <Button variant="info" onClick={enableAddAccountModal.bind(this)} block>{this.props.t("add_account").toUpperCase()}</Button>
          </Col>
        </Row>
        <Row style={{ maxHeight: "330px", height: "330px", overflowY: "auto" }}>
          <Col xs={12} md={12}>
            {legacy_accounts}
          </Col>
        </Row>
        <Modal
          show={this.state.modal_show}
          onHide={this.state.modal_close}
          aria-labelledby="modal-static"
          {...this.state.modal_props}


        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-static">
              {this.state.modal_heading || ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modal_content}
          </Modal.Body>
          <Modal.Footer>
            {this.state.modal_footer}
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modal_receive}
          onHide={this.state.modal_close}
          aria-labelledby="modal-receive"
          {...this.state.modal_props}


        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-receive">
              {this.state.modal_heading || ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={8}>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="address">
                      <Form.Label>{this.props.t("address")}</Form.Label>
                      <Form.Control readOnly type="text" name="address" value={this.state.address} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="amount">
                      <Form.Label>{this.props.t("amount")}</Form.Label>
                      <Form.Control
                        type="number"
                        min="0.00000546"
                        value={this.state.amount}
                        name="amount"
                        data-amount="receive"
                        onChange={handleChange.bind(this)}
                      />
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Col>
              <Col xs={12} md={4} >
                <QRCode value={"bitcoin:" + this.state.address + "?amount=" + this.state.amount} key={`QR-${this.state.address}-${this.state.amount}`} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {this.state.modal_footer}
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modal_send}
          onHide={this.state.modal_close}
          aria-labelledby="modal-send"
          {...this.state.modal_props}
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-send">
              {this.state.modal_heading || ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="from">
                <Form.Label column xs={2}>{this.props.t("from")}</Form.Label>
                <Col xs={10}>
                  <Form.Control readOnly type="text" value={this.state.account ? this.state.account.address : ""} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="to">
                <Form.Label column xs={2}>{this.props.t("to")}</Form.Label>
                <Col xs={10}>
                  <Form.Control type="text" placeholder={this.props.t("address_only")} onChange={(e) => { handleChange.bind(this)(e); calculateFee.bind(this)(); }} name="address" />
                </Col>
              </Form.Group>
              {this.state.btc_dollar ?
                <Form.Group as={Row} controlId="amount">
                  <Form.Label column xs={2}>{this.props.t("amount")} (<span id="amount_currency">BTC</span>)</Form.Label>
                  <Col xs={10}>
                    <Form.Control type="text" name="amount" min="0.00000546" value={this.state.amount} onChange={(e) => { handleChange.bind(this)(e); calculateFee.bind(this)(); }} />
                  </Col>
                </Form.Group>
                :
                <Form.Group as={Row} controlId="dollar_amount">
                  <Form.Label column xs={2}>{this.props.t("amount")} (<span id="amount_currency">$</span>)</Form.Label>
                  <Col xs={10}>
                    <Form.Control type="text" name="dollar_amount" value={this.state.dollar_amount} onChange={(e) => { handleChange.bind(this)(e); calculateFee.bind(this)(); }} />
                  </Col>
                </Form.Group>
              }
              <Form.Group as={Row} controlId="fee">
                <Form.Label column xs={2}>{this.props.t("fee")} (<span id="fee_currency">BTC</span>)</Form.Label>
                <Col xs={6}>
                  {this.state.btc_dollar ?
                    <Form.Control type="text" name="fee" onChange={handleChange.bind(this)} value={this.state.fee} />
                    :
                    <Form.Control type="text" name="dollar_fee" onChange={handleChange.bind(this)} value={this.state.dollar_fee} />
                  }
                </Col>
                <Col xs={4}>
                  <Button variant="outline-primary" onClick={() => { calculateFee.bind(this)(calculateAll) }}>{this.props.t("all").toUpperCase()}</Button>
                </Col>
              </Form.Group>
              <Row className={this.state.fee < 0.00000500 ? "font-weight-bolder text-danger visible" : "invisible"}>
                <Col xs={12}> <p>*{this.props.t("small_fee")}</p> </Col>
              </Row>
              <Form.Group as={Row} controlId="total">
                <Form.Label column xs={2}>{this.props.t("total")} (<span id="total_currency">BTC</span>)</Form.Label>
                <Col xs={6}>
                  <Form.Control type="text" readOnly value={this.state.btc_dollar ? parseFloat((this.state.amount * 100000000 + this.state.fee * 100000000) / 100000000).toFixed(8) : parseFloat((this.state.dollar_amount * 100000000 + this.state.dollar_fee * 100000000) / 100000000).toFixed(8)} name="total" />
                </Col>
                <Col xs={4}>
                  <Button id="btc_dollar" onClick={() => { changeBTCDollar.bind(this)() }}>{this.props.t("btc_to_dollar")}</Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {this.state.modal_footer}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    legacy_accounts: state.legacy_accounts
  }
}
export default withTranslation('bitcoin')(connect(mapStateToProps)(Bitcoin));