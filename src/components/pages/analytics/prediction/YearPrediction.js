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
    this.state = { distance: null };
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
      11,
      "months",
      "YYYY-MM",
      this.state.distance
    );
    return (
      <Container fluid>
        <Row className="justify-content-md-center ">
          <Col md="6" className="text-center mt-2">
            <b>What interval of data to use? (recent is more accurate)</b>
            <DropdownButton
              variant="outline-dark"
              id="dropdown-basic-button"
              title="Last Year"
              className="mt-2"
            >
              <Dropdown.Item onClick={() => toggle(1)}>Last Week</Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(2)}>
                Last Month
              </Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(3)}>Last Year</Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(4)}>All Time</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row className="justify-content-md-center ">
          <Col md="5" className="text-center">
            <Card className="mt-3">
              <Card.Title className="text-center mt-3">
                Custom Prediction
              </Card.Title>
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
                </ListGroup.Item>
                <ListGroup.Item>Predicted time: {prediction}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md="5">
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="text-center">Predictions</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Marathon (26.2 miles):{" "}
                    {getPrediction(
                      this.props.runs,
                      11,
                      "months",
                      "YYYY-MM",
                      26.2
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Half Marathon (13.1 miles):{" "}
                    {getPrediction(
                      this.props.runs,
                      11,
                      "months",
                      "YYYY-MM",
                      13.1
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    20K (12.427 miles):{" "}
                    {getPrediction(
                      this.props.runs,
                      11,
                      "months",
                      "YYYY-MM",
                      12.427
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    15K (9.321 miles):{" "}
                    {getPrediction(
                      this.props.runs,
                      11,
                      "months",
                      "YYYY-MM",
                      9.321
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    10K (6.214 miles):{" "}
                    {getPrediction(
                      this.props.runs,
                      11,
                      "months",
                      "YYYY-MM",
                      6.214
                    )}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    5K (3.107 miles):{" "}
                    {getPrediction(
                      this.props.runs,
                      11,
                      "months",
                      "YYYY-MM",
                      3.107
                    )}{" "}
                  </ListGroup.Item>
                </ListGroup>
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
