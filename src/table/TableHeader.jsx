// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import th from "../locale/lang/th";

function getAllColumns(columns) {
  const result = [];
  columns.forEach((column) => {
    result.push(column);
    if (column.subColumns) {
      result.push(...getAllColumns(column.subColumns));
    }
  });
  return result;
}


function convertToRows(originColumns) {
  let maxLevel = 1;
  
  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.subColumns) {
      let colSpan = 0;
      column.subColumns.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  const rows = new Array(maxLevel).fill([]);

  const allColumns = getAllColumns(originColumns);

  allColumns.forEach((column) => {
    if (!column.subColumns) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
}

export default class TableHeader extends Component {
  render() {
    const { store, layout, ...props } = this.props;
    const columnRows = convertToRows(store.originColumns);

    return (
      <table
        className="el-table__header"
        style={{
          border: '0',
          borderCollapse: 'collapse'
        }}
      >
        <colgroup>
          {store.columns.map((column, index) => (
            <col
              style={{
                width: column.realWidth,
              }}
              key={index}
            />
          ))}
        </colgroup>
        <thead>
          {columnRows.map((columns, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, cellIndex) => (
                <th
                  colSpan={column.colSpan}
                  rowSpan={column.rowSpan}
                  className={this.className()}
                  key={cellIndex}
                >
                  <div className={this.className('cell')}>
                    {column.renderHeader ? column.renderHeader() : column.label}
                  </div>
                </th>
              ))}
              {!props.fixed && !!layout.gutterWidth && (
                <th
                  className="gutter"
                  style={{ width: layout.scrollY ? layout.gutterWidth + 'px' : '' }}
                />
              )}
            </tr>
          ))}
        </thead>
      </table>
    );
  }
}