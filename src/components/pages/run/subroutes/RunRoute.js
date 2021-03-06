import React, { Component } from "react";
import Runs from "../Runs";
import Import from "../Import";
import RunNav from "./RunNav";
import PrivateRoute from "../../../helpercomponents/PrivateRoute";
import { connect } from "react-redux";
import { authCheck } from "../../../../redux/actions/authActions";
import { loadRuns } from "../../../../redux/actions/runActions";
/**
 * Run page subrouting, gets path of /runs from parent route and appends subroutes. Utilizes private route component
 */

class RunRoute extends Component {
  render() {
    this.props.authCheck(); //Check auth on any route change
    return (
      <div>
        <RunNav />
        <PrivateRoute exact path={this.props.match.path} component={Runs} />
        <PrivateRoute
          path={`${this.props.match.path}/import`}
          component={Import}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  run: state.run.runs,
});

const mapActionsToProps = (dispatch) => {
  return {
    authCheck: () => {
      dispatch(authCheck());
    },
    loadRuns: () => {
      dispatch(loadRuns());
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RunRoute);
