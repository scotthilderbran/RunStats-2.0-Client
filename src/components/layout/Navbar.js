import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Navbar, Nav } from "react-bootstrap";
import { logout } from "../../redux/actions/authActions";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logoutme();
  };
  render() {
    console.log(this.props.isAuth);
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/logo_white.png"
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
          />
          RunStats
        </Navbar.Brand>
        {this.props.isAuth ? (
          <Nav className="ml-auto">
            <Nav.Link href="/runs">Runs</Nav.Link>
            <Nav.Link href="/analytics">Analytics</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Button variant="light" onClick={this.handleLogout}>
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant="light" href="/login">
              Login
            </Button>
          </Nav>
        )}
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.todos,
    isAuth: state.auth.isAuthenticated,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    logoutme: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Navigation);
