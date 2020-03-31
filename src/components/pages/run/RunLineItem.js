import React, { Component } from "react";
import {deleteRun} from '../../../redux/action';
import { connect } from "react-redux";

class RunLineItem extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.deleteRun(this.props.run.runid);
  }
  render() {
    console.log(this.props.run.runid);
    console.log("tester");
    return (
      <div>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item">ID: {this.props.run.runid}</li>
          <li className="list-group-item">
            Distance: {this.props.run.distance}
          </li>
          <li className="list-group-item">Time: {this.props.run.time}</li>
          <button type="button" class="btn btn-danger" onClick={this.handleSubmit}>
            Delete
          </button>
        </ul>
      </div>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    deleteRun: (id) => {
      console.log("Arone");
      dispatch(deleteRun(id));
    }
  };
};

export default connect(null, mapActionsToProps)(RunLineItem);
