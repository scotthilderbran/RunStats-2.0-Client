import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";

export default class Analytics extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1 className="mt-3 mb-3">Analytics</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
