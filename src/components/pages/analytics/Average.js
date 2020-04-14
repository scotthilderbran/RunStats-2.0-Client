import React, { Component } from "react";
import WeekAverage from "./average/WeekAverage";
import MonthAverage from "./average/MonthAverage";
import YearAverage from "./average/YearAverage";
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
    let selection = <WeekAverage toggle={this.handleToggle} />;
    if (this.state.choice === 2) {
      selection = <MonthAverage toggle={this.handleToggle} />;
    } else if (this.state.choice === 3) {
      selection = <YearAverage toggle={this.handleToggle} />;
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
