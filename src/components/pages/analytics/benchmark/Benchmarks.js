import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap/";
import { connect } from "react-redux";

class Benchmarks extends Component {
  render() {
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
                    Total minutes spent Running:{" "}
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
                <Card.Title className="text-center">test</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
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
  totals: state.analytics.totals,
  loaded: state.analytics.isLoaded,
});

export default connect(mapStateToProps, null)(Benchmarks);
