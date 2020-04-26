import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap/";
import { register } from "../../../redux/actions/authActions";
import { connect } from "react-redux";
import { ErrAlert } from "../../helpercomponents/ErrAlert";

/**
 * Registration component renders registration field and dispatches register action on submission.
 * Uses react bootstrap formgroup to validate input
 */

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fName: "",
      lName: "",
      sex: true,
      age: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  }
  handleSexChange(event) {
    this.setState({ sex: !this.state.sex });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.register(
      this.state.email,
      this.state.password,
      this.state.fName,
      this.state.lName,
      this.state.sex,
      this.state.age
    );
  }
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="12" className="text-center">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b className="float-left">First Name:</b>
                    <Form.Group>
                      <Form.Control
                        required
                        onChange={this.handleChange}
                        type=""
                        name="fName"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b className="float-left">Last Name:</b>
                    <Form.Group>
                      <Form.Control
                        required
                        onChange={this.handleChange}
                        type=""
                        name="lName"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b className="float-left">Email:</b>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        required
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b className="float-left">Password:</b>
                    <Form.Control
                      onChange={this.handleChange}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b className="float-left">Sex:</b>
                    <Form.Group>
                      <Form.Check
                        inline
                        onChange={this.handleSexChange}
                        name="sex"
                        type="radio"
                        label="Male"
                        defaultChecked={this.state.sex}
                      />
                      <Form.Check
                        inline
                        onChange={this.handleSexChange}
                        name="sex"
                        type="radio"
                        label="Female"
                        defaultChecked={!this.state.sex}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b className="float-left">Age:</b>
                    <Form.Group>
                      <Form.Control
                        required
                        onChange={this.handleChange}
                        type="number"
                        name="age"
                        step="any"
                        max="120"
                        min="1"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="mt-3" type="submit">
                      Create Account
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Form>
            </Card>
            <ErrAlert isErr={this.props.isErr} msg={this.props.errMsg} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    register: (email, password, fName, lName, sex, age) => {
      dispatch(register({ email, password, fName, lName, sex, age }));
    },
  };
};

const mapStateToProps = (state) => ({
  isErr: state.auth.error.isError,
  errMsg: state.auth.error.msg,
});

export default connect(mapStateToProps, mapActionsToProps)(Register);
