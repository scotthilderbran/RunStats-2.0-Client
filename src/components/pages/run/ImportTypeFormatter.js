import React, { Component } from "react";

/**
 * StravaFormatter binds react-bootstrap table import column to either strava icon or runstats icon
 */

export default class StravaFormatter extends Component {
  render() {
    return this.props.strava ? (
      <img src={require("./strava.png")} alt="strava" height="15%" />
    ) : (
      <img src={require("./runstats.png")} alt="runstats" height="15%" />
    );
  }
}
