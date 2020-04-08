import React, { Component } from "react";
import { Button } from "react-bootstrap/";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteRun, editRun } from "../../../redux/actions/runActions";
import { connect } from "react-redux";

class ActionsFormatter extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.delete(this.props.id);
  }
  handleEdit = (event) => {
    this.props.edit(true, this.props.id);
  };

  render() {
    return (
      <div>
        <Button variant="link" onClick={this.handleEdit}>
          <FaEdit />
        </Button>
        <Button className="ml-1" variant="link" onClick={this.handleDelete}>
          <FaTrashAlt />
        </Button>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    delete: (currID) => {
      dispatch(deleteRun(currID));
    },
    edit: (isEdit, currID) => {
      dispatch(editRun({ isEdit, currID }));
    },
  };
};

export default connect(null, mapActionsToProps)(ActionsFormatter);
