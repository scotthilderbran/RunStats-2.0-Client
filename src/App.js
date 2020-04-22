import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./components/layout/Navbar";
import history from "./helpers/history";

import AnalyticsRoute from "./components/pages/analytics/subroutes/AnalyticsRoute";
import RunRoute from "./components/pages/run/subroutes/RunRoute";
import Profile from "./components/pages/profile/Profile";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import { loadRuns } from "./redux/actions/runActions";
import PrivateRoute from "./components/helpercomponents/PrivateRoute";
import StravaResponse from "./components/helpercomponents/StravaResponse";
import { authCheck } from "./redux/actions/authActions";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PublicRoute from "./components/helpercomponents/PublicRoute";
import store from "./redux/store";

/* Application component that provides root routing and loads navigation bar */

class App extends Component {
  render() {
    store.dispatch(authCheck());
    store.dispatch(loadRuns());
    return (
      <Router history={history}>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/runs" component={RunRoute} />
            <Route path="/analytics" component={AnalyticsRoute} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/" component={Home} />
            <Route path="/stravaResponse" component={StravaResponse} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, { pure: false })(App);
