import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Button, Dropdown, DropdownButton, Modal, Form } from 'react-bootstrap';
import Accounts from './Accounts';
import History from './History';
import { addNewAccount, changeModalState, addSeedsAccount, addKeysAccount, addFileAccount, openFile, getLegacyAccounts } from '../../modules/home.module';
import { addActiveTab } from '../../actions/active_tab.action';

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        legacy_accounts: state.legacy_accounts,
        home_modals: state.home_modals,
        account_labels: state.account_labels
    }
}
function ModalExportKeys(props) {

    return (
        <Modal show={props.show} onHide={() => { changeModalState(props.dispatch, { modal_export: false }) }} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.body_title}</h4>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="export_keys_type">
                            <Form.Label as="legend" > {props.type} </Form.Label>
                            <Col>
                                <Form.Check
                                    defaultChecked="true"
                                    type="radio"
                                    label={this.props.label_encrypted}
                                    name="export_keys_type"
                                    inline="true"
                                    id="type_encrypted"
                                    value="0"
                                    onClick={() => { console.log(document.getElementById("row_password").classList) }}
                                />
                                <Form.Check
                                    type="radio"
                                    label={this.props.label_decrypted}
                                    name="export_keys_type"
                                    inline="true"
                                    id="type_decrypted"
                                    value="1"
                                    onClick={() => { document.getElementById("row_password"); }}
                                />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row id="row_password" className="visible">
                        <Form.Group as={Col} controlId="export_keys_password">
                            <Form.Label >{props.password}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="export_keys_password">
                            <Form.Label >{props.password}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    addSeedsAccount(props.dispatch, document.getElementById("add_new_seeds").value, document.getElementById("add_seeds_label").value, props.labels);
                    document.getElementById("add_new_seeds").value = "";
                    document.getElementById("add_seeds_label").value = "";
                    changeModalState(props.dispatch, { modal_seeds: false });
                }}>{props.submit}</Button>
                <Button variant="danger" onClick={() => { changeModalState(props.dispatch, { modal_seeds: false }) }}>{props.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalSeeds(props) {

    return (
        <Modal show={props.show} onHide={() => { changeModalState(props.dispatch, { modal_seeds: false }) }} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.body_title}</h4>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_seeds_label">
                            <Form.Label >{props.label}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId={"add_new_seeds"}>
                            <Form.Control
                                as="textarea"
                                rows="3"
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    addSeedsAccount(props.dispatch, document.getElementById("add_new_seeds").value, document.getElementById("add_seeds_label").value, props.labels);
                    document.getElementById("add_new_seeds").value = "";
                    document.getElementById("add_seeds_label").value = "";
                    changeModalState(props.dispatch, { modal_seeds: false });
                }}>{props.submit}</Button>
                <Button variant="danger" onClick={() => { changeModalState(props.dispatch, { modal_seeds: false }) }}>{props.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalKeys(props) {

    return (
        <Modal show={props.show} onHide={() => { changeModalState(props.dispatch, { modal_keys: false }) }} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.body_title}</h4>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_keys_label">
                            <Form.Label >{props.label}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_keys_address">
                            <Form.Label >{props.address}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_keys_view">
                            <Form.Label >{props.spend}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="add_keys_spend">
                            <Form.Label >{props.view}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    addKeysAccount(props.dispatch,
                        document.getElementById("add_keys_address").value,
                        document.getElementById("add_keys_view").value,
                        document.getElementById("add_keys_spend").value,
                        document.getElementById("add_keys_label").value,
                        props.labels);
                    document.getElementById("add_keys_address").value = "";
                    document.getElementById("add_keys_view").value = "";
                    document.getElementById("add_keys_spend").value = "";
                    document.getElementById("add_keys_label").value = "";
                    changeModalState(props.dispatch, { modal_keys: false });
                }}>{props.submit}</Button>
                <Button variant="danger" onClick={() => { changeModalState(props.dispatch, { modal_keys: false }) }}>{props.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalNew(props) {

    return (
        <Modal show={props.show} onHide={() => { changeModalState(props.dispatch, { modal_new: false }) }} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_new_label">
                            <Form.Label >{props.label}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    addNewAccount(props.dispatch,
                        document.getElementById("add_new_label").value,
                        props.labels);
                    document.getElementById("add_new_label").value = "";
                    changeModalState(props.dispatch, { modal_new: false });
                }}>{props.submit}</Button>
                <Button variant="danger" onClick={() => { changeModalState(props.dispatch, { modal_new: false }) }}>{props.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalFile(props) {

    return (
        <Modal show={props.show} onHide={() => { changeModalState(props.dispatch, { modal_file: false }) }} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.body_title}</h4>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_new_label">
                            <Form.Label >{props.label}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_file_path">
                            <Form.Label >{props.filepath}</Form.Label>
                            <Form.Control required type="text" />
                            <Button variant="primary"
                                onClick={() => { openFile("add_file_path", `${props.title}`); }} >{props.browse}</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_file_password">
                            <Form.Label >{props.password}</Form.Label>
                            <Form.Control required type="password" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    addFileAccount(props.dispatch,
                        document.getElementById("add_file_path").value,
                        document.getElementById("add_file_password").value,
                        document.getElementById("add_new_label").value,
                        props.labels);
                    document.getElementById("add_new_label").value = "";
                    document.getElementById("add_file_path").value = "";
                    document.getElementById("add_file_password").value = "";
                    changeModalState(props.dispatch, { modal_file: false });
                }}>{props.submit}</Button>
                <Button variant="danger" onClick={() => { changeModalState(props.dispatch, { modal_file: false }) }}>{props.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}


class Home extends Component {
    componentDidMount() {
        getLegacyAccounts(this.props.dispatch);
        this.props.dispatch(addActiveTab("home"));

    }
    render() {
        console.log("FROM HOME");
        console.log(this.props.legacy_accounts);
        return (
            <>
                {/* <Row>
                    <Col xs={12} ><h2> {this.props.t("home")}</h2></Col>
                </Row> */}
                <Row >
                    <Col xs={12} md={4}>
                        <Accounts />
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="info"
                                        id="add_account_options"
                                        key="add_account_options"
                                        size="md"
                                        block="true">
                                        {this.props.t("accounts_add")}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="file" onClick={() => { changeModalState(this.props.dispatch, { modal_file: true }) }}>{this.props.t("accounts_file")}</Dropdown.Item>
                                        <Dropdown.Item eventKey="keys" onClick={() => { changeModalState(this.props.dispatch, { modal_keys: true }) }}>{this.props.t("accounts_keys")}</Dropdown.Item>
                                        <Dropdown.Item eventKey="seed" onClick={() => { changeModalState(this.props.dispatch, { modal_seeds: true }) }}> {this.props.t("accounts_seed")} </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="new" onClick={(event) => { changeModalState(this.props.dispatch, { modal_new: true }) }}>{this.props.t("accounts_new")} </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

                    </Col>
                    <Col xs={12} md={8} >
                        <History />
                        <Row>
                            <Col><Button type="button" size="md" block="true">{this.props.t("export")}</Button></Col>
                        </Row>

                    </Col>
                </Row>
                <ModalSeeds
                    show={this.props.home_modals.modal_seeds}
                    dispatch={this.props.dispatch}
                    title={this.props.t("add_new_seed")}
                    body_title={this.props.t("25_word_mnemonic")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    label={this.props.t("label")}
                    labels={this.props.account_labels}
                />
                <ModalKeys
                    show={this.props.home_modals.modal_keys}
                    legacy_accounts={this.props.legacy_accounts}
                    dispatch={this.props.dispatch}
                    title={this.props.t("add_new_keys")}
                    body_title={this.props.t("keys")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    address={this.props.t("address")}
                    spend={this.props.t("private_view")}
                    view={this.props.t("private_spend")}
                    label={this.props.t("label")}
                    labels={this.props.account_labels}
                />
                <ModalNew
                    show={this.props.home_modals.modal_new}
                    dispatch={this.props.dispatch}
                    title={this.props.t("add_new")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    label={this.props.t("label")}
                    labels={this.props.account_labels}
                />
                <ModalFile
                    show={this.props.home_modals.modal_file}
                    dispatch={this.props.dispatch}
                    title={this.props.t("add_new_file")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    label={this.props.t("label")}
                    title_body={this.props.t("file")}
                    filepath={this.props.t("filepath")}
                    password={this.props.t("password")}
                    browse={this.props.t("button_browse")}
                    labels={this.props.account_labels}
                />
            </>
        );
    }
}
export default withTranslation('home')(connect(mapStateToProps)(Home));
