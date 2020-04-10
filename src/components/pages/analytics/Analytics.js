import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Average from "./Average";
import PrivateRoute from "../../../components/helpers/PrivateRoute";
import Benchmarks from "./Benchmarks";
import AnalyticsNav from "./AnalyticsNav";

export default class Analytics extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="8" className="text-center">
            <h1 className="mt-3 mb-3">Analytics</h1>
            <AnalyticsNav />
            <Switch>
              <PrivateRoute
                exact
                path="/analytics/averages"
                component={Average}
              />
              <PrivateRoute
                exact
                path="/analytics:averages"
                component={Benchmarks}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}
//Average pace Chart - week, month, year, 5 years
