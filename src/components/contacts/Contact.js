import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Row, Col, Tooltip, Card, ListGroup, OverlayTrigger } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrashAlt, faCoins, faMoneyBill, faPen } from '@fortawesome/free-solid-svg-icons';
import { removeFromContacts, copyContact } from '../../modules/contacts.module';


class Contact extends Component {

  render() {

    return (
      <Row>
        <Col>
          <Card>
            <Card.Header>{this.props.contact.label}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>{this.props.contact.address}</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <OverlayTrigger
                      key="copy"
                      placement="top"
                      overlay={<Tooltip id="tooltip-copy"> {this.props.t("copy")} </Tooltip>}
                    >
                      <FontAwesomeIcon icon={faCopy} style={{ cursor: "pointer" }} onClick={() => {
                        copyContact(this.props.dispatch, { address: this.props.contact.address, label: this.props.contact.label },
                          { address: true, label: true, double: true }, { double: true })
                      }} />
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <OverlayTrigger
                      key="update"
                      placement="top"
                      overlay={<Tooltip id="tooltip-update"> {this.props.t("update")} </Tooltip>}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          copyContact(this.props.dispatch, { address: this.props.contact.address, label: this.props.contact.label, id: this.props.contact.id },
                            { address: true, label: true, double: true }, { double: true })
                        }} />
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <OverlayTrigger
                      key="send-sft"
                      placement="top"
                      overlay={<Tooltip id="tooltip-send-sft"> {this.props.t("send_sft")} </Tooltip>}
                    >
                      <FontAwesomeIcon
                        icon={faCoins}
                        style={{ cursor: "pointer" }}
                        onClick={() =>  {this.props.history.push('/w/sft/' + this.props.contact.address); }}
                      />
                    </OverlayTrigger>
                  </Col>
                  <Col >
                    <OverlayTrigger
                      key="send-sfx"
                      placement="top"
                      overlay={<Tooltip id="tooltip-send-sfx"> {this.props.t("send_sfx")} </Tooltip>}
                    >
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        style={{ cursor: "pointer" }}
                        onClick={() => { this.props.history.push('/w/sfx/' + this.props.contact.address); }}
                      />
                    </OverlayTrigger>
                  </Col>
                  <Col   >
                    <OverlayTrigger
                      key="delete"
                      placement="top"
                      overlay={<Tooltip id="tooltip-delete"> {this.props.t("delete")} </Tooltip>}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} onClick={removeFromContacts.bind(this)} />
                    </OverlayTrigger>
                  </Col>
                </Row>

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default withTranslation('contacts')(withRouter(connect()(Contact)));
