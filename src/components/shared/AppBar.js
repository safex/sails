import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { minimize, maximize, quit } from '../../modules/shared.module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMinimize, faWindowMaximize, faWindowClose } from '@fortawesome/free-solid-svg-icons';


class AppBar extends Component {

    render() {
        return (
            <>
                <FontAwesomeIcon style={{ marginLeft: "15px", color: "white", cursor: "pointer" }} icon={faWindowMinimize} onClick={minimize.bind(this)} />
                <FontAwesomeIcon style={{ marginLeft: "15px", color: "white", cursor: "pointer" }} icon={faWindowMaximize} onClick={maximize.bind(this)} />
                <FontAwesomeIcon style={{ marginLeft: "15px", color: "white", cursor: "pointer" }} icon={faWindowClose} onClick={quit.bind(this)} />
            </>
        );
    }
}
export default withTranslation("init")(connect()(AppBar)); 