import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(auth, props) =>
      localStorage.getItem("token") ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => {
  console.log("map to props state test PRIVATE");
  console.log(state.auth);
  return {
    auth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { pure: false })(PublicRoute);
