import React, { Component } from "react";
import { connect } from "react-redux";
import RunLineItem from "./RunLineItem";
import AddRun from "./AddRun";

import { Container, Row, Col } from "react-bootstrap/";

class RunContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const runs = this.props.runs.map(function(run) {
      return <RunLineItem run={run} />;
    });
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1>Saved Runs</h1>
            {runs}
            <AddRun />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  runs: state.runs
});

export default connect(mapStateToProps)(RunContainer);
