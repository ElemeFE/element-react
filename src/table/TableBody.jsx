// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getRowIdentity, getValueByPath } from "./utils";
import {toDate} from "../date-picker/utils/index";

import { TableBodyProps } from "./Types";

export default class TableBody extends Component<TableBodyProps> {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any,
  };

  constructor(props) {
    super(props);
    ['handleMouseLeave'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  handleMouseEnter(index) {
    this.context.store.setHoverRow(index);
  }

  handleMouseLeave() {
    this.context.store.setHoverRow(null);
  }

  isColumnHidden(index: number): boolean {
    const { store, layout, ...props } = this.props;
    if (props.fixed === true || props.fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (props.fixed === 'right') {
      return index < this.columnsCount - this.rightFixedCount;
    } else {
      return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
    }
  }

  getRowStyle(row: Object, index: number): Object {
    const { rowStyle } = this.props;
    if (typeof rowStyle === 'function') {
      return rowStyle.call(null, row, index);
    }

    return rowStyle;
  }

  getKeyOfRow(row: Object, index: number): number | string {
    const { rowKey } = this.props;
    if (rowKey) {
      return getRowIdentity(row, rowKey);
    }

    return index;
  }

  // getRowClass(row, index) {
  //   const { rowClassName, stripe } = this.props;
  //
  // }

  get columnsCount(): number {
    return this.props.store.columns.length;
  }

  get leftFixedCount(): number {
    return this.props.store.fixedColumns.length;
  }

  get rightFixedCount(): number {
    return this.props.store.rightFixedColumns.length;
  }

  handleExpandClick(row, rowKey) {
    this.context.store.toggleRowExpanded(row, rowKey);
  }

  handleClick(row) {
    this.context.store.setCurrentRow(row);
  }

  renderCell(row, column, index, rowKey) {
    const { type } = column;
    if (type === 'expand') {
      return (
        <div
          className={this.classNames('el-table__expand-icon ', {
            'el-table__expand-icon--expanded': this.context.store.isRowExpanding(row, rowKey)
          })}
          onClick={this.handleExpandClick.bind(this, row, rowKey)}
        >
          <i className="el-icon el-icon-arrow-right" />
        </div>
      )
    }

    return column.render(row, column, index);
  }

  render() {
    const { store, layout, ...props } = this.props;
    const columnsHidden = store.columns.map((column, index) => this.isColumnHidden(index));
    return (
      <table
        className="el-table__body"
        cellPadding={0}
        cellSpacing={0}
        style={this.style({
          borderSpacing: 0,
          border: 0
        })}
      >
        <colgroup>
          {store.columns.map((column, index) => (
            <col style={{ width: column.realWidth }} key={index} />
          ))}
        </colgroup>
        <tbody>
        {store.data.map((row, rowIndex) => {
          const rowKey = this.getKeyOfRow(row, rowIndex);
          return [(
            <tr
              key={rowKey}
              style={this.getRowStyle(row, rowIndex)}
              className={this.className('el-table__row', {
                'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
                'hover-row': store.hoverRow === rowIndex,
                'current-row': props.highlightCurrentRow && (props.currentRowKey === rowKey || store.currentRow === row)
              }, typeof props.rowClassName === 'string'
                ? props.rowClassName
                : typeof props.rowClassName === 'function'
                && props.rowClassName(row, rowIndex))}
              onMouseEnter={this.handleMouseEnter.bind(this, rowIndex)}
              onMouseLeave={this.handleMouseLeave}
              onClick={this.handleClick.bind(this, row)}
            >
              {store.columns.map((column, cellIndex) => (
                <td
                  key={cellIndex}
                  className={this.className(column.className || '', column.align, {
                    'is-hidden': columnsHidden[cellIndex]
                  })}
                >
                  <div className="cell">{this.renderCell(row, column, rowIndex, rowKey)}</div>
                </td>
              ))}
              {!props.fixed && layout.scrollY && layout.gutterWidth && (
                <td className="gutter" />
              )}
            </tr>
          ), this.context.store.isRowExpanding(row, rowKey) && (
            <tr>
              <td
                colSpan={store.columns.length}
                className="el-table__expanded-cell"
              >
                {typeof props.renderExpanded === 'function' && props.renderExpanded(row, rowIndex)}
              </td>
            </tr>
          )];
        })}
        </tbody>
      </table>
    );
  }
}