// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getRowIdentity, getValueByPath } from "./utils";
// import {toDate} from "../date-picker/utils/index";

import Checkbox from '../checkbox';
import Tag from '../tag';

import type {_Column, TableBodyProps} from "./Types";

export default class TableBody extends Component<TableBodyProps> {
  static contextTypes = {
    tableStore: PropTypes.any,
    layout: PropTypes.any,
  };

  constructor(props: TableBodyProps) {
    super(props);
    ['handleMouseLeave'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  handleMouseEnter(index: number) {
    this.context.tableStore.setHoverRow(index);
  }

  handleMouseLeave() {
    this.context.tableStore.setHoverRow(null);
  }

  handleCellMouseEnter(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event)
  }

  handleCellMouseLeave(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event)
  }

  handleCellClick(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellClick', row, column, event.currentTarget, event)
    this.dispatchEvent('onRowClick', row, event, column);
  }

  handleCellDbClick(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event)
    this.dispatchEvent('onRowDbClick', row, column)
  }

  handleRowContextMenu(row: Object, event: SyntheticEvent<HTMLTableRowElement>) {
    this.dispatchEvent('onRowContextMenu', row, event)
  }

  dispatchEvent(name: string, ...args: Array<any>) {
    const fn = this.props[name];
    fn && fn(...args);
  }

  isColumnHidden(index: number): boolean {
    const { tableStoreState, layout, ...props } = this.props;
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
    return this.props.tableStoreState.columns.length;
  }

  get leftFixedCount(): number {
    return this.props.tableStoreState.fixedColumns.length;
  }

  get rightFixedCount(): number {
    return this.props.tableStoreState.rightFixedColumns.length;
  }

  handleExpandClick(row: Object, rowKey: string | number) {
    this.context.tableStore.toggleRowExpanded(row, rowKey);
  }

  handleClick(row: Object) {
    this.context.tableStore.setCurrentRow(row);
  }

  renderCell(row: Object, column: _Column, index: number, rowKey: string | number): React.DOM {
    const { type, selectable } = column;
    if (type === 'expand') {
      return (
        <div
          className={this.classNames('el-table__expand-icon ', {
            'el-table__expand-icon--expanded': this.context.tableStore.isRowExpanding(row, rowKey)
          })}
          onClick={this.handleExpandClick.bind(this, row, rowKey)}
        >
          <i className="el-icon el-icon-arrow-right" />
        </div>
      )
    }

    if (type === 'index') {
      return <div>{index + 1}</div>;
    }

    if (type === 'selection') {
      const isSelected = this.context.tableStore.isRowSelected(row, rowKey);
      return (
        <Checkbox
          checked={isSelected}
          disabled={selectable && !selectable(row, index)}
          onChange={() => { this.context.tableStore.toggleRowSelection(row, !isSelected); }}
        />
      )
    }

    return column.render(row, column, index);
  }

  render() {
    const { tableStoreState, layout, ...props } = this.props;
    const columnsHidden = tableStoreState.columns.map((column, index) => this.isColumnHidden(index));
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
          {tableStoreState.columns.map((column, index) => (
            <col width={column.realWidth} style={{ width: column.realWidth }} key={index} />
          ))}
        </colgroup>
        <tbody>
          {tableStoreState.data.map((row, rowIndex) => {
            const rowKey = this.getKeyOfRow(row, rowIndex);
            return [(
              <tr
                key={rowKey}
                style={this.getRowStyle(row, rowIndex)}
                className={this.className('el-table__row', {
                  'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
                  'hover-row': tableStoreState.hoverRow === rowIndex,
                  'current-row': props.highlightCurrentRow && (props.currentRowKey === rowKey || tableStoreState.currentRow === row)
                }, typeof props.rowClassName === 'string'
                  ? props.rowClassName
                  : typeof props.rowClassName === 'function'
                  && props.rowClassName(row, rowIndex))}
                onMouseEnter={this.handleMouseEnter.bind(this, rowIndex)}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick.bind(this, row)}
                onContextMenu={this.handleRowContextMenu.bind(this, row)}
              >
                {tableStoreState.columns.map((column, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={this.classNames(column.className, column.align, column.columnKey, {
                      'is-hidden': columnsHidden[cellIndex]
                    })}
                    onMouseEnter={this.handleCellMouseEnter.bind(this, row, column)}
                    onMouseLeave={this.handleCellMouseLeave.bind(this, row, column)}
                    onClick={this.handleCellClick.bind(this, row, column)}
                    onDoubleClick={this.handleCellDbClick.bind(this, row, column)}
                  >
                    <div className="cell">{this.renderCell(row, column, rowIndex, rowKey)}</div>
                  </td>
                ))}
                {!props.fixed && layout.scrollY && !!layout.gutterWidth && (
                  <td className="gutter" />
                )}
              </tr>
            ), this.context.tableStore.isRowExpanding(row, rowKey) && (
              <tr key={`${rowKey}Expanded`}>
                <td
                  colSpan={tableStoreState.columns.length}
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
