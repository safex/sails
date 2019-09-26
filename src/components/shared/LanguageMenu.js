import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { changeLanguageF } from '../../modules/shared.module';
import { Row, Col } from 'react-bootstrap'
const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};


class LanguageMenu extends Component {

  render() {
    return (
      <div style={{ "margin-left": "15px" }}>
        <select value={this.props.language} onChange={(event) => changeLanguageF(this, event.target.value)}>
          <option value="en">English</option>
          <option value="rs">Serbian</option>
        </select>
      </div>
    );
  }
}
export default withTranslation()(connect(mapStateToProps)(LanguageMenu));
