import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * AnalyticsNav component renders navigation for analytics pages
 */

export default class AnalyticsNav extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="m-auto">
          <Link to="/analytics" className="nav-link">
            Averages
          </Link>
          <Link to="/analytics/predictions" className="nav-link">
            Time Predictions
          </Link>
          <Link to="/analytics/benchmarks" className="nav-link">
            Benchmarks
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
