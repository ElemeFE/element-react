// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import Checkbox from '../checkbox';
import Tag from '../tag';

import type {
  TableHeaderProps
} from './Types';

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

export default class TableHeader extends Component<TableHeaderProps> {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any
  };

  isCellHidden(index: number, columns: Array<Object>): boolean {
    const { fixed } = this.props;
    if (fixed === true || fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (fixed === 'right') {
      let before = 0;
      for (let i = 0; i < index; i++) {
        before += columns[i].colSpan;
      }
      return before < this.columnsCount - this.rightFixedCount;
    } else {
      return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
    }
  }

  get columnsCount(): number {
    return this.props.store.columns.length;
  }

  get leftFixedCount(): number {
    return this.props.store.fixedColumns.length;
  }

  get rightFixedCount(): number {
    return this.props.store.rightFixedColumns.length;
  }

  renderHeader(column: _Column): React.Element {
    const { type } = column;
    if (type === 'expand') {
      return '';
    }

    if (type === 'index') {
      return column.label || '#';
    }

    if (type === 'selection') {
      return (
        <Checkbox
          checked={this.context.store.isAllSelected}
          onChange={this.context.store.toggleAllSelection}
        />
      );
    }

    return column.renderHeader ? column.renderHeader(column) : column.label;
  }

  render() {
    const { store, layout, fixed } = this.props;
    const columnRows = convertToRows(store.originColumns);

    return (
      <table
        className="el-table__header"
        cellPadding={0}
        cellSpacing={0}
        style={this.style({
          borderSpacing: 0,
          border: 0
        })}
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
          {!fixed && (
            <col
              style={{ width: layout.scrollY ? layout.gutterWidth : 0 }}
            />
          )}
        </colgroup>
        <thead>
          {columnRows.map((columns, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, cellIndex) => (
                <th
                  colSpan={column.colSpan}
                  rowSpan={column.rowSpan}
                  className={this.className(
                    column.order,
                    column.headerAlign,
                    column.className,
                    column.labelClassName,
                    {
                      'is-hidden': rowIndex === 0 && this.isCellHidden(cellIndex, columns),
                      'is-leaf': !column.subColumns
                    }
                  )}
                  key={cellIndex}
                >
                  <div className="cell">
                    {this.renderHeader(column)}
                  </div>
                </th>
              ))}
              {!fixed && (
                <th
                  className="gutter"
                  style={{ width: layout.scrollY ? layout.gutterWidth : 0 }}
                />
              )}
            </tr>
          ))}
        </thead>
      </table>
    );
  }
}