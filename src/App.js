import React, { Component } from "react";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./components/layout/Navbar";
import history from "./components/helpers/history";

import Analytics from "./components/pages/analytics/Analytics";
import Runs from "./components/pages/run/Runs";
import Profile from "./components/pages/profile/Profile";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import { loadUser } from "./redux/actions/authActions";
import { loadRuns } from "./redux/actions/runActions";
import PrivateRoute from "./components/helpers/PrivateRoute";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PublicRoute from "./components/helpers/PublicRoute";
import store from "./redux/store";

class App extends Component {
  componentDidMount() {
    console.log("adfaksdnfkjadsfan");
    //console.log(this.props.auth);
    if (localStorage.getItem("token")) {
      store.dispatch(loadUser());
      store.dispatch(loadRuns());
    }
  }

  render() {
    let authed = this.props.auth;
    return (
      <Router history={history}>
        <div className="App">
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/runs" component={Runs} />
            <PrivateRoute exact path="/analytics" component={Analytics} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/" component={Home} />
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
