import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Accounts from './Accounts';
import History from './History';


class Home extends Component {
    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col><h1> {this.props.t("home")}</h1></Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Accounts />
                            <DropdownButton
                                title={this.props.t("accounts_add")}
                                variant="info"
                                id="add_account_options"
                                key="add_account_options"
                                size="md"
                                block="true" >
                                <Dropdown.Item eventKey="file">{this.props.t("accounts_file")}</Dropdown.Item>
                                <Dropdown.Item eventKey="keys">{this.props.t("accounts_keys")}</Dropdown.Item>
                                <Dropdown.Item eventKey="seed"> {this.props.t("accounts_seed")} </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="new">{this.props.t("accounts_new")} </Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col xs={8}>
                            <History />
                            <Button type="button" size="md" block="true">{this.props.t("export")}</Button>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default withTranslation('home')(connect()(Home));