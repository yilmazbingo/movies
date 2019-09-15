import React, { Component } from "react";

class TableHeader extends Component {
  // raiseSort=path=>{
  //     const sortedColumn={...this.props.sortColumn}
  //     if(sortedColumn.path===path) sortedColumn.order=sortedColumn.order==="asc" ? "desc" : "asc";
  //     else {
  //         sortedColumn.order="asc"
  //         sortedColumn.path=path
  //     }
  //     this.props.onSort(sortedColumn)
  // }
  raiseSort = path => {
    const sortedColumn = { ...this.props.sortColumn };
    if (sortedColumn.path === path)
      sortedColumn.order =
        this.props.sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }
    this.props.onSort(sortedColumn);
  };
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    return (
      <thead>
        <tr>
          <th>#</th>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
