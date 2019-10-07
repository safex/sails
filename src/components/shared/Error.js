import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import error_types from '../../setups/error_types.json';
import { addError, removeError } from '../../actions/error.action';
const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists,
    language: state.language,
    error: state.error
  };
};


class Error extends Component {


  componentDidCatch(error, errorInfo) {
    this.props.dispatch(addError({
      error: error,
      errorInfo: errorInfo
    }));
  }


  render() {
    if (this.props.error != false) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.props.error.error && this.props.error.error.toString()}
            {this.props.error.errorInfo && this.props.error.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
export default withTranslation('error')(connect(mapStateToProps)(Error));

