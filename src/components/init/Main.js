import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {Card, Row, Col} from 'react-bootstrap'

class CardMain extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Link to={this.props.to}>
        <Card bg="light" text="dark">
          <Card.Header as="h5">{this.props.header}</Card.Header>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text> {this.props.text}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

class Main extends Component {

  render() {
   return  ( 
     <div>
     <Row>
       <Col>
          <CardMain header="1" text={this.props.t('create.description')} title={this.props.t('create.button')} to="/create" />
       </Col>
     </Row>

     <Row>
       <Col>
          <CardMain header="2" text={this.props.t('open.description')} title={this.props.t('open.button')} to="/open" />
       </Col>
     </Row>

     <Row>
       <Col>
          <CardMain header="3" text={this.props.t('restore.description')} title={this.props.t('restore.button')} to="/restore" />
       </Col>
     </Row>
     
     <Row>
       <Col>
          <CardMain header="4" text={this.props.t('legacy.description')} title={this.props.t('legacy.button')} to="/legacy/init" />
       </Col>
     </Row>
     </div>
            );
  }
}
export default  withTranslation('init')(connect()(Main));