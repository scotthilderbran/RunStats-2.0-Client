import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap/";

export default class Benchmarks extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1 className="mt-3 mb-3">Benchmarks</h1>
            <Spinner animation="border" variant="dark" />
          </Col>
        </Row>
      </Container>
    );
  }
}
