import React, { Component } from "react";
import Runs from "../Runs";
import Import from "../Import";
import RunNav from "./RunNav";
import PrivateRoute from "../../../helpercomponents/PrivateRoute";
import { connect } from "react-redux";

/* Run page subrouting, gets path of /runs from parent route and appends subroutes. Utilizes private route component */

class RunRoute extends Component {
  render() {
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

export default connect(mapStateToProps)(RunRoute);
