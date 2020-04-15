import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/* Private Route component used to restrict specific routes to logged in users */

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
  return {
    auth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { pure: false })(PrivateRoute);
