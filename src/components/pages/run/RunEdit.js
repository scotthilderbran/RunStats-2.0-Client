import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRun, editRunComplete } from "../../../redux/actions/runActions";
import { ListGroup, Button, Form } from "react-bootstrap/";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Component for editing individual runs, dispatches updateRun action on submit.
 * Reads editing state and ID from redux store instead of parent component due to the use of Action formatters.
 * Action formatter must be out of class in RunContainer and thus cant access RunContainer state.
 */

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
  }
  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };
  handleSubmit = (event) => {
    this.props.editRun(
      //Dispatch edit run
      this.props.id,
      this.state.note,
      this.state.dist,
      this.state.time,
      this.state.date
    );
    this.props.editRunComplete(); //Edit run complete
  };
  handleCancel = (event) => {
    this.props.editRunComplete(); //Cancel edit run
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
                placeholder="date"
              />
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="danger"
          className="mr-2 mb-2"
          onClick={this.handleCancel}
        >
          Cancel
        </Button>
        <Button variant="primary" className="ml-2 mb-2" type="submit">
          Save
        </Button>
      </Form>
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
