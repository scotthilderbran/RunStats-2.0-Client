import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form, ListGroup } from "react-bootstrap/";
import { updateUser } from "../../../redux/actions/authActions";
import { ErrAlert } from "../../helpers/ErrAlert";

/* Edit profile component, allows users to enter and dispatches updateUser action on submit */

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: this.props.user.userFName,
      lName: this.props.user.userLName,
      email: this.props.user.email,
      sex: this.props.user.sex,
      age: this.props.user.age,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSexChange(event) {
    console.log("Sex state ");
    console.log(this.state.sex);
    this.setState({ sex: !this.state.sex }, () => {
      console.log(this.state.sex);
    });
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      this.state.email,
      this.state.fName,
      this.state.lName,
      this.state.sex,
      this.state.age
    );
    this.props.update(
      this.state.email,
      this.state.fName,
      this.state.lName,
      this.state.sex,
      this.state.age
    );
  };
  render() {
    const sex = this.props.sex ? "Male" : "Female";
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <b className="float-left">First Name:</b>
              <Form.Group>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  name="fName"
                  defaultValue={this.state.fName}
                />
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="float-left">Last Name:</b>
              <Form.Group>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  name="lName"
                  defaultValue={this.state.fName}
                />
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="float-left">Email:</b>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  defaultValue={this.state.email}
                />
              </Form.Group>
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
                  onChange={this.handleChange}
                  type="text"
                  name="age"
                  defaultValue={this.state.age}
                />
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="submit" className="mt-3">
                Submit Changes
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Form>
        <ErrAlert isErr={this.props.isErr} msg={this.props.errMsg} />
      </Card>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    update: (email, fName, lName, sex, age) => {
      dispatch(updateUser({ email, fName, lName, sex, age }));
    },
  };
};

const mapStateToProps = (state) => ({
  isErr: state.auth.error.isError,
  errMsg: state.auth.error.msg,
});

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
