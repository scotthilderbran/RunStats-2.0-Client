import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Card } from "react-bootstrap/";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap/";

class MonthAverage extends Component {
  onComponentDidMount;
  render() {
    const { toggle } = this.props;
    return (
      <Container fluid>
        <Row className="justify-content-md-center ">
          <Col md="6" className="text-center">
            <DropdownButton
              className="mt-2"
              variant="outline-dark"
              id="dropdown-basic-button"
              title="Last Month"
            >
              <Dropdown.Item onClick={() => toggle(1)}>Last Week</Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(2)}>
                Last Month
              </Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(3)}>Last Year</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  runs: state.run.runs,
});

export default connect(mapStateToProps)(MonthAverage);
