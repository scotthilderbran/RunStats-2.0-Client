import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Benchmarks from "./Benchmarks";
import Average from "./Average";
import AnalyticsNav from "./AnalyticsNav";
import PrivateRoute from "../../helpers/PrivateRoute";

export default class Home extends Component {
  render() {
    return (
      <div>
        <AnalyticsNav />
        <PrivateRoute exact path={this.props.match.path} component={Average} />
        <PrivateRoute
          path={`${this.props.match.path}/benchmarks`}
          component={Benchmarks}
        />
      </div>
    );
  }
}
