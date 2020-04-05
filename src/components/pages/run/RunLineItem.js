import React, { Component } from "react";
//import { deleteRun } from "../../../redux/actions/runActions";
import { connect } from "react-redux";
import { ListGroup, Button } from "react-bootstrap/";

class RunLineItem extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    //this.props.deleteRun(this.props.run.runid);
  }
  render() {
    console.log(this.props.run.runid);
    console.log("tester");
    return (
      <ListGroup horizontal className="mt-2 mb-2 d-flex justify-content-center">
        <ListGroup.Item className="w-100">
          ID: {this.props.run.id}
        </ListGroup.Item>
        <ListGroup.Item className="w-100">
          Distance: {this.props.run.distance}
        </ListGroup.Item>
        <ListGroup.Item className="w-100">
          Time: {this.props.run.time}
        </ListGroup.Item>
        <Button className="w-50" onClick={this.handleSubmit} variant="danger">
          Delete Run
        </Button>
      </ListGroup>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {};
};
export default connect(null, mapActionsToProps)(RunLineItem);
