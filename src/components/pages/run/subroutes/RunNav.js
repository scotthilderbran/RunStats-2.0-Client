import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Component renders running navigation bar and links to running subpages
 */

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="m-auto">
          <Link to="/runs" className="nav-link">
            My Runs
          </Link>
          <Link to="/runs/import" className="nav-link">
            Import from Strava
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
