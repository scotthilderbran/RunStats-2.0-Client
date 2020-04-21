import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import ActionsFormatter from "./ActionsFormatter";
import RunAdd from "./RunAdd";
import RunEdit from "./RunEdit";
import { Button } from "react-bootstrap/";
import paginationFactory from "react-bootstrap-table2-paginator";

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
        <BootstrapTable
          keyField="id"
          data={this.props.run}
          columns={columns}
          pagination={paginationFactory()}
        />
        <RunEdit toggle={this.toggleEdit} id={12} />
      </div>
    ) : this.state.isAdding ? (
      <div>
        <BootstrapTable
          keyField="id"
          data={this.props.run}
          columns={columns}
          pagination={paginationFactory()}
        />
        <RunAdd toggle={this.toggleAdd} />
      </div>
    ) : (
      <div>
        <BootstrapTable
          keyField="id"
          data={this.props.run}
          columns={columns}
          pagination={paginationFactory()}
        />
        <Button variant="danger" className="mr-2" onClick={this.toggleAdd}>
          Add Run
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  run: state.run.runs,
  isEdit: state.run.edit.isEdit,
  isEditID: state.run.edit.currID,
});

export default connect(mapStateToProps)(RunContainer);
