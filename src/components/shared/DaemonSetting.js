import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { toggleDaemonModal, addDaemonData } from '../../modules/shared.module';
import { Row, Col, OverlayTrigger, Tooltip, Modal, Button, Alert, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { DAEMON_HOST, DAEMON_PORT } from '../../setups/conf';
const mapStateToProps = (state) => {
    return {
        daemon: state.daemon,
    };
};


class DaemonSetting extends Component {

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <OverlayTrigger
                            key="setting"
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-setting"> {this.props.t("setting")} </Tooltip>}
                        >
                            <FontAwesomeIcon icon={faSlidersH} style={{ cursor: "pointer" }} onClick={toggleDaemonModal.bind(this, !this.props.daemon.daemon_modal)} />
                        </OverlayTrigger>

                        <Modal centered size="lg" show={this.props.daemon.daemon_modal} onHide={toggleDaemonModal.bind(this, false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.props.t("setting")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Row>
                                        <Col>
                                            <Form.Control
                                                placeholder={this.props.t("daemon_host")}
                                                value={this.props.daemon.daemon_host}
                                                onChange={(e) => { addDaemonData.bind(this, e, 'host')() }}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder={this.props.t("daemon_port")}
                                                value={this.props.daemon.daemon_port}
                                                onChange={(e) => { addDaemonData.bind(this, e, 'port')() }}
                                            />
                                        </Col>
                                    </Form.Row>
                                    <Row>
                                        <Col> <Alert variant="light">
                                            {this.props.t("default")}: <br />
                                            {this.props.t("daemon_host")} : {DAEMON_HOST} <br/>
                                            {this.props.t("daemon_port")} : {DAEMON_PORT}
                                        </Alert>
                                        </Col>
                                    </Row>
                                </Form>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={toggleDaemonModal.bind(this, false)}>  {this.props.t("close_button")} </Button>

                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>

            </>
        );
    }
}
export default withTranslation("init")(connect(mapStateToProps)(DaemonSetting));