import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Navbar, Nav } from "react-bootstrap";
import { logout } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";

/**
 * Navbar Component renders default navbar based on auth state
 */

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };
  render() {
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
            <Link to="/runs" className="nav-link">
              Runs
            </Link>
            <Link to="/analytics" className="nav-link">
              Analytics
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
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
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Navigation);
