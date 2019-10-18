import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Tab, Nav, OverlayTrigger, Tooltip, ButtonToolbar, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPenAlt } from '@fortawesome/free-solid-svg-icons';

import { getAccounts } from '../../modules/home.module';
import { changeLabel, resetModalLabelStates, inputOnChange, resetModalDeleteStates, deleteAccount } from '../../modules/settings.module';

class AccountInfoCard extends Component {
  render() {
    return (
      <Row>
        <Col xs={12} md={10}>
          {this.props.label}
        </Col>
        <Col xs={6} md={1}>
          <OverlayTrigger
            key="edit"
            placement="left"
            overlay={<Tooltip id="tooltip-edit"> {this.props.edit_label} </Tooltip>}
          >
            <FontAwesomeIcon icon={faPenAlt} style={{ cursor: "pointer" }} onClick={() => { this.props.edit_function(this.props.account_name, this.props.label) }} />
          </OverlayTrigger>
        </Col>

        <Col xs={6} md={1}>
          {this.props.can_delete ? <OverlayTrigger
            key="delete"
            placement="left"
            overlay={<Tooltip id="tooltip-delete"> {this.props.delete_label} </Tooltip>}
          >
            <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} onClick={() => { this.props.delete_function(this.props.account_name, this.props.label) }} />
          </OverlayTrigger> : ""}
        </Col>
      </Row>
    );
  }
}

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { modal_label: false, modal_delete: false, current_label_value: "", new_label_value: "", account_name: "" };
    this.setModalLabelState = this.setModalLabelState.bind(this);
    this.setModalDeleteState = this.setModalDeleteState.bind(this);
  }

  componentDidMount() {
    getAccounts(this.props.dispatch, true);
  }

  setModalLabelState(account_name, current_label) {
    this.setState({ current_label_value: current_label, account_name: account_name, modal_label: true });
  }
  setModalDeleteState(account_name, label) {
    this.setState({ account_name: account_name, modal_delete: true, current_label_value: label });
  }

  render() {
    let labels = this.props.account_labels || {};
    let active_name = this.props.active_account.hasOwnProperty("account_name") ? this.props.active_account.account_name : "primary";
    let manage_accounts = null;
    if (this.props.accounts) {
      manage_accounts = Object.values(this.props.accounts).map((x, i) => {
        console.log("ACCOUNT");
        console.log(x);
        let label = x.label || x.account_name;
        let can_delete = (x.account_name !== "primary") && (x.account_name !== active_name) ? true : false;
        return <AccountInfoCard
          key={`account-info-${i}-${label}`}
          label={label}
          can_delete={can_delete}
          account_name={x.account_name}
          edit_function={this.setModalLabelState}
          delete_function={this.setModalDeleteState}
          edit_label={this.props.t("edit")}
          delete_label={this.props.t("delete")} />


      });
    }
    return (
      <>
        <Row style={{ position: "relative", top: "15px" }}>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="export">
              <Row>
                <Col sm={3} xs={12}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="export">{this.props.t("export")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="enable">{this.props.t("enable")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="manage_accounts">{this.props.t("manage_accounts")}</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9} xs={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="export">
                      WIP
                  </Tab.Pane>
                    <Tab.Pane eventKey="enable">
                      WIP
                  </Tab.Pane>
                    <Tab.Pane eventKey="manage_accounts">
                      {manage_accounts}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal
              size="lg"
              show={this.state.modal_label}
              onHide={resetModalLabelStates.bind(this)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  {this.props.t("change_label")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col xs={12} md={6}>{this.props.t("current_label")}</Col>
                  <Col xs={12} md={6} id="current_label_value">{this.state.current_label_value}</Col>
                </Row>
                <br />
                <Form noValidate>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        type="text"
                        id="new_label_value"
                        value={this.state.new_label_value}
                        placeholder={this.props.t("new_label")}
                        onChange={inputOnChange.bind(this)}
                      />
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Col>
                      <ButtonToolbar className="justify-content-end">
                        <Button variant="success" type="button" onClick={changeLabel.bind(this)}>
                          {this.props.t("submit")}
                        </Button> &nbsp;
                            <Button variant="danger" type="button" onClick={resetModalLabelStates.bind(this)}>
                          {this.props.t("reset")}
                        </Button>
                      </ButtonToolbar>
                    </Col>
                  </Form.Row>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal
              size="lg"
              show={this.state.modal_delete}
              onHide={resetModalDeleteStates.bind(this)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  {this.props.t("delete_account")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col xs={12}>{this.props.t("r_u_sure")}</Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <ButtonToolbar className="justify-content-end">
                      <Button variant="success" type="button" onClick={deleteAccount.bind(this)}>
                        {this.props.t("yes")}
                      </Button> &nbsp;
                            <Button variant="danger" type="button" onClick={resetModalDeleteStates.bind(this)}>
                        {this.props.t("no")}
                      </Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    active_account: state.active_account,
    account_labels: state.account_labels
  }
}
export default withTranslation('settings')(connect(mapStateToProps)(Settings));