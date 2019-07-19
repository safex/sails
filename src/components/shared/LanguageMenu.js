import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {changeLanguageF} from '../../modules/shared.module';
import {Row, Col} from 'react-bootstrap'
const mapStateToProps = (state) => {
  return {
    language:state.language,
  };
};


class LanguageMenu extends Component {
  
    constructor(props){
       super(props);
    }

  render() {
   return  (
    <Row>
      <Col md={{ offset:11 }} >
        <select value={this.props.language} onChange={(event)=>changeLanguageF(this,event.target.value)}>
          <option value="en">English</option>
          <option value="rs">Serbian</option>
        </select>
      </Col>
    </Row>
   );
  }
}
export default withTranslation()(connect(mapStateToProps)(LanguageMenu));
