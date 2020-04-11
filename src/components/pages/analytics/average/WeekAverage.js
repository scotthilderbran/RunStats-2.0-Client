import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { getGraphData } from "../../../helpers/average";
import { connect } from "react-redux";
import { Card } from "react-bootstrap/";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap/";

class WeekAverage extends Component {
  render() {
    console.log("Analytics run length");
    console.log(this.props.runs.length);
    const weekAVG = getGraphData(this.props.runs, 7, "days", "MM-DD");
    const { toggle } = this.props;
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
              <Dropdown.Item onClick={() => toggle(1)}>
                Average of Past Week
              </Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(2)}>
                Average of Past Month
              </Dropdown.Item>
              <Dropdown.Item onClick={() => toggle(3)}>
                Average of Past Year
              </Dropdown.Item>
            </DropdownButton>
            <Line
              data={weekAVG[0]}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        callback: function (value, index, values) {
                          return value + " min/mile";
                        },
                        suggestedMin: 3,
                        suggestedMax: 15,
                      },
                    },
                  ],
                },
              }}
            />
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>
                  Weekly Average pace is {Math.round(weekAVG[1] * 100) / 100}{" "}
                  min/mile
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
  loaded: state.run.isLoaded,
});

export default connect(mapStateToProps)(WeekAverage);
