import React, { Component } from "react";
import { Form, Button } from "react-bootstrap/";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePassChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log("login");
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleEmailChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handlePassChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    login: (currEmail, currPassword) => {
      console.log("logging in");
      dispatch(login({ email: currEmail, password: currPassword }));
    }
  };
};

export default connect(null, mapActionsToProps)(Login);
