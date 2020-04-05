import React, { Component } from "react";
import { connect } from "react-redux";
import RunLineItem from "./RunLineItem";
import AddRun from "./AddRun";

import { Container, Row, Col } from "react-bootstrap/";

class RunContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Aroneeeee");
    console.log(this.props.run);
    const runs = this.props.run.map((run) => (
      <RunLineItem key={run.id} run={run} />
    ));
    return <div>{runs}</div>;
  }
}

const mapStateToProps = (state) => ({
  run: state.run.runs,
});

export default connect(mapStateToProps)(RunContainer);
