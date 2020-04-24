import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Public route component used to restrict certain routes to logged out users
 *
 */

const PublicRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(auth, props) =>
      localStorage.getItem("token") ? (
        <Redirect to={{ pathname: "/runs" }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => {
  return {
    authed: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { pure: false })(PublicRoute);
