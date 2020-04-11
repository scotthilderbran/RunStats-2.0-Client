import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

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
