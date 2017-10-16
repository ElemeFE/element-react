// @flow
import * as React from 'react';
import throttle from 'throttle-debounce/throttle';
import { Component, PropTypes } from '../../libs';
import Checkbox from '../checkbox';
import FilterPannel from './FilterPannel';

import type {
  TableHeaderProps,
  _Column,
} from './Types';

const _document = (document: any);

function getAllColumns(columns: Array<_Column>): Array<_Column> {
  const result = [];
  columns.forEach((column) => {
    result.push(column);
    if (column.subColumns) {
      result.push(...getAllColumns(column.subColumns));
    }
  });
  return result;
}


function convertToRows(originColumns: Array<_Column>): Array<Array<_Column>> {
  let maxLevel = 1;
  
  function traverse(column: _Column, parent: ?_Column) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 1;
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
    layout: PropTypes.any,
    table: PropTypes.any,
  };

  constructor(props: TableHeaderProps) {
    super(props);

    ['handleHeaderClick', 'handleFilterClick', 'handleSortClick'].forEach((fn) => {
      this[fn] = throttle(300, this[fn])
    })
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

  handleMouseMove(column: _Column, event: SyntheticMouseEvent) {
    if (!column.resizable) return;
    if (column.subColumns && column.subColumns.length) return;

    if (!this.dragging && this.props.border) {
      let target: any = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      const rect = target.getBoundingClientRect();
      const bodyStyle = _document.body.style;
      if (rect.width > 12 && rect.right - event.pageX < 8) {
        bodyStyle.cursor = 'col-resize';
        this.draggingColumn = column;
      } else {
        bodyStyle.cursor = '';
        this.draggingColumn = null;
      }
    }
  }

  handleMouseDown(column: _Column, event: SyntheticMouseEvent) {
    if (this.draggingColumn) {
      this.dragging = true;

      const { table } = this.context;

      const { el: tableEl, resizeProxy } = table;
      const tableLeft = tableEl.getBoundingClientRect().left;
      let columnEl: Object = event.target;
      while (columnEl && columnEl.tagName !== 'TH') {
        columnEl = columnEl.parentNode;
      }
      const columnRect = columnEl.getBoundingClientRect();
      const minLeft = columnRect.left - tableLeft + 30;
      columnEl.classList.add('noclick');

      const startMouseLeft = event.clientX;
      const startLeft = columnRect.right - tableLeft;
      const startColumnLeft = columnRect.left - tableLeft;

      resizeProxy.style.visibility = 'visible';
      resizeProxy.style.left = startLeft + 'px';

      _document.onselectstart = () => false;
      _document.ondragstart = () => false;

      const handleMouseMove = (event: MouseEvent) => {
        const deltaLeft = event.clientX - startMouseLeft;
        const proxyLeft = startLeft + deltaLeft;

        resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
      };

      const handleMouseUp = () => {
        if (this.dragging) {
          const finalLeft = parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - startColumnLeft;
          column.width = column.realWidth = columnWidth;

          this.dragging = false;
          this.draggingColumn = null;

          _document.body.style.cursor = '';
          resizeProxy.style.visibility = 'hidden';
          _document.removeEventListener('mousemove', handleMouseMove);
          _document.removeEventListener('mouseup', handleMouseUp);
          _document.onselectstart = null;
          _document.ondragstart = null;
          setTimeout(() => {
            columnEl.classList.remove('noclick');
          });

          this.context.layout.scheduleLayout();
        }
      };

      _document.addEventListener('mousemove', handleMouseMove);
      _document.addEventListener('mouseup', handleMouseUp);
    }
  }

  handleHeaderClick(column: _Column, event: SyntheticEvent) {
    if (column.sortable && !column.filters) {
      this.handleSortClick(column, null, event);
    } else if (column.filters && !column.sortable) {
      this.handleFilterClick(column, event);
    }
  }

  handleSortClick(column: _Column, givenOrder: ?string, event: SyntheticEvent) {
    if (!event || !event.target) return;

    event.stopPropagation();
    event.nativeEvent && event.nativeEvent.stopImmediatePropagation();

    let target: Object = event.target;
    while (target && target.tagName !== 'TH') {
      target = target.parentNode;
    }
    if (target.classList.contains('noclick')) return;

    let order;
    if (givenOrder) {
      order = givenOrder;
    } else {
      const { sortColumn, sortOrder } = this.props.store;
      if (column === sortColumn) {
        if (!sortOrder) {
          order = 'ascending';
        } else {
          order = sortOrder === 'ascending' ? 'descending' : null;
        }
      } else {
        order = 'ascending';
      }
    }
    this.context.store.changeSortCondition(column, order);
  }

  handleFilterClick(column: _Column, event: SyntheticEvent) {
    if (event && event.target) {
      event.stopPropagation();
      event.nativeEvent && event.nativeEvent.stopImmediatePropagation();
    }

    this.context.store.toggleFilterOpened(column);
  }

  changeFilteredValue(column: _Column, value: any) {
    this.context.store.changeFilteredValue(column, value);
  }

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

  renderHeader(column: _Column): ?React.Node {
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
                    store.sortColumn === column && store.sortOrder,
                    column.headerAlign,
                    column.className,
                    column.labelClassName,
                    {
                      'is-hidden': rowIndex === 0 && this.isCellHidden(cellIndex, columns),
                      'is-leaf': !column.subColumns,
                      'is-sortable': column.sortable,
                    }
                  )}
                  onMouseMove={this.handleMouseMove.bind(this, column)}
                  onMouseDown={this.handleMouseDown.bind(this, column)}
                  onClick={this.handleHeaderClick.bind(this, column)}
                  key={cellIndex}
                >
                  <div className="cell">
                    {this.renderHeader(column)}
                    {column.sortable && (
                      <span
                        className="caret-wrapper"
                        onClick={this.handleSortClick.bind(this, column, null)}
                      >
                        <i
                          className="sort-caret ascending"
                          onClick={this.handleSortClick.bind(this, column, 'ascending')}
                        />
                        <i
                          className="sort-caret descending"
                          onClick={this.handleSortClick.bind(this, column, 'descending')}
                        />
                      </span>
                    )}
                    {column.filterable && (
                      <FilterPannel
                        visible={column.filterOpened}
                        multiple={column.filterMultiple}
                        filters={column.filters}
                        filteredValue={column.filteredValue}
                        onFilterChange={this.changeFilteredValue.bind(this, column)}
                        toggleFilter={this.handleFilterClick.bind(this, column)}
                      >
                        <span
                          className="el-table__column-filter-trigger"
                          onClick={this.handleFilterClick.bind(this, column)}
                        >
                          <i className={this.classNames('el-icon-arrow-down', { 'el-icon-arrow-up': column.filterOpened })} />
                        </span>
                      </FilterPannel>
                    )}
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