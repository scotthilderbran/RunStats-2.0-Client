import React, { Component } from "react";
import { Form, Button } from "react-bootstrap/";
import { register } from "../../../redux/actions/authActions";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", fName: "", lName: "", sex: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("login");
    this.props.register(
      this.state.email,
      this.state.password,
      this.state.fName,
      this.state.lName,
      this.state.sex
    );
  };
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First name:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            name="fName"
            placeholder="First name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            name="lName"
            placeholder="First name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="male"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" href="/" className="">
          Create new account
        </Button>
      </Form>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    register: (email, password, fName, lName, sex) => {
      dispatch(register(email, password, fName, lName, sex));
    },
  };
};
export default connect(null, mapActionsToProps)(Register);
