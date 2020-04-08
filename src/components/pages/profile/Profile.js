import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap/";
import { connect } from "react-redux";
import DefaultProfile from "./DefaultProfile";
import EditProfile from "./EditProfile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  render() {
    return this.props.isLoaded ? (
      !this.state.isEditing ? (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col md="6" className="text-center">
              <h1 className="mt-3 mb-3">{this.props.name}'s Profile</h1>
              <DefaultProfile />
              <Button onClick={this.toggleEdit} className="mt-3">
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col md="6" className="text-center">
              <h1 className="mt-3 mb-3">{this.props.name}'s Profile</h1>
              <EditProfile toggle={this.toggleEdit} />
            </Col>
          </Row>
        </Container>
      )
    ) : (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1 className="mt-3 mb-3">Loading</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.auth.user.userFName,
  isLoaded: state.auth.isLoaded,
});

export default connect(mapStateToProps)(Profile);
