import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import ActionsFormatter from "./ActionsFormatter";
import ImportTypeFormatter from "./ImportTypeFormatter";
import RunAdd from "./RunAdd";
import RunEdit from "./RunEdit";
import { Button } from "react-bootstrap/";
import paginationFactory from "react-bootstrap-table2-paginator";
import { ErrAlert } from "../../helpercomponents/ErrAlert";

const actionsFormatter = (cell, row) => <ActionsFormatter id={row.id} />;
const importTypeFormatter = (cell, row) => (
  <ImportTypeFormatter strava={row.strava_run_id} />
);

const columns = [
  {
    dataField: "note",
    text: "Notes",
    sort: true,
  },
  {
    dataField: "distance",
    text: "Distance (miles)",
    sort: true,
    headerStyle: { width: "180px", textAlign: "center" },
  },
  {
    dataField: "time",
    text: "Time (min)",
    sort: true,
    headerStyle: { width: "140px", textAlign: "center" },
  },
  {
    dataField: "date",
    text: "Date",
    sort: true,
    headerStyle: { width: "120px", textAlign: "center" },
  },
  {
    dataField: "strava_run_id",
    text: "Source",
    sort: true,
    formatter: importTypeFormatter,
    headerStyle: { width: "120px", textAlign: "center" },
  },
  {
    dataField: "actions",
    text: "Actions",
    isDummyField: true,
    csvExport: false,
    formatter: actionsFormatter,
    headerStyle: { width: "120px", textAlign: "center" },
  },
];

class RunContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isAdding: false };
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  toggleAdd() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  render() {
    console.log(this.props.isEditID);
    return this.props.isEdit ? (
      <div>
        <RunEdit runID={this.props.isEditID} />
        <BootstrapTable
          keyField="id"
          data={this.props.run}
          columns={columns}
          pagination={paginationFactory()}
        />
      </div>
    ) : this.state.isAdding ? (
      <div>
        <RunAdd toggle={this.toggleAdd} />
        <BootstrapTable
          keyField="id"
          data={this.props.run}
          columns={columns}
          pagination={paginationFactory()}
        />
      </div>
    ) : (
      <div>
        <ErrAlert isErr={this.props.isErr} msg={this.props.errMsg} />
        <Button variant="dark" className="mr-2 mb-2" onClick={this.toggleAdd}>
          Add Run
        </Button>
        <BootstrapTable
          keyField="id"
          data={this.props.run}
          columns={columns}
          pagination={paginationFactory()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  run: state.run.runs,
  isEdit: state.run.edit.isEdit,
  isEditID: state.run.edit.currID,
  isErr: state.run.error.isError,
  errMsg: state.run.error.msg,
});

export default connect(mapStateToProps)(RunContainer);
