import React, { Component } from "react";
import RunContainer from "./RunContainer";
import { Container, Row, Col } from "react-bootstrap/";
import { connect } from "react-redux";

/* Root runs page, loads RunContainer if loaded otherwise shows loading indicator */

class Runs extends Component {
  render() {
    return this.props.isLoading || !this.props.isRunsLoaded ? (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1 className="mt-3 mb-3">Loading</h1>
          </Col>
        </Row>
      </Container>
    ) : (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="10" className="text-center">
            <h1 className="mt-3 mb-3">{this.props.name}'s Runs</h1>
            <RunContainer />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.auth.user.userFName,
  isLoading: state.auth.isLoading,
  isRunsLoaded: state.run.isLoaded,
});

export default connect(mapStateToProps)(Runs);
