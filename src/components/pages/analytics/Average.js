import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap/";

import WeekAverage from "./WeekAverage";

export default class Average extends Component {
  render() {
    return (
      <div>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1">Average of Past Week</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Average of Past Month</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Average of Past Year</Dropdown.Item>
        </DropdownButton>
        <WeekAverage className="mt-4" />
      </div>
    );
  }
}
