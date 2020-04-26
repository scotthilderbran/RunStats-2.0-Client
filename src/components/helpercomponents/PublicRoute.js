import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Public Route component used to restrict certain routes to logged out users
 */

const PublicRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(auth, props) =>
      localStorage.getItem("token") ? ( //Checks if token in localstorage
        <Redirect to={{ pathname: "/runs" }} /> //Redirect to runs page
      ) : (
        <Component {...props} /> //Load compoonent
      )
    }
  />
);

const mapStateToProps = (state) => {
  //Not currently used but will likely be implemented to read auth from state not from JWT status in localstorage
  return {
    authed: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { pure: false })(PublicRoute);
