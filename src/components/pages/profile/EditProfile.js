import React, { Component } from "react";
import { connect } from "react-redux";

export default class EditProfile extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  name: state.auth.user.userFName,
  isLoading: state.auth.isLoading,
  isRunsLoaded: state.run.isLoaded,
});

export default connect(mapStateToProps)(Runs);
