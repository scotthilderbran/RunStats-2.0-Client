import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap/";
import { connect } from "react-redux";

class Benchmarks extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.nth = this.nth.bind(this);
  }
  nth(num) {
    if (num > 3 && num < 21) return "th";
    switch (num % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  render() {
    let sex = this.props.sex ? "male" : "female";
    let finalPercentileByAll = this.props.totals.finalPercentileByAll;
    let finalPercentileBySex = this.props.totals.finalPercentileBySex;
    let finalPercentileByAge = this.props.totals.finalPercentileByAge;
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="5">
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="text-center">Totals</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Total milage: <b>{this.props.totals.distanceSum} </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Total minutes spent running:{" "}
                    <b>{this.props.totals.timeSum}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Total runs logged: <b>{this.props.totals.runCount}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Average overall pace (min/mile):{" "}
                    <b>
                      {(
                        this.props.totals.timeSum /
                        this.props.totals.distanceSum
                      ).toFixed(3)}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md="5">
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="text-center">Pace Comparison</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>
                      {finalPercentileByAll}
                      {this.nth(finalPercentileByAll)}
                    </b>{" "}
                    percentile of all RunStats runners
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>
                      {finalPercentileBySex}
                      {this.nth(finalPercentileBySex)}
                    </b>{" "}
                    percentile of {sex} runners
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>
                      {finalPercentileByAge}
                      {this.nth(finalPercentileByAge)}
                    </b>{" "}
                    percentile of runners between {this.props.totals.ageLow} and{" "}
                    {this.props.totals.ageHigh} years old
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
  sex: state.auth.user.sex,
  totals: state.analytics.totals,
  loaded: state.analytics.isLoaded,
  sex: state.auth.user.sex,
});

export default connect(mapStateToProps, null)(Benchmarks);
