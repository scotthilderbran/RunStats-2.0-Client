import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { connect } from "react-redux";
import { ErrAlert } from "../../helpercomponents/ErrAlert";
import { ImportSuccess } from "../../helpercomponents/ImportSuccess";
/**
 * Import component to render import page and link to Strava OAuth page
 */

class Import extends Component {
  render() {
    //Establish redirect uri for Strava OAuth page
    const redirectUri =
      process.env.NODE_ENV === "production" //If production enviroment use heroku url, otherwise use localhost for dev enviroment
        ? "https://runstats2-0.herokuapp.com/stravaResponse"
        : "http://localhost:3000/stravaResponse";
    const clientId = "40468";
    const authUri =
      "https://www.strava.com/oauth/authorize?client_id=" +
      clientId +
      "&response_type=code&redirect_uri=" +
      redirectUri +
      "&scope=activity:read_all" +
      "&approval_prompt=force";
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="8" className="text-center">
            <h1 className="mt-3 mb-3">Import Runs</h1>
            <p>
              This action will import all runs from strava that are not
              currently imported, please refresh after import.
            </p>
            <a href={authUri}>
              <img
                src={require("./btn_strava_connectwith_orange.png")}
                alt="Import runs from strava"
              />
            </a>
            <ErrAlert isErr={this.props.isErr} msg={this.props.errMsg} />
            <ImportSuccess isImported={this.props.isImported} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isErr: state.auth.error.isError,
  errMsg: state.auth.error.msg,
  isImported: state.run.isImported,
});

export default connect(mapStateToProps, null)(Import);
