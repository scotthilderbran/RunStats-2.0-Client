import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import {
  authError,
  stravaTokenExchange,
} from "../../redux/actions/authActions";
import history from "../../helpers/history";

class StravaResponse extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values.code);
    console.log(values.scope);
    if (values.error) {
      this.props.err("Strava Access Denied");
      history.push("/runs/import");
    } else {
      this.props.exchange(values.code);
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
