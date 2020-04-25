import React, { Component } from "react";
import { connect } from "react-redux";
import { addRun } from "../../../redux/actions/runActions";
import { ListGroup, Button, Form } from "react-bootstrap/";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * RunAdd component renders add run field and dispatchs add run on submission
 */

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
  }
  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
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
      <Form onSubmit={this.handleSubmit}>
        <ListGroup
          horizontal="sm"
          className="mt-2 mb-2 d-flex justify-content-center"
        >
          <ListGroup.Item className="w-100">
            <Form.Group>
              <label>Note: </label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                name="note"
                defaultValue={this.state.note}
              />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item className="w-100">
            <Form.Group>
              <label>Distance: </label>
              <Form.Control
                required
                onChange={this.handleChange}
                type="number"
                name="dist"
                defaultValue={this.state.dist}
              />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item className="w-100">
            <Form.Group>
              <label>Time: </label>
              <Form.Control
                required
                onChange={this.handleChange}
                type="number"
                name="time"
                defaultValue={this.state.time}
              />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item className="w-25">
            <Form.Group>
              <label>Date: </label>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
                name="date"
                placeholder="Time (in minutes)"
              />
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
        <Button variant="primary" className="ml-2 mb-2" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addRun: (note, distance, time, date) => {
      dispatch(addRun({ note, distance, time, date }));
    },
  };
};

export default connect(null, mapActionsToProps)(RunAdd);
