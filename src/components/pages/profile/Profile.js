import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6" className="text-center">
            <h1 className="mt-3 mb-3">{this.props.name}'s Profile</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.auth.user.userFName,
  isLoading: state.auth.isLoading,
  isRunsLoaded: state.run.isLoaded,
});

export default connect(mapStateToProps)(Profile);
