import React, { Component } from "react";
import Benchmark from "../Benchmark";
import Average from "../Average";
import Prediction from "../Prediction";
import AnalyticsNav from "./AnalyticsNav";
import PrivateRoute from "../../../helpercomponents/PrivateRoute";
import { Container, Row, Col } from "react-bootstrap/";
import { connect } from "react-redux";
import { authCheck } from "../../../../redux/actions/authActions";

/**
 * AnalyticsRoute renders analytics navbar and establishes routes to analytics subpages
 */

class AnalyticsRoute extends Component {
  render() {
    this.props.authCheck();
    return this.props.run.length !== 0 ? (
      <div>
        <AnalyticsNav />
        <PrivateRoute exact path={this.props.match.path} component={Average} />
        <PrivateRoute
          path={`${this.props.match.path}/benchmarks`}
          component={Benchmark}
        />
        <PrivateRoute
          exact
          path={`${this.props.match.path}/predictions`}
          component={Prediction}
        />
      </div>
    ) : (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="8" className="text-center">
            <h1 className="mt-3 mb-3">No runs to analyze</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  run: state.run.runs,
});

const mapActionsToProps = (dispatch) => {
  return {
    authCheck: () => {
      dispatch(authCheck());
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AnalyticsRoute);
