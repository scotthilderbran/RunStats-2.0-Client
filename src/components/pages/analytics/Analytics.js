import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import Average from "./Average";

export default class Analytics extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="8" className="text-center">
            <h1 className="mt-3 mb-3">Analytics</h1>
            <Average />
          </Col>
        </Row>
      </Container>
    );
  }
}
//Average pace Chart - week, month, year, 5 years
