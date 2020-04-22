import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

/* Running page subnavigation bar, links to subroutes within /runs */

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="m-auto">
          <Nav.Link href="/runs/">My Runs</Nav.Link>
          <Nav.Link href="/runs/import">Import Runs</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
