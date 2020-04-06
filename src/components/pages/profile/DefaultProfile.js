import React, { Component } from "react";
import { connect } from "react-redux";

class DefaultProfile extends Component {
  render() {
    return <H1>Error</H1>;
  }
}

export default connect(mapStateToProps)(DefaultProfile);
