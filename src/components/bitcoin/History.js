import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Row, Col, Alert } from 'react-bootstrap';


class History extends Component {

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Alert key={`alert-${this.props.key}`} variant="light" className="text-left">
                            <Alert.Heading className="text-uppercase">{this.props.tx.coin}</Alert.Heading>
                            <p className="text-left">{this.props.t(`${this.props.tx.direction}_button`)}</p>
                            <p className="text-left">{this.props.tx.date_time.toLocaleString()}</p>
                            <p >TX: {this.props.tx.txid}</p>
                            <Row>
                                <Col className="p-1 bg-info text-white" > {this.props.tx.sending_address}</Col>
                                <Col className="p-0 m-0 text-center">-></Col>
                                <Col className="p-1 bg-info text-white">{this.props.tx.reference_address}</Col>
                            </Row>
                            <hr />
                            <p className="mb-0">
                                {this.props.tx.amount} {this.props.tx.coin === "safex" ? this.props.tx.coin : `${this.props.tx.coin}(s)`} {this.props.tx.coin === "safex" ? (this.props.tx.confirmations > 16 ? "16/16" : `${this.props.tx.confirmations}/16`) : this.props.tx.confirmations} confirmations.
                            </p>
                            <hr />

                        </Alert>
                    </Col>
                </Row>
            </>
        );
    }
}
export default withTranslation('bitcoin')(connect()(History));