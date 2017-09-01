// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getRowIdentity, getValueByPath } from "./utils";
import {toDate} from "../date-picker/utils/index";


export default class TableBody extends Component {
  isColumnHidden(index) {
    const { store, layout, ...props } = this.props;
    if (props.fixed === true || props.fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (props.fixed === 'right') {
      return index < this.columnsCount - this.rightFixedCount;
    } else {
      return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
    }
  }

  getRowStyle(row, index) {
    const { rowStyle } = this.props;
    if (typeof rowStyle === 'function') {
      return rowStyle.call(null, row, index);
    }

    return rowStyle;
  }

  getKeyOfRow(row, index) {
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

  get columnsCount() {
    return this.props.store.columns.length;
  }

  get leftFixedCount() {
    return this.props.store.fixedColumns.length;
  }

  get rightFixedCount() {
    return this.props.store.rightFixedColumns.length;
  }

  render() {
    const { store, layout, ...props } = this.props;
    const columnsHidden = store.columns.map((column, index) => this.isColumnHidden(index));
    return (
      <table
        className="el-table__body"
        style={{
          borderCollapse: 'collapse',
          border: 0
        }}
      >
        <colgroup>
          {store.columns.map((column, index) => (
            <col style={{ width: column.realWidth }} key={index} />
          ))}
        </colgroup>
        <tbody>
        {store.data.map((row, rowIndex) => (
          <tr
            key={props.rowKey ? this.getKeyOfRow(row, rowIndex) : rowIndex}
            style={props.rowStyle ? this.getRowStyle(row, rowIndex) : null}
            className={this.className('el-table__row', {
              'el-table__row--striped': props.stripe && rowIndex % 2 === 1
            }, typeof props.rowClassName === 'string'
              ? props.rowClassName
              : typeof props.rowClassName === 'function'
              && props.rowClassName(row, rowIndex))}
          >
            {store.columns.map((column, cellIndex) => (
              <td
                key={cellIndex}
                className={this.className(column.className || '', {
                  'is-hidden': columnsHidden[cellIndex]
                })}
              >
                {column.render(getValueByPath(row, column.property), row, rowIndex)}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}