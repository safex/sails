import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { addWizardData, addWizardErrors, addWizardTouched, wizardNext } from '../../modules/init.module';
import { Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';

let is_valid = function (field, type, data) {
    return true;
    //return (this.props.wizard.data[field] === type) && ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(data) && !this.props.wizard.errors[data]));
}
let is_invalid = function (field, type, data) {
    return false;
    //return (this.props.wizard.data[field] === type) && ((this.props.wizard.touched.hasOwnProperty(data) && this.props.wizard.touched[data]) && (this.props.wizard.errors.hasOwnProperty(data) && this.props.wizard.errors[data]));
}


class WizardData extends Component {
    /*
    prop_names
    0 - tab value prop name
    1 - mnemonic text area
    2 - adress input
    3 - private view key
    4 - private spend key
    */



    static getDerivedStateFromProps(props,state){
        console.log("derived");
        console.log(props);
        console.log(state);
    }

    shouldComponentUpdate(props,state){
        console.log("should");
        console.log(props);
        console.log(state);
        return true;
    }

    render() {
        
        let names = this.props.prop_names;
        console.log(this.props.values[names[1]]);
        if (this.props.step !== 1 && this.props.component === "restore") {
            return null;
        }
        return (
            <Row>
                <Col>

                    <Tabs id="controlled-tab-example" activeKey={this.props.values[names[0]]} name={names[0]} onSelect={this.props.handleTabSelect}>
                        <Tab eventKey="mnemonic" title={this.props.t("mnemonic")}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={names[1]}>
                                    <Form.Label >{this.props.t("25_word_mnemonic")}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        name={names[1]}
                                        value={this.props.values[names[1]]}
                                        isValid={is_valid.bind(this, names[0], "mnemonic", names[1])()}
                                        isInvalid={is_invalid.bind(this, names[0], "mnemonic", names[1])()}
                                        onChange={this.props.handleChange}

                                    />
                                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")} {this.props.t("required_25_words")}</Form.Control.Feedback>

                                </Form.Group>
                            </Form.Row>
                        </Tab>
                        <Tab eventKey="keys" title={this.props.t("keys")}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={names[2]}>
                                    <Form.Label >{this.props.t("address")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={names[2]}
                                        value={this.props.values[names[2]]}
                                        isValid={is_valid.bind(this, names[0], "keys", names[2])()}
                                        isInvalid={is_invalid.bind(this, names[0], "keys", names[2])()}
                                        onChange={this.props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>

                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={names[3]}>
                                    <Form.Label >{this.props.t("private_view")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={names[3]}
                                        value={this.props.values[names[3]]}
                                        isValid={is_valid.bind(this, names[0], "keys", names[3])()}
                                        isInvalid={is_invalid.bind(this, names[0], "keys", names[3])()}
                                        onChange={this.props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId={names[4]}>
                                    <Form.Label >{this.props.t("private_spend")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={names[4]}
                                        value={this.props.values[names[4]]}
                                        isValid={is_valid.bind(this, names[0], "keys", names[4])()}
                                        isInvalid={is_invalid.bind(this, names[0], "keys", names[4])()}
                                        onChange={this.props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">{this.props.t("required_field")}</Form.Control.Feedback>

                                </Form.Group>
                            </Form.Row>


                        </Tab>
                    </Tabs>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="danger" type="button" onClick={this.props.back}>{this.props.t('back_button')}</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="success" type="button" >{this.props.t('next_button')}</Button>
                        </Form.Group>
                    </Form.Row>

                </Col>

            </Row>



        );
    }
}
export default withTranslation('init')(connect()(WizardData));