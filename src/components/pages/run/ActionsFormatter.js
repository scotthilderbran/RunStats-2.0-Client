import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap/";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  deleteRun,
  editRun,
  editRunComplete,
} from "../../../redux/actions/runActions";

/**
 * ActionFormatter binds react-bootstrap table column to icon buttons of edit and delete
 */

class ActionsFormatter extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(event) {
    //Handle run deletion
    event.preventDefault();
    this.props.delete(this.props.id);
    this.props.editRunComplete(); //Prevents glitch of deleting run currently being edited
  }
  handleEdit = (event) => {
    //Handle run editing
    this.props.edit(true, this.props.id);
    window.scrollTo(0, document.body.scrollHeight); //Scroll to top of page
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
    editRunComplete: () => {
      dispatch(editRunComplete());
    },
  };
};

export default connect(null, mapActionsToProps)(ActionsFormatter);
