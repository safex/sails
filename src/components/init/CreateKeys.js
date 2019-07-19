import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { wizardNext, addWizardData} from '../../modules/init.module';

import {Row, Col,Card, Button} from 'react-bootstrap';


const mapStateToProps = (state) => {
    return {
        create_wizard: state.create_wizard,
        active_account:state.active_account,
        error:state.error
    };
};



class CreateKeys extends Component {


    render() {
    
        return (
            <>
            <Row>
            <Col>
            <Row>
                <Col>
                    {this.props.t("create.form.file_location")}
                </Col>
                <Col>
                    {this.props.create_wizard.data.filepath}
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    {this.props.t("create.form.wallet_name_label")}
                </Col>
                <Col>
                    {this.props.create_wizard.data.wallet_name }
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    {this.props.t("create.form.password")}
                </Col>
                <Col>
                    {(this.props.create_wizard.data.hasOwnProperty('password_visible') && this.props.create_wizard.data.password_visible)? this.props.create_wizard.data.password: "*".repeat(this.props.create_wizard.data.password.length)}
                </Col>
                <Col>
                <Button variant="primary"  onClick={() => {
                    let val=(this.props.create_wizard.data.hasOwnProperty('password_visible')?!this.props.create_wizard.data.password_visible:true); 
                    addWizardData(this.props.dispatch,{ password_visible : val },"create"); 
                    }}>{(this.props.create_wizard.data.hasOwnProperty('password_visible') && this.props.create_wizard.data.password_visible)?this.props.t('hide_pwd_button'):this.props.t('view_pwd_button')}</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                <Card bg="info" text="white" >
                    <Card.Header>{this.props.t("create.form.public_address")}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("account")?this.props.active_account.account.address:''): ""}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                <Card bg="info" text="white" >
                    <Card.Header>{this.props.t("create.form.mnemonic")}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.hasOwnProperty("account")?this.props.active_account.account.mnemonic:'') : ""}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                <Button variant="primary" onClick={() => { alert("not available")}} >{this.props.t('print_backup_button')}</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                <Button variant="primary" onClick={() => { wizardNext(this.props.dispatch,"create",(history)=>{history.push('/w/home');},[this.props.history]) }} >{this.props.t('next_button')}</Button>
                </Col>
            </Row>
            </Col>
            </Row>
            </>
           );
    }
}
export default withTranslation('init')(connect(mapStateToProps)(CreateKeys));