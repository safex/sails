import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import error_types from '../../setups/error_types.json';
import { Row, Col, Toast } from 'react-bootstrap';
import { addError } from '../../actions/error.action';

const mapStateToProps = (state) => {
    return {
      wallet_exists: state.wallet_exists,
      language:state.language,
      error:state.error
    };
  };

class ErrorResponse extends Component {

    constructor(props) {
        super(props);
        this.state = { show: true }
    }
    componentDidMount() {
        this.setState({ show: true });
    }

    componentDidCatch(error, errorInfo) {
        this.props.dispatch(addError({
            error: error,
            errorInfo: errorInfo
        }));
    }

    render() {
        if (this.props.error != false) {
            console.log(this.props.error);
            return (
                <Row>
                    <Col>
                    <Toast show={this.state.show} onClick={() => this.setState({ show: false })}>
                    <Toast.Header>
                        <strong className="mr-auto">{this.props.t("api_response_error")}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {error_types.hasOwnProperty(this.props.error)? this.props.t(error_types[this.props.error]):this.props.error}
                        {this.props.error.error && this.props.error.error.toString()}
                        {this.props.error.errorInfo && this.props.error.errorInfo.componentStack}
                        </Toast.Body>
                </Toast>
                    </Col>
                </Row>
               

            );
        }

        return this.props.children;
    }
}
export default withTranslation('error')(connect(mapStateToProps)(ErrorResponse));
