import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  getLegacyAccounts,
  enableEditLabelModal,
  enableAddAccountModal,
  enableShowPrivateModal,
  enableHistoryModal,
  copyAddressToClipboard,
  toArchive,
  getBalances
} from '../../modules/bitcoin.module';

class LegacyCard extends Component {

  componentDidMount() {
    console.log("LEGACY CARD MOUNTED");
    getBalances(this.props.dispatch, this.props.account);
  }
  render() {

    return (
      <Row style={{ height: "180px", minHeight: "180px" }}>
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
                  <Button variant="outline-info" size="sm" block> <FontAwesomeIcon icon={faUpload} /> &nbsp; {this.props.t("send_button").toUpperCase()}</Button>
                </Col>
                <Col xs={12} md={2}>
                  <Button variant="outline-success" size="sm" block> <FontAwesomeIcon icon={faDownload} /> &nbsp; {this.props.t("receive_button").toUpperCase()}</Button>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} md={6}>
                  <ButtonGroup size="sm">
                    <Button onClick={() => { this.props.toArchive(this.props.account.account_name) }}>{this.props.t("archive_button").toUpperCase()}</Button>
                    <Button onClick={() => { this.props.enableHistoryModal(this.props.account.address) }}>{this.props.t("history_button").toUpperCase()}</Button>
                    <Button onClick={() => { this.props.enableShowPrivateModal(this.props.account.private_key) }}>{this.props.t("show_private_button").toUpperCase()}</Button>
                  </ButtonGroup>
                </Col>
                <Col xs={12} md={6} >

                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>

      </Row>

      // <Card>
      //   <Card.Body>
      //     <Card.Title></Card.Title>
      //     <Table>
      //       <thead>
      //         <tr>
      //           <th colSpan="2"></th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         <tr>
      //           <td>{this.props.t("address")}</td>
      //           <td></td>
      //         </tr>
      //         <tr>
      //           <td>{this.props.t("private_key")}</td>
      //           <td>{this.props.account.private_key}</td>
      //         </tr>
      //         <tr>
      //           <td>{this.props.t("balance")}</td>
      //           <td>{this.props.t("pending_balance")}</td>
      //         </tr>
      //         <tr>
      //           <td>{this.props.account.safex_bal}</td>
      //           <td>{this.props.account.pending_safex_bal}</td>
      //         </tr>
      //         <tr>
      //           <td>{this.props.t("btc_balance")}</td>
      //           <td>{this.props.t("pending_btc_balance")}</td>
      //         </tr>
      //         <tr>
      //           <td>{parseFloat(this.props.account.btc_bal).toFixed(8)}</td>
      //           <td>{parseFloat(this.props.account.pending_btc_bal).toFixed(8)}</td>
      //         </tr>

      //       </tbody>
      //     </Table>
      //   </Card.Body>

      // </Card>
    );
  }


}

class Bitcoin extends Component {
  constructor(props) {
    super(props);
    this.state = { modal_show: false, modal_props: {}, modal_heading: "", modal_content: "", modal_footer: "", account: null, new_label: "", address: '', history: [] };
    this.initialState = this.state;



  }

  componentDidMount() {
    getLegacyAccounts(this.props.dispatch);
  }

  render() {
    let legacy_accounts = null;
    if (this.props.legacy_accounts) {
      legacy_accounts = Object.values(this.props.legacy_accounts).map(
        (x, i) => {
          if (x)
            return <LegacyCard
              key={`legacy-${x.account_name}-${x.label}`}
              t={this.props.t}
              dispatch={this.props.dispatch}
              account={x}
              enableEditLabelModal={enableEditLabelModal.bind(this)}
              enableShowPrivateModal={enableShowPrivateModal.bind(this)}
              enableHistoryModal={enableHistoryModal.bind(this)}
              toArchive={toArchive.bind(this)} />;
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
          aria-labelledby="contained-modal-title-vcenter"
          {...this.state.modal_props}
          style={{ width: "100%" }}

        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
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