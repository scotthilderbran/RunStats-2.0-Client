import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form, ListGroup, Radio } from "react-bootstrap/";
import { updateUser, loadUser } from "../../../redux/actions/authActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: this.props.user.userFName,
      lName: this.props.userFName,
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
    this.props.toggle();
  };
  render() {
    const sex = this.props.sex ? "Male" : "Female";
    return (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b className="float-left">First Name:</b>
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                type=""
                name="fName"
                defaultValue={this.props.user.userFName}
              />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <b className="float-left">Last Name:</b>
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                type=""
                name="lName"
                defaultValue={this.props.user.userLName}
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
                defaultValue={this.props.user.email}
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
                defaultChecked={this.props.user.sex}
              />
              <Form.Check
                inline
                onChange={this.handleSexChange}
                name="sex"
                type="radio"
                label="Female"
                defaultChecked={!this.props.user.sex}
              />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <b className="float-left">Age:</b>
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                type="email"
                name="age"
                defaultValue={this.props.user.age}
              />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button onClick={this.handleSubmit} className="mt-3">
              Submit Changes
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    update: (email, fName, lName, sex, age) => {
      dispatch(updateUser({ email, fName, lName, sex, age }));
      dispatch(loadUser());
    },
  };
};

/*
const mapStateToProps = (state) => ({
  fName: state.auth.user.userFName,
  lName: state.auth.user.userLName,
  email: state.auth.user.email,
  sex: state.auth.user.sex,
  age: state.auth.user.age,
  mapStateToProps
});
*/

export default connect(null, mapActionsToProps)(EditProfile);
