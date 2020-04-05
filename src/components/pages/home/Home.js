import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import Register from "../register/Register";

export default class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center mt-3">
          <Col md="6">
            <h1 className="text-center">Welcome to RunStats</h1>
            <Register />
          </Col>
        </Row>
      </Container>
    );
  }
}
