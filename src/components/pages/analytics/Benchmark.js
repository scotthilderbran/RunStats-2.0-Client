import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap/";
import Benchmarks from "./benchmark/Benchmarks";
import { getBenchmarks } from "../../../redux/actions/analyticsActions";

/**
 * Benchmark component container to load benchmarks and handle loading state
 */

class Benchmark extends Component {
  render() {
    this.props.getBenchmarks(); //Load benchmarks
    return this.props.loaded ? ( //If loading display spinner
      <Benchmarks />
    ) : (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <Spinner animation="border" variant="dark" className="mt-3" />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    getBenchmarks: () => {
      dispatch(getBenchmarks());
    },
  };
};

const mapStateToProps = (state) => ({
  loaded: state.run.isLoaded,
});

export default connect(mapStateToProps, mapActionsToProps)(Benchmark);
