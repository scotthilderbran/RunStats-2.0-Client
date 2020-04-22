import React, { Component } from "react";
import WeekPrediction from "./prediction/WeekPrediction";
import MonthPrediction from "./prediction/MonthPrediction";
import YearPrediction from "./prediction/YearPrediction";
import AllPrediction from "./prediction/AllPrediction";
import { connect } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap/";

class Average extends Component {
  constructor(props) {
    super(props);
    this.state = { choice: 1 };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(val) {
    this.setState({ choice: val });
  }

  render() {
    let selection = <WeekPrediction toggle={this.handleToggle} />;
    if (this.state.choice === 2) {
      selection = <MonthPrediction toggle={this.handleToggle} />;
    } else if (this.state.choice === 3) {
      selection = <YearPrediction toggle={this.handleToggle} />;
    } else if (this.state.choice === 4) {
      selection = <AllPrediction toggle={this.handleToggle} />;
    }
    return this.props.loaded ? (
      selection
    ) : (
      <Container fluid>
        <Row className="justify-content-md-center ">
          <Col md="6" className="text-center">
            <Spinner animation="border" variant="dark" className="mt-3" />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loaded: state.run.isLoaded,
});

export default connect(mapStateToProps)(Average);
