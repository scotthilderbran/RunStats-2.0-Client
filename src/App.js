import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/layout/Navbar";

import Analytics from './components/pages/analytics/Analytics';
import Runs from './components/pages/run/Runs';
import Profile from './components/pages/profile/Profile';
import Home from './components/pages/home/Home'

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/runs">
            <Runs />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
