import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import error_types from '../../setups/error_types.json';
import { Row, Col, Modal } from 'react-bootstrap';
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
                <Modal show={this.state.show} onClick={() => { this.setState({ show: false }); this.props.dispatch(removeError()) }}>
                    <Modal.Header closeButton>
                        <Modal.Title><strong className="mr-auto">{this.props.t("api_response_error")}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.t("try_again")}
                        <br></br>
                        {error_types.hasOwnProperty(this.props.error) ? this.props.t(error_types[this.props.error]) : this.props.error}
                        {this.props.error.error && this.props.error.error.toString()}
                        {this.props.error.errorInfo && this.props.error.errorInfo.componentStack}
                    </Modal.Body>
                </Modal>


            );
        }

        return null;
    }
}
export default withTranslation('error')(connect(mapStateToProps)(ErrorResponse));
