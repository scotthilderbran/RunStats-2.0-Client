import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, ListGroup } from "react-bootstrap/";
import { loadUser } from "../../../redux/actions/authActions";

class DefaultProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: this.props.fName,
      lName: this.props.lName,
      email: this.props.email,
      sex: this.props.sex,
      age: this.props.age,
    };
  }

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const sex = this.props.sex ? "Male" : "Female";
    return (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b className="float-left">First Name:</b>
            <p className="float-right">{this.props.fname}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <b className="float-left">Last Name:</b>
            <p className="float-right">{this.props.lname}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <b className="float-left">Email:</b>
            <p className="float-right">{this.props.email}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <b className="float-left">Sex:</b>
            <p className="float-right">{sex}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <b className="float-left">Age:</b>
            <p className="float-right">{this.props.age}</p>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  fname: state.auth.user.userFName,
  lname: state.auth.user.userLName,
  email: state.auth.user.email,
  sex: state.auth.user.sex,
  age: state.auth.user.age,
});

const mapActionsToProps = (dispatch) => {
  return {
    loadUser: () => {
      dispatch(loadUser());
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(DefaultProfile);
