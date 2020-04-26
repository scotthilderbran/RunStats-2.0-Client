import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap/";

/**
 * Component to render default profile view (not Editing)
 */

export default class DefaultProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: this.props.user.userFName,
      lName: this.props.user.userLName,
      email: this.props.user.email,
      sex: this.props.user.sex,
      age: this.props.user.age,
    };
  }

  render() {
    const sex = this.props.user.sex ? "Male" : "Female"; //Establish sex string based of sex state boolean
    return (
      <div>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <b className="float-left">First Name:</b>
              <p className="float-right">{this.state.fName}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="float-left">Last Name:</b>
              <p className="float-right">{this.state.lName}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="float-left">Email:</b>
              <p className="float-right">{this.state.email}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="float-left">Sex:</b>
              <p className="float-right">{sex}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="float-left">Age:</b>
              <p className="float-right">{this.state.age}</p>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }
}
