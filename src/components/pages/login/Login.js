import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/authActions";
import { Container, Row, Col, Form, Button } from "react-bootstrap/";

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
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("login");
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center mt-4">
          <Col md="6" className="">
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
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button variant="primary" href="/" className="float-right">
                Create new account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    login: (currEmail, currPassword) => {
      console.log("logging in");
      dispatch(login({ email: currEmail, password: currPassword }));
    },
  };
};

export default connect(null, mapActionsToProps)(Login);
