import React, { Component } from "react";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavBar from "./components/layout/Navbar";
import history from "./components/helpers/history";

import Analytics from "./components/pages/analytics/Analytics";
import Runs from "./components/pages/run/Runs";
import Profile from "./components/pages/profile/Profile";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import { loadUser } from "./redux/actions/authActions";
import { PrivateRoute } from "./components/helpers/PrivateRoute";

import "./App.css";

class App extends Component {
  componentDidMount() {
    //store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <NavBar />
            <Switch>
              <PrivateRoute exact path="/runs" component={Runs} />
              <Route path="/analytics">
                <Analytics />
              </Route>
              <Route path="/Profile">
                <Profile />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
