import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getBalance, getContactsFromWallet } from '../../modules/sft.module';
import { Row, Col, Form, Modal, Button, Table } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    contacts: state.contacts
  };
};

const TableCell = function (props) {
  return <tr> <td>{props.address} ({props.label}) </td> <td><Button key={`add_button_${props.id}`} onClick={props.click}> {props.add} </Button></td> </tr>
}
class SFT extends Component {
  constructor(props) {
    super(props);
    this.state = { sft_modal: false, contacts_modal: false, address: '', amount: 0, pid: '', note: '', balance_locked: 0.0000000000, balance_unocked: 0.0000000000, ring_size: 1, fee: 0.0000000000, sfx_unlocked: "0.0000000000" };
    this.initialState = this.state;
  }
  componentDidMount() {
    if (this.props.match.params.address !== undefined) {
      this.setState({ address: this.props.match.params.address });
    }
    if (this.props.active_account.type !== 1) {
      getBalance.bind(this)();
      getContactsFromWallet.bind(this)();
    }

  }
  render() {
    if (this.props.active_account.type == 1) {
      return (
        <Row>
          <Col>
            <Modal.Dialog>
              <Modal.Header closeButton onClick={() => { this.props.history.push('/w/home') }}>
                <Modal.Title>{this.props.t("sorry")}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>{this.props.t("cant_access")}</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => { this.props.history.push('/w/home') }}>{this.props.t("button_close")}  </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Col>
        </Row>
      );

    }
    else {
      return (
        <>
          <Row>
            <Col>
              <h3>{this.props.t("balance_unlocked")} : {this.state.balance_unlocked} SFT</h3>
            </Col>
            <Col>
              <h3>{this.props.t("balance_locked")} : {this.state.balance_locked} SFT</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="sft_amount">
                    <Form.Label>{this.props.t("amount")}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={this.props.t("amount")}
                      step="1"
                      min="0"
                      value={this.state.amount}
                      onChange={(e) => { this.setState({ amount: parseFloat(e.target.value).toFixed(0) }) }}

                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="sft_payment_id">
                    <Form.Label>{this.props.t("pid")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={this.props.t("pid")}
                      value={this.state.pid}
                      onChange={(e) => { this.setState({ pid: e.target.value }) }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="sft_address">
                    <Form.Label>{this.props.t("address")} </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={this.props.t("address")}
                      value={this.state.address}
                      onChange={(e) => { this.setState({ address: e.target.value }) }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="sft_ring_size">
                    <Form.Label>{this.props.t("adjust")}</Form.Label>
                    <Form.Control
                      type="number"
                      value={this.state.ring_size}
                      onChange={(e) => { this.setState({ ring_size: e.target.value }) }}
                      min="1"
                      max="7"
                    />
                  </Form.Group>
                </Form.Row>
                <Row>
                  <Col>
                    <Button variant="link" type="button" onClick={(e) => { this.setState({ contacts_modal: true }) }}> {this.props.t('contacts')} </Button>
                  </Col>
                </Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="sft_note">
                    <Form.Label>{this.props.t("note")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={this.props.t("note")}
                      value={this.state.note}
                      onChange={(e) => { this.setState({ note: e.target.value }) }}
                    />
                  </Form.Group>
                </Form.Row>
                <Row>
                  <Col>
                    <p>{this.props.t("sfx_fee")}</p>
                    <p>{this.state.sfx_unlocked}</p>
                  </Col>
                  <Col>
                    <Button variant="primary" type="button" onClick={(e) => { this.setState({ sft_modal: true }) }}>
                      {this.props.t("send")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Modal show={this.state.sft_modal} onHide={() => { this.setState({ sft_modal: false }) }}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.props.t("confirm_transaction")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.t("transaction_info")}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={(e) => { this.setState({ sft_modal: false }) }}>
                    {this.props.t("button_close")}
                  </Button>
                  <Button variant="primary" onClick={() => { this.setState(this.initialState) }}>
                    {this.props.t("button_confirm")}
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col>
              <Modal show={this.state.contacts_modal} onHide={() => { this.setState({ contacts_modal: false }) }} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.props.t('contacts')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>{this.props.t("address")} ({this.props.t("label")})</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(this.props.contacts.contacts)
                        .map((x) => {
                          return <TableCell key={`table_cell_${x.id}`} address={x.address} label={x.label} add={this.props.t("button_add")} id={x.id} click={(e) => { this.setState({ address: x.address, contacts_modal: false }) }} />;
                        }
                        )}
                    </tbody>

                  </Table>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="secondary" onClick={(e) => { this.setState({ contacts_modal: false }) }}>
                    {this.props.t("button_close")}
                  </Button>


                </Modal.Footer>
              </Modal>
            </Col>
          </Row>

        </>
      );
    }

  }
}
export default withTranslation('sft')(connect(mapStateToProps)(SFT));