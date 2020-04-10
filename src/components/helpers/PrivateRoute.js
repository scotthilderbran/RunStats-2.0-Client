import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(auth, props) =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
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

export default connect(mapStateToProps, { pure: false })(PrivateRoute);
