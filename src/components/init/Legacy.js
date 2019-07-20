import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {setWalletExistsStatus} from '../../modules/init.module';
import {Row, Col, Card, Button} from 'react-bootstrap'

class Legacy extends Component {
  render() {
    return   (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Header>{this.props.t("legacy_detected.title")} </Card.Header>
          <Card.Body>
          <Card.Text>
              {this.props.t("legacy_detected.description")}
          </Card.Text>
            <Row>
              <Col><Button variant="primary" onClick={()=>{setWalletExistsStatus(this.props.dispatch, false)}}>{this.props.t("escape_button")}</Button></Col>
              <Col><Link to="/legacy/default" ><Button variant="primary">{this.props.t("proceed_button")}</Button></Link></Col>
            </Row>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    );
  }
}
export default  withTranslation('init')(connect()(Legacy));