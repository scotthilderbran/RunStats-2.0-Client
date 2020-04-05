import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";

export default class Profile extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1>My Profile</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
