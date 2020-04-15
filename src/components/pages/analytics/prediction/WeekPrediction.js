import React, { Component } from "react";
import { getPrediction } from "../../../../helpers/prediction";
import { connect } from "react-redux";
import { Card, Form, ListGroup } from "react-bootstrap/";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap/";

class MonthAverage extends Component {
  constructor(props) {
    super(props);
    this.state = { distance: 10 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }
  render() {
    const { toggle } = this.props;
    const prediction = getPrediction(
      this.props.runs,
      7,
      "days",
      "MM-DD",
      this.state.distance
    );
    return (
      <Container fluid>
        <Row className="justify-content-md-center ">
          <Col md="6" className="text-center">
            <Card className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b className="float-left">Distance to predict</b>
                  <Form.Group>
                    <Form.Control
                      onChange={this.handleChange}
                      type="text"
                      name="distance"
                    />
                  </Form.Group>
                  <b className="float-left">
                    What interval of data to use? (recent is more accurate){" "}
                  </b>
                </ListGroup.Item>
                <ListGroup.Item className="mt-2">
                  <DropdownButton
                    variant="outline-dark"
                    id="dropdown-basic-button"
                    title="Last Week"
                  >
                    <Dropdown.Item onClick={() => toggle(1)}>
                      Last Week
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggle(2)}>
                      Last Month
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggle(3)}>
                      Last Year
                    </Dropdown.Item>
                  </DropdownButton>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>
                  Predicted total time is {prediction} minutes
                </Card.Title>
              </Card.Body>
            </Card>
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
