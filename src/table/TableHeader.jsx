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

export default class TableHeader extends Component<TableHeaderProps> {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any,
    table: PropTypes.any,
  };

  constructor(props: TableHeaderProps) {
    super(props);

    ['handleHeaderClick', 'handleFilterClick', 'handleSortClick'].forEach((fn) => {
      this[fn] = throttle(300, true, this[fn])
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

      const handleMouseUp = (event: MouseEvent) => {
        if (this.dragging) {
          const finalLeft = parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - startColumnLeft;
          const oldWidth = column.realWidth;
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
          this.dispatchEvent('onHeaderDragEnd', columnWidth, oldWidth, column, event);
        }
      };

      _document.addEventListener('mousemove', handleMouseMove);
      _document.addEventListener('mouseup', handleMouseUp);
    }
  }

  handleMouseOut() {
    _document.body.style.cursor = "";
  }

  handleHeaderClick(column: _Column, event: SyntheticEvent) {
    if (column.sortable && !column.filters) {
      this.handleSortClick(column, null, event);
    } else if (column.filters && !column.sortable) {
      this.handleFilterClick(column, event);
    } else {
      this.dispatchEvent('onHeaderClick', column, event)
    }
  }

  handleSortClick(column: _Column, givenOrder: ?string, event: SyntheticEvent) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

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

    this.dispatchEvent('onHeaderClick', column, event)
  }

  handleFilterClick(column: _Column, event: SyntheticEvent) {
    if (event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }

    this.context.store.toggleFilterOpened(column);

    event && this.dispatchEvent('onHeaderClick', column, event)
  }

  dispatchEvent(name: string, ...args: Array<any>) {
    const fn = this.props[name];
    fn && fn(...args);
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
      return column.label || '';
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
            <col width={column.realWidth} style={{ width: column.realWidth }} key={index} />
          ))}
          {!fixed && (
            <col width={layout.scrollY ? layout.gutterWidth : 0} style={{ width: layout.scrollY ? layout.gutterWidth : 0 }} />
          )}
        </colgroup>
        <thead>
          {store.columnRows.map((columns, rowIndex) => (
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
                    column.columnKey,
                    {
                      'is-hidden': rowIndex === 0 && this.isCellHidden(cellIndex, columns),
                      'is-leaf': !column.subColumns,
                      'is-sortable': column.sortable,
                    }
                  )}
                  onMouseMove={this.handleMouseMove.bind(this, column)}
                  onMouseDown={this.handleMouseDown.bind(this, column)}
                  onMouseOut={this.handleMouseOut}
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
                        placement={column.filterPlacement}
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