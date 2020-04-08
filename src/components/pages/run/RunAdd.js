import React, { Component } from "react";
import { connect } from "react-redux";
import { addRun } from "../../../redux/actions/runActions";
import { ListGroup, Button } from "react-bootstrap/";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RunAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { note: "", dist: "", time: "", date: new Date() };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.addRun(
      this.state.note,
      this.state.dist,
      this.state.time,
      this.state.date
    );
    this.props.toggle();
  };
  render() {
    return (
      <ListGroup horizontal className="mt-2 mb-2 d-flex justify-content-center">
        <ListGroup.Item className="w-100">
          <label>Note: </label>
          <input
            onChange={this.handleChange}
            type="text"
            className="form-control"
            name="note"
            placeholder="Note"
          />
        </ListGroup.Item>
        <ListGroup.Item className="w-100">
          <label>Distance: </label>
          <input
            onChange={this.handleChange}
            className="form-control"
            name="dist"
            placeholder="Distance"
          />
        </ListGroup.Item>
        <ListGroup.Item className="w-100">
          <label>Time: </label>
          <input
            onChange={this.handleChange}
            className="form-control"
            name="time"
            placeholder="Time (in minutes)"
          />
        </ListGroup.Item>
        <ListGroup.Item className="w-100">
          <label>Date: </label>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
            name="date"
            placeholder="Time (in minutes)"
          />
        </ListGroup.Item>
        <ListGroup.Item className="w-100">
          <label></label>
          <Button className="btn btn-primary mt-4" onClick={this.handleSubmit}>
            Submit
          </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addRun: (note, distance, time, date) => {
      console.log("Arone");
      dispatch(addRun({ note, distance, time, date }));
    },
  };
};

export default connect(null, mapActionsToProps)(RunAdd);
