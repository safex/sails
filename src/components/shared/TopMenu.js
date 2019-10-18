import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import { getActiveAccountFromWallet, logout, openAccounts } from '../../modules/shared.module';
import { Navbar, Nav } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab: state.active_tab,
    account_labels: state.account_labels
  };
};


class TopMenu extends Component {

  componentDidMount() {
    if (JSON.stringify(this.props.active_account) === "{}") {
      if (localStorage.getItem("active_account")) {
        openAccounts(this.props.dispatch, JSON.parse(localStorage.getItem("active_account")), true);
      }
      else { getActiveAccountFromWallet(this.props.dispatch, this.props.account_labels) };
    }
  }

  render() {
    console.log(this.props.active_account);
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" style={{ "color": "white !important" }}>
          <Navbar.Brand href='/w/home' key={`active-account-${this.props.active_account.hasOwnProperty("account_name") ? this.props.active_account.account_name : "X"}`}>{this.props.t("active")}: {this.props.active_account.hasOwnProperty("label") ? this.props.active_account.label : "X"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" fill="true">
              <Nav.Link href="/w/home" active={this.props.active_tab == "home" ? true : false}>{this.props.t("home")}</Nav.Link>
              <Nav.Link href='/w/sfx' active={this.props.active_tab == "sfx" ? true : false}>{this.props.t("sfx")}</Nav.Link>
              <Nav.Link href='/w/sft' active={this.props.active_tab == "sft" ? true : false}>{this.props.t("sft")}</Nav.Link>
              <Nav.Link href='/w/contacts' active={this.props.active_tab == "contacts" ? true : false}>{this.props.t("contacts")}</Nav.Link>
              <Nav.Link href='/w/settings' active={this.props.active_tab == "setting" ? true : false}>{this.props.t("settings")}</Nav.Link>
              <Nav.Link href='/w/migrations' active={this.props.active_tab == "migrations" ? true : false}>{this.props.t("migrations")}</Nav.Link>
              <Nav.Link href='/w/bitcoin' active={this.props.active_tab == "bitcoin" ? true : false}>{this.props.t("bitcoin")}</Nav.Link>
              <Nav.Link onClick={logout.bind(this)}>{this.props.t("logout")}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
export default withTranslation('top_menu')(withRouter(connect(mapStateToProps)(TopMenu)));