import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

/* Nav component for analytics page, includes links to all other analytics subroutes/pages */

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="m-auto">
          <Nav.Link href="/analytics/">Averages</Nav.Link>
          <Nav.Link href="/analytics/predictions">Time Predictions</Nav.Link>
          <Nav.Link href="/analytics/benchmarks">Benchmarks</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
