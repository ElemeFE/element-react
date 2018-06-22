// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getValueByPath } from "./utils";
import Checkbox from '../checkbox';
import Tag from '../tag';

import type { TableFooterProps, _Column } from "./Types";
// import {toDate} from "../date-picker/utils/index";

export default class TableFooter extends Component<TableFooterProps> {
  isCellHidden(index: number, columns: Array<_Column>): boolean {
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

  render() {
    const { store, layout, fixed, summaryMethod, sumText } = this.props;
    const sums = summaryMethod ? summaryMethod(store.columns, store.data) : store.columns.map((column, index) => {
      if (index === 0) {
        return sumText;
      }
      const result = store.data.reduce((pre, data) => pre + parseFloat(getValueByPath(data, column.property)), 0);
      return isNaN(result) ? '' : result;
    });

    return (
      <table
        className="el-table__footer"
        cellSpacing="0"
        cellPadding="0"
        style={this.style({
          borderSpacing: 0,
          border: 0
        })}
      >
        <colgroup>
          {store.columns.map((column, index) => (
            <col width={column.realWidth} style={{ width: column.realWidth }} key={index} />
          ))}
          {!fixed && (
            <col width={layout.scrollY ? layout.gutterWidth : 0} style={{ width: layout.scrollY ? layout.gutterWidth : 0 }} />
          )}
        </colgroup>
        <tbody>
          <tr>
            {store.columns.map((column, index) => (
              <td
                key={index}
                colSpan={column.colSpan}
                rowSpan={column.rowSpan}
                className={this.className(
                  column.headerAlign,
                  column.className,
                  column.labelClassName,
                  column.columnKey,
                  {
                    'is-hidden': this.isCellHidden(index, store.columns),
                    'is-leaf': !column.subColumns
                  }
                )}
              >
                <div className="cell">
                  {sums[index]}
                </div>
              </td>
            ))}
            {!fixed && (
              <td
                className="gutter"
                style={{ width: layout.scrollY ? layout.gutterWidth : 0 }}
              />
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}