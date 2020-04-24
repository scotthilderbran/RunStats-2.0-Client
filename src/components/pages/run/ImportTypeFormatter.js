import React, { Component } from "react";

//ActionFormatter binds react-bootstrap table column to icon buttons of edit and delete
export default class ActionsFormatter extends Component {
  render() {
    return this.props.strava ? (
      <img src={require("./strava.png")} alt="strava" height="15%" />
    ) : (
      <img src={require("./runstats.png")} alt="runstats" height="15%" />
    );
  }
}
