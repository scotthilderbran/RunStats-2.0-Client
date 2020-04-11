import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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
    auth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { pure: false })(PublicRoute);
