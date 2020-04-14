import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap/";
import { connect } from "react-redux";
import DefaultProfile from "./DefaultProfile";
import EditProfile from "./EditProfile";
import { userEdit, userDoneEdit } from "../../../redux/actions/authActions";

/* Profile container component, if state is editing renders edit component otherwise renders default */

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
      !this.props.isEdit ? (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col md="6" className="text-center">
              <h1 className="mt-3 mb-3">{this.props.name}'s Profile</h1>
              <DefaultProfile user={this.props.user} />
              <Button onClick={this.props.edit} className="mt-3">
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
              <EditProfile user={this.props.user} />
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

const mapActionsToProps = (dispatch) => {
  return {
    edit: () => {
      dispatch(userEdit());
    },
  };
};

const mapStateToProps = (state) => ({
  name: state.auth.user.userFName,
  isLoaded: state.auth.isLoaded,
  user: state.auth.user,
  isEdit: state.auth.isEditing,
});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
