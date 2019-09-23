import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import error_types from '../../setups/error_types.json';
import { Row, Col, Toast } from 'react-bootstrap';
import { removeError } from '../../redux/actions/error.action';

const mapStateToProps = (state) => {
    return {
        error: state.error
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


    render() {
        if (this.props.error !== false) {
            console.log(this.props.error);
            return (
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Toast show={this.state.show} onClick={() => { this.setState({ show: false }); this.props.dispatch(removeError()) }}>
                            <Toast.Header>
                                <strong className="mr-auto">{this.props.t("api_response_error")}</strong>
                            </Toast.Header>
                            <Toast.Body>
                                Try again later! <br></br>
                                {error_types.hasOwnProperty(this.props.error) ? this.props.t(error_types[this.props.error]) : this.props.error}

                                {this.props.error.error && this.props.error.error.toString()}
                                {this.props.error.errorInfo && this.props.error.errorInfo.componentStack}
                            </Toast.Body>
                        </Toast>
                    </Col>
                </Row>


            );
        }

        return  null;
    }
}
export default withTranslation('error')(connect(mapStateToProps)(ErrorResponse));
