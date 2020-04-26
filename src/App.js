import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

//CSS
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

//Helpers
import PrivateRoute from "./components/helpercomponents/PrivateRoute";
import PublicRoute from "./components/helpercomponents/PublicRoute";

import history from "./helpers/history";
import store from "./redux/store";

//Pages, Subroutes, and layout
import Navigation from "./components/layout/Navbar";
import AnalyticsRoute from "./components/pages/analytics/subroutes/AnalyticsRoute";
import RunRoute from "./components/pages/run/subroutes/RunRoute";
import Profile from "./components/pages/profile/Profile";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import StravaResponse from "./components/helpercomponents/StravaResponse";

//Actions
import { intialAuthCheck } from "./redux/actions/authActions";

/**
 * Root app component
 */

class App extends Component {
  render() {
    store.dispatch(intialAuthCheck()); //Dispatch initial auth check on first load
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
    auth: state.auth.isAuthenticated, //Not currently used to manage auth, will likely be updated in future
  };
}

export default connect(mapStateToProps, { pure: false })(App);
