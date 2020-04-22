import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import ActionsFormatter from "./ActionsFormatter";
import RunAdd from "./RunAdd";
import RunEdit from "./RunEdit";
import { Button } from "react-bootstrap/";
import paginationFactory from "react-bootstrap-table2-paginator";
import { ErrAlert } from "../../helpercomponents/ErrAlert";

const actionsFormatter = (cell, row) => <ActionsFormatter id={row.id} />;

const columns = [
  {
    dataField: "note",
    text: "Notes",
  },
  {
    dataField: "time",
    text: "Time",
    sort: true,
  },
  {
    dataField: "distance",
    text: "Distance",
    sort: true,
  },
  {
    dataField: "date",
    text: "Date",
    sort: true,
  },
  {
    dataField: "actions",
    text: "Actions",
    isDummyField: true,
    csvExport: false,
    formatter: actionsFormatter,
  },
];

class RunContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isAdding: false };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  toggleAdd() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  render() {
    return this.props.isEdit ? (
      <div>
        <RunEdit toggle={this.toggleEdit} id={12} />
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
