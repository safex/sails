import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getActiveAccountFromWallet } from '../../modules/shared.module';
import { Navbar, Nav } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    active_account: state.active_account,
    active_tab: state.active_tab,
  };
};


class TopMenu extends Component {

  componentDidMount() {
    if (!this.props.active_account.hasOwnProperty("type"))
      getActiveAccountFromWallet(this.props.dispatch);
  }

  render() {

    return (<>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href='/w/home'>{this.props.t("active")}: 
        {this.props.active_account.hasOwnProperty("account") ? this.props.active_account.account.address : "No accounts"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/w/home">{this.props.t("home")}</Nav.Link>
            <Nav.Link href='/w/sfx'>{this.props.t("sfx")}</Nav.Link>
            <Nav.Link href='/w/sft'>{this.props.t("sft")}</Nav.Link>
            <Nav.Link href='/w/contacts'>{this.props.t("contacts")}</Nav.Link>
            <Nav.Link href='/w/settings'>{this.props.t("settings")}</Nav.Link>
            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.type ? <Nav.Link href='/w/migrations'>{this.props.t("migrations")}</Nav.Link> : '') : ''}
            {this.props.hasOwnProperty("active_account") ? (this.props.active_account.type ? <Nav.Link href='/w/bitcoin'>{this.props.t("bitcoin")}</Nav.Link> : '') : ''}
            <Nav.Link href='#'>{this.props.t("logout")}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>);
  }
}
export default withTranslation('top_menu')(connect(mapStateToProps)(TopMenu));