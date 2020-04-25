import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/authActions";
import { Container, Row, Col, Form, Button } from "react-bootstrap/";
import { ErrAlert } from "../../helpercomponents/ErrAlert";

/**
 * Login component renders login page
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
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
    this.props.login(this.state.email, this.state.password);
  };
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center mt-4">
          <Col md="6" className="">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="primary" href="/" className="float-right">
                Create new account
              </Button>
              <ErrAlert isErr={this.props.isErr} msg={this.props.errMsg} />
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login({ email: email, password: password }));
    },
  };
};

const mapStateToProps = (state) => ({
  isErr: state.auth.error.isError,
  errMsg: state.auth.error.msg,
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
