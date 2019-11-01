import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Button, Dropdown, DropdownButton, Modal, Form } from 'react-bootstrap';
import Accounts from './Accounts';
import History from './History';
import { addNewAccount, changeModalState, addSeedsAccount, addKeysAccount, addFileAccount, openFile, getLegacyAccounts, saveFile, exportKeys } from '../../modules/home.module';
import { addActiveTab } from '../../actions/active_tab.action';

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        active_account: state.active_account,
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
                        <Form.Group as={Col} controlId="export_keys_scope">
                            <Form.Label as="legend" > {props.export_scope} </Form.Label>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label={props.label_current}
                                    name="export_keys_scope"
                                    inline="true"
                                    id="type_current"
                                    value="current"
                                />
                                <Form.Check
                                    defaultChecked="true"
                                    type="radio"
                                    label={props.label_all}
                                    name="export_keys_scope"
                                    inline="true"
                                    id="type_all"
                                    value="all"
                                />

                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="export_keys_type">
                            <Form.Label as="legend" > {props.export_type} </Form.Label>
                            <Col>
                                <Form.Check
                                    defaultChecked="true"
                                    type="radio"
                                    label={props.label_encrypted}
                                    name="export_keys_type"
                                    inline="true"
                                    id="type_encrypted"
                                    value="encrypted"
                                    onClick={() => { document.getElementById("row_password").classList.remove("invisible"); document.getElementById("row_password").classList.add("visible"); }}
                                />
                                <Form.Check
                                    type="radio"
                                    label={props.label_raw}
                                    name="export_keys_type"
                                    inline="true"
                                    id="type_raw"
                                    value="raw"
                                    onClick={() => { document.getElementById("row_password").classList.remove("visible"); document.getElementById("row_password").classList.add("invisible"); }}
                                />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row id="row_password" className="visible">
                        <Form.Group as={Col} controlId="export_keys_password">
                            <Form.Label >{props.password}</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="export_keys_path">
                            <Form.Label >{props.filepath}</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                readOnly={true}
                                plaintext
                            />
                            <Button variant="primary"
                                onClick={() => { saveFile("export_keys_path", `${props.title}`); }} >{props.browse}</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    exportKeys(
                        props.dispatch,
                        props.active_account,
                        props.accounts,
                        document.querySelector('input[name=export_keys_type]:checked').value,
                        document.querySelector('input[name=export_keys_scope]:checked').value,
                        document.getElementById("export_keys_password").value.trim(),
                        document.getElementById("export_keys_path").value.trim()
                    );
                    document.querySelector('input[name=export_keys_type]:checked').value = "ecrypted";
                    document.querySelector('input[name=export_keys_scope]:checked').value = "current";
                    document.getElementById("export_keys_password").value = "";
                    document.getElementById("export_keys_path").value = "";
                    changeModalState(props.dispatch, { modal_export: false });
                }}>{props.submit}</Button>
                <Button variant="danger" onClick={() => { changeModalState(props.dispatch, { modal_export: false }) }}>{props.close}</Button>
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
                    addSeedsAccount(
                        props.dispatch,
                        document.getElementById("add_new_seeds").value,
                        document.getElementById("add_seeds_label").value,
                        props.accounts,
                        props.labels);
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
                        props.accounts,
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
                    <Form.Row>
                        <Form.Group as={Col} controlId="add_file_type">
                            <Form.Label as="legend" > {props.type} </Form.Label>
                            <Col>
                                <Form.Check
                                    defaultChecked="true"
                                    type="radio"
                                    label={props.label_new}
                                    name="add_file_type"
                                    inline="true"
                                    id="type_new"
                                    value="new"
                                />
                                <Form.Check
                                    type="radio"
                                    label={props.label_old}
                                    name="add_file_type"
                                    inline="true"
                                    id="type_current"
                                    value="old"
                                />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(event) => {
                    addFileAccount(props.dispatch,
                        document.getElementById("add_file_path").value.trim(),
                        document.getElementById("add_file_password").value.trim(),
                        document.getElementById("add_new_label").value.trim(),
                        document.querySelector('input[name=add_file_type]:checked').value,
                        props.accounts,
                        props.labels);
                    document.getElementById("add_new_label").value = "";
                    document.getElementById("add_file_path").value = "";
                    document.getElementById("add_file_password").value = "";
                    document.querySelector('input[name=add_file_type]:checked').value = "new";
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
        return (
            <>
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
                            <Col><Button type="button" size="md" block="true" onClick={(event) => { changeModalState(this.props.dispatch, { modal_export: true }) }} >{this.props.t("export")}</Button></Col>
                        </Row>

                    </Col>
                </Row>
                <ModalSeeds
                    show={this.props.home_modals.modal_seeds}
                    accounts={this.props.accounts}
                    dispatch={this.props.dispatch}
                    labels={this.props.account_labels}
                    title={this.props.t("add_new_seed")}
                    body_title={this.props.t("25_word_mnemonic")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    label={this.props.t("label")}

                />
                <ModalKeys
                    show={this.props.home_modals.modal_keys}
                    legacy_accounts={this.props.legacy_accounts}
                    accounts={this.props.accounts}
                    dispatch={this.props.dispatch}
                    labels={this.props.account_labels}
                    title={this.props.t("add_new_keys")}
                    body_title={this.props.t("keys")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    address={this.props.t("address")}
                    spend={this.props.t("private_view")}
                    view={this.props.t("private_spend")}
                    label={this.props.t("label")}

                />
                <ModalNew
                    show={this.props.home_modals.modal_new}
                    dispatch={this.props.dispatch}
                    labels={this.props.account_labels}
                    title={this.props.t("add_new")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    label={this.props.t("label")}

                />
                <ModalFile
                    show={this.props.home_modals.modal_file}
                    dispatch={this.props.dispatch}
                    accounts={this.props.accounts}
                    title={this.props.t("add_new_file")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    label={this.props.t("label")}
                    title_body={this.props.t("file")}
                    filepath={this.props.t("filepath")}
                    password={this.props.t("password")}
                    browse={this.props.t("button_browse")}
                    labels={this.props.account_labels}
                    label_new={this.props.t("new")}
                    label_old={this.props.t("old")}
                    type={this.props.t("type")}
                />
                <ModalExportKeys
                    show={this.props.home_modals.modal_export}
                    dispatch={this.props.dispatch}
                    active_account={this.props.active_account}
                    accounts={this.props.accounts}
                    title={this.props.t("export")}
                    submit={this.props.t("button_add")}
                    close={this.props.t("button_close")}
                    body_title={this.props.t("export_body")}
                    filepath={this.props.t("filepath")}
                    password={this.props.t("password")}
                    browse={this.props.t("button_browse")}
                    export_type={this.props.t("export_type")}
                    label_encrypted={this.props.t("label_encrypted")}
                    label_raw={this.props.t("label_raw")}
                    export_scope={this.props.t("export_scope")}
                    label_all={this.props.t("all")}
                    label_current={this.props.t("current")}

                />
            </>
        );
    }
}
export default withTranslation('home')(connect(mapStateToProps)(Home));
