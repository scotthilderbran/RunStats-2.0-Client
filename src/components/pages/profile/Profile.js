import React, { Component } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap/";
import { connect } from "react-redux";
import DefaultProfile from "./DefaultProfile";
import EditProfile from "./EditProfile";
import { authCheck } from "../../../redux/actions/authActions";

/**
 * Profile container component, if state isEditing = false then render default component, if isEditing = true then render editing component
 */

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    //Toggle editing state, function is passed down to EditProfile component to toggle state in Profile component
    this.setState({ isEditing: !this.state.isEditing });
  }
  render() {
    this.props.authCheck();
    return this.props.isLoaded ? (
      !this.state.isEditing ? (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col md="6" className="text-center">
              <h1 className="mt-3 mb-3">{this.props.name}'s Profile</h1>
              <DefaultProfile user={this.props.user} />
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
              <EditProfile user={this.props.user} toggle={this.toggleEdit} />
            </Col>
          </Row>
        </Container>
      )
    ) : (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <Spinner animation="border" variant="dark" className="mt-3" />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    authCheck: () => {
      dispatch(authCheck());
    },
  };
};

const mapStateToProps = (state) => ({
  name: state.auth.user.userFName,
  isLoaded: state.auth.isLoaded,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
