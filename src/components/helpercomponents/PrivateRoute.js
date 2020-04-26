import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Private Route component used to restrict specific routes to logged in users
 */

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(auth, props) =>
      localStorage.getItem("token") ? ( //Checks if token in localstorage
        <Component {...props} /> //Load component
      ) : (
        <Redirect to={{ pathname: "/login" }} /> //Redirect to login page
      )
    }
  />
);

const mapStateToProps = (state) => {
  //Not currently used but will likely be implemented to read auth from state not from JWT status in localstorage
  return {
    auth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { pure: false })(PrivateRoute);
