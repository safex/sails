import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import { getActiveAccountFromWallet, logout } from '../../modules/shared.module';
import { Navbar, Nav } from 'react-bootstrap';

import * as R from '../../setups/routes';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab: state.active_tab,
    account_labels: state.account_labels
  };
};


class TopMenu extends Component {

  componentDidMount() {
    if (!this.props.active_account.hasOwnProperty("type")) { getActiveAccountFromWallet(this.props.dispatch, this.props.account_labels); }
  }

  render() {
    console.log(this.props.active_account.account);
    return (<>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href={R.HOME} key={`active-account-${this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.label : "X"}`}>{this.props.t("active")}: {this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.label : "No accounts"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={R.HOME} active={this.props.active_tab == "home" ? true : false}>{this.props.t("home")}</Nav.Link>
            {this.props.hasOwnProperty("active_account") ? (!this.props.active_account.type ? <Nav.Link href={R.SFX_ONLY} active={this.props.active_tab == "sfx" ? true : false}>{this.props.t("sfx")}</Nav.Link> : '') : ''}
            {this.props.hasOwnProperty("active_account") ? (!this.props.active_account.type ? <Nav.Link href={R.SFT_ONLY} active={this.props.active_tab == "sft" ? true : false}>{this.props.t("sft")}</Nav.Link> : '') : ''}
            <Nav.Link href={R.CONTACTS} active={this.props.active_tab == "contacts" ? true : false}>{this.props.t("contacts")}</Nav.Link>
            <Nav.Link href={R.SETTINGS} active={this.props.active_tab == "setting" ? true : false}>{this.props.t("settings")}</Nav.Link>
            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.type ? <Nav.Link href={R.MIGRATIONS} active={this.props.active_tab == "migrations" ? true : false}>{this.props.t("migrations")}</Nav.Link> : '') : ''}
            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.type ? <Nav.Link href={R.BITCOIN} active={this.props.active_tab == "bitcoin" ? true : false}>{this.props.t("bitcoin")}</Nav.Link> : '') : ''}
            <Nav.Link onClick={logout.bind(this)}>{this.props.t("logout")}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>);
  }
}
export default withTranslation('top_menu')(withRouter(connect(mapStateToProps)(TopMenu)));