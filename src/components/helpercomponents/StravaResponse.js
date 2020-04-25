import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import {
  authError,
  stravaTokenExchange,
} from "../../redux/actions/authActions";
import history from "../../helpers/history";

/**
 * Strava response component handles strava callback url and dispatches access code exchange
 */

class StravaResponse extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values.error) {
      //If user denied strava acccess
      this.props.err("Strava Access Denied");
      history.push("/runs/import");
    } else {
      this.props.exchange(values.code); //Exchange strava access code
    }
  }

  render() {
    return <div></div>;
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    err: (msg) => {
      dispatch(authError(msg));
    },
    exchange: (responseCode) => {
      dispatch(stravaTokenExchange(responseCode));
    },
  };
};

export default connect(null, mapActionsToProps)(StravaResponse);
