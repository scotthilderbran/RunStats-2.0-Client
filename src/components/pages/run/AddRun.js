import React, { Component } from "react";
import { connect } from "react-redux";
import { addRun } from "../../../redux/actions/runActions";
import { ListGroup, Button } from "react-bootstrap/";

class AddRun extends Component {
  constructor(props) {
    super(props);
    this.state = { currDist: "", currTime: "" };
    this.handleDistChange = this.handleDistChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleDistChange(event) {
    this.setState({ currDist: event.target.value });
    console.log("Dist:");
    console.log(this.state.currDist);
  }
  handleTimeChange(event) {
    this.setState({ currTime: event.target.value });
    console.log("Time:");
    console.log(this.state.currTime);
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log("handle submit test");
    this.props.addRun(this.state.currDist, this.state.currTime);
  };
  render() {
    return (
      <ListGroup horizontal className="mt-2 mb-2 d-flex justify-content-center">
        <input
          onChange={this.handleDistChange}
          type="text"
          className="form-control"
          placeholder="Run Distance"
          value={this.state.currDist}
        />
        <input
          onChange={this.handleTimeChange}
          className="form-control"
          placeholder="Run Time"
          value={this.state.currTime}
        />

        <Button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </ListGroup>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    addRun: (currDist, currTime) => {
      console.log("Arone");
      dispatch(
        addRun({ runid: "99", distance: currDist, time: currTime, userid: 991 })
      );
    }
  };
};

export default connect(null, mapActionsToProps)(AddRun);
