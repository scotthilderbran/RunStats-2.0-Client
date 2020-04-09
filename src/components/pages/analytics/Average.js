import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap/";
import WeekAverage from "./WeekAverage";
import { Container, Row, Col } from "react-bootstrap/";

export default class Average extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center ">
          <Col md="6" className="text-center">
            <DropdownButton
              className="mt-2"
              variant="outline-dark"
              id="dropdown-basic-button"
              title="Weekly Average"
            >
              <Dropdown.Item href="#/action-1">
                Average of Past Week
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Average of Past Month
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Average of Past Year
              </Dropdown.Item>
            </DropdownButton>
            <WeekAverage className="mt-4" />
          </Col>
        </Row>
      </Container>
    );
  }
}
