import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRun, editRunComplete } from "../../../redux/actions/runActions";
import { ListGroup, Button } from "react-bootstrap/";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* Component for editing individual runs, calls dispatches updateRun action on submit */

class RunEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.run[0].note,
      dist: this.props.run[0].distance,
      time: this.props.run[0].time,
      date: new Date(
        this.props.run[0].date.substring(0, 4),
        this.props.run[0].date.substring(5, 7) - 1,
        this.props.run[0].date.substring(8, 10)
      ),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state);
  }
  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
    console.log(this.state);
  };
  handleSubmit = (event) => {
    this.props.editRun(
      this.props.id,
      this.state.note,
      this.state.dist,
      this.state.time,
      this.state.date
    );
    this.props.editRunComplete();
  };
  handleCancel = (event) => {
    this.props.editRunComplete();
  };
  render() {
    return (
      <div>
        <ListGroup
          horizontal="sm"
          className="mt-2 mb-2 d-flex justify-content-center"
        >
          <ListGroup.Item className="w-100">
            <label>Note: </label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              name="note"
              placeholder="Note"
              defaultValue={this.state.note}
            />
          </ListGroup.Item>
          <ListGroup.Item className="w-100">
            <label>Distance: </label>
            <input
              onChange={this.handleChange}
              className="form-control"
              name="dist"
              placeholder="Distance"
              defaultValue={this.state.dist}
            />
          </ListGroup.Item>
          <ListGroup.Item className="w-100">
            <label>Time: </label>
            <input
              onChange={this.handleChange}
              className="form-control"
              name="time"
              placeholder="Time (in minutes)"
              defaultValue={this.state.time}
            />
          </ListGroup.Item>
          <ListGroup.Item className="w-25">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              name="date"
              placeholder="Time (in minutes)"
            />
          </ListGroup.Item>
        </ListGroup>
        <Button variant="danger" className="mr-2" onClick={this.handleSubmit}>
          Cancel
        </Button>
        <Button variant="primary" className="ml-2" onClick={this.handleSubmit}>
          Save
        </Button>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    editRun: (id, note, distance, time, date) => {
      dispatch(updateRun({ id, note, distance, time, date }));
    },
    editRunComplete: () => {
      dispatch(editRunComplete());
    },
  };
};

const mapStateToProps = (state) => ({
  run: state.run.runs.filter((run) => {
    return run.id === state.run.edit.currID;
  }),
  id: state.run.edit.currID,
});

export default connect(mapStateToProps, mapActionsToProps)(RunEdit);
