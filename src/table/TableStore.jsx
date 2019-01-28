// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import local from '../locale';

import TableLayout from './TableLayout';
import type {
  TableStoreProps,
  TableStoreState,
  Column,
  _Column
} from './Types';
import {
  deepCompare
} from './utils'

import normalizeColumns from './normalizeColumns';
import { getLeafColumns, getValueByPath, getColumns, convertToRows, getRowIdentity } from "./utils";

let tableIDSeed = 1;

function filterData(data, columns) {
  return columns.reduce((preData, column) => {
    const { filterable, filterMultiple, filteredValue, filterMethod } = column;
    if (filterable) {
      if (filterMultiple && Array.isArray(filteredValue) && filteredValue.length) {
        return preData.filter(_data => filteredValue.some(value => filterMethod(value, _data)))
      } else if (filteredValue) {
        return preData.filter(_data => filterMethod(filteredValue, _data));
      }
    }
    return preData;
  }, data);
}


export default class TableStore extends Component<TableStoreProps, TableStoreState> {
  static propTypes = {
    style: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stripe: PropTypes.bool,
    border: PropTypes.bool,
    fit: PropTypes.bool,
    showHeader: PropTypes.bool,
    highlightCurrentRow: PropTypes.bool,
    currentRowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
    rowClassName: PropTypes.func,
    rowStyle: PropTypes.func,
    rowKey: PropTypes.func,
    emptyText: PropTypes.string,
    defaultExpandAll: PropTypes.bool,
    expandRowKeys:PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    defaultSort: PropTypes.shape({ prop: PropTypes.string, order: PropTypes.oneOf(['ascending', 'descending']) }),
    tooltipEffect:PropTypes.oneOf(['dark', 'light']),
    showSummary: PropTypes.bool,
    sumText: PropTypes.string,
    summaryMethod: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectChange: PropTypes.func
  };

  static defaultProps = {
    data: [],
    showHeader: true,
    stripe: false,
    fit: true,
    emptyText: local.t('el.table.emptyText'),
    defaultExpandAll: false,
    highlightCurrentRow: false,
    showSummary: false,
    sumText: local.t('el.table.sumText'),
  };

  static childContextTypes = {
    store: PropTypes.any,
  };

  getChildContext(): Object {
    return {
      store: this,
    }
  }

  constructor(props: TableStoreProps) {
    super(props);

    this.state = {
      fixedColumns: null, // left fixed columns in _columns
      rightFixedColumns: null, // right fixed columns in _columns
      columnRows: null, // columns to render header
      columns: null, // contain only leaf column
      isComplex: null, // whether some column is fixed
      expandingRows: [],
      hoverRow: null,
      currentRow: null,
      selectable: null,
      selectedRows: null,
      sortOrder: null,
      sortColumn: null,
    };

    [
      'toggleRowSelection',
      'toggleAllSelection',
      'clearSelection',
      'setCurrentRow',
    ].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });

    this._isMounted = false;
  }

  componentWillMount() {
    this.updateColumns(getColumns(this.props));
    this.updateData(this.props);
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps: TableStoreProps) {
    const { data } = this.props;
    const nextColumns = getColumns(nextProps);

    if (getColumns(this.props) !== nextColumns) {
      this.updateColumns(nextColumns);
    }
    if (deepCompare(data,nextProps.data)){
      this.updateData(nextProps);
    }
  }

  get isAllSelected(): boolean {
    const { currentRowKey, rowKey } = this.props;
    const { selectedRows, data, selectable } = this.state;
    const selectableData = selectable ? data.filter((row, index) => selectable(row, index)) : data;

    if (!selectableData.length) {
      return false;
    }

    if (Array.isArray(currentRowKey)) {
      return selectableData.every(data => currentRowKey.includes(getRowIdentity(data, rowKey)));
    }

    return selectedRows && selectedRows.length === selectableData.length;
  }
  
  // shouldComponentUpdate(nextProps) {
  //   const propsKeys = Object.keys(this.props);
  //   const nextPropsKeys = Object.keys(nextProps);
  //
  //   if (propsKeys.length !== nextPropsKeys.length) {
  //     return true;
  //   }
  //   for (const key of propsKeys) {
  //     if (this.props[key] !== nextProps[key]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  updateColumns(columns: Array<Column>) {
    let _columns = normalizeColumns(columns, tableIDSeed++);

    const fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left');
    const rightFixedColumns = _columns.filter(column => column.fixed === 'right');

    let selectable;
    if (_columns[0] && _columns[0].type === 'selection') {
      selectable = _columns[0].selectable;
      if (fixedColumns.length && !_columns[0].fixed) {
        _columns[0].fixed = true;
        fixedColumns.unshift(_columns[0]);
      }
    }

    _columns = [].concat(fixedColumns, _columns.filter(column => !column.fixed), rightFixedColumns);

    this.setState(Object.assign(this.state || {}, {
      fixedColumns,
      rightFixedColumns,
      columnRows: convertToRows(_columns),
      columns: getLeafColumns(_columns),
      isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0,
      selectable
    }));
  }

  updateData(props: TableStoreProps) {
    const { data = [], defaultExpandAll, defaultSort } = props;
    const { columns } = this.state;
    const filteredData = filterData(data.slice(), columns);

    let { hoverRow, currentRow, selectedRows, expandingRows } = this.state;
    hoverRow = hoverRow && data.includes(hoverRow) ? hoverRow : null;
    currentRow = currentRow && data.includes(currentRow) ? currentRow : null;
    if (this._isMounted && data !== this.props.data && !columns[0].reserveSelection) {
      selectedRows = [];
    } else {
      selectedRows = selectedRows && selectedRows.filter(row => data.includes(row)) || [];
    }

    if (!this._isMounted) {
      expandingRows = defaultExpandAll ? data.slice() : [];
    } else {
      expandingRows = expandingRows.filter(row => data.includes(row));
    }

    this.setState(Object.assign(this.state, {
      data: filteredData,
      filteredData,
      hoverRow,
      currentRow,
      expandingRows,
      selectedRows,
    }));
    if ((!this._isMounted || data !== this.props.data) && defaultSort) {
      const { prop, order = 'ascending' } = defaultSort;
      const sortColumn = columns.find(column => column.property === prop);
      this.changeSortCondition(sortColumn, order, false);
    } else {
      this.changeSortCondition(null, null, false);
    }
  }

  setHoverRow(index: number) {
    if (!this.state.isComplex) return;
    this.setState({
      hoverRow: index
    });
  }

  toggleRowExpanded(row: Object, rowKey: string | number) {
    const { expandRowKeys } = this.props;
    let { expandingRows } = this.state;
    if (expandRowKeys) {
      const isRowExpanding = expandRowKeys.includes(rowKey);
      this.dispatchEvent('onExpand', row, !isRowExpanding);
      return;
    }

    expandingRows = expandingRows.slice();
    const rowIndex = expandingRows.indexOf(row);
    if (rowIndex > -1) {
      expandingRows.splice(rowIndex, 1);
    } else {
      expandingRows.push(row);
    }

    this.setState({
      expandingRows
    }, () => {
      this.dispatchEvent('onExpand', row, rowIndex === -1);
    });
  }

  isRowExpanding(row: Object, rowKey: string | number): boolean {
    const { expandRowKeys } = this.props;
    const { expandingRows } = this.state;

    if (expandRowKeys) {
      return expandRowKeys.includes(rowKey);
    }
    return expandingRows.includes(row);
  }

  setCurrentRow(row: Object) {
    const { currentRowKey, rowKey } = this.props;
    if (currentRowKey && !Array.isArray(currentRowKey)) {
      this.dispatchEvent('onCurrentChange', getRowIdentity(row, rowKey), currentRowKey);
      return;
    }

    const { currentRow: oldRow } = this.state;
    this.setState({
      currentRow: row
    }, () => {
      this.dispatchEvent('onCurrentChange', row, oldRow)
    });
  }

  toggleRowSelection(row: Object, isSelected?: boolean) {
    const { currentRowKey, rowKey } = this.props;

    if (Array.isArray(currentRowKey)) {
      const toggledRowKey = getRowIdentity(row, rowKey);
      const rowIndex = currentRowKey.indexOf(toggledRowKey);
      const newCurrentRowKey = currentRowKey.slice();

      if (isSelected !== undefined) {
        if (isSelected && rowIndex === -1) {
          newCurrentRowKey.push(toggledRowKey);
        } else if (!isSelected && rowIndex !== -1) {
          newCurrentRowKey.splice(rowIndex, 1);
        }
      } else {
        rowIndex === -1 ? newCurrentRowKey.push(toggledRowKey) : newCurrentRowKey.splice(rowIndex, 1)
      }

      this.dispatchEvent('onSelect', newCurrentRowKey, row);
      this.dispatchEvent('onSelectChange', newCurrentRowKey);
      return;
    }

    const selectedRows = this.state.selectedRows.slice();
    const rowIndex = selectedRows.indexOf(row);

    if (isSelected !== undefined) {
      if (isSelected) {
        rowIndex === -1 && selectedRows.push(row);
      } else {
        rowIndex !== -1 && selectedRows.splice(rowIndex, 1);
      }
    } else {
      rowIndex === -1 ? selectedRows.push(row) : selectedRows.splice(rowIndex, 1)
    }

    this.setState({
      selectedRows
    }, () => {
      this.dispatchEvent('onSelect', selectedRows, row);
      this.dispatchEvent('onSelectChange', selectedRows);
    });
  }

  toggleAllSelection() {
    const { currentRowKey, rowKey } = this.props;
    let { data, selectedRows, selectable } = this.state;

    const allSelectableRows = selectable ? data.filter((data, index) => selectable(data, index)) : data.slice();

    if (Array.isArray(currentRowKey)) {
      const newCurrentRowKey = this.isAllSelected ? [] : allSelectableRows.map(row => getRowIdentity(row, rowKey));
      this.dispatchEvent('onSelectAll', newCurrentRowKey);
      this.dispatchEvent('onSelectChange', newCurrentRowKey);
      return;
    }


    if (this.isAllSelected) {
      selectedRows = [];
    } else {
      selectedRows = allSelectableRows;
    }

    this.setState({
      selectedRows,
    }, () => {
      this.dispatchEvent('onSelectAll', selectedRows);
      this.dispatchEvent('onSelectChange', selectedRows);
    })
  }

  clearSelection() {
    const { currentRowKey } = this.props;
    if (Array.isArray(currentRowKey)) return;

    this.setState({
      selectedRows: [],
    });
  }

  isRowSelected(row: Object, rowKey: string | number): boolean {
    const { currentRowKey } = this.props;
    const { selectedRows } = this.state;

    if (Array.isArray(currentRowKey)) {
      return currentRowKey.includes(rowKey);
    }
    return selectedRows.includes(row);
  }

  changeSortCondition(column: ?_Column, order: ?string, shouldDispatchEvent?: boolean = true) { if (!column) ({ sortColumn: column, sortOrder: order } = this.state)

    const data = this.state.filteredData.slice();
    if (!column) {
      this.setState({
        data
      });
      return;
    }

    const { sortMethod, property, sortable } = column;
    let sortedData;
    if (!order || sortable === 'custom') {
      sortedData = data;
    } else if (sortable && sortable !== 'custom') {
      const flag = order === 'ascending' ? 1 : -1;
      if (sortMethod) {
        sortedData = data.sort((a, b) => sortMethod(a, b) ? flag : -flag);
      } else {
        sortedData = data.sort((a, b) => {
          const aVal = getValueByPath(a, property);
          const bVal = getValueByPath(b, property);
          return aVal === bVal ? 0 : aVal > bVal ? flag : -flag;
        });
      }
    }
    let sortSet = () => {
      shouldDispatchEvent && this.dispatchEvent('onSortChange', 
          column && order ? 
          { column, prop: column.property, order } : 
          { column: null, prop: null, order: null }
        )
    }
    if (sortable && sortable !== 'custom') {
      this.setState({
        sortColumn: column,
        sortOrder: order,
        data: sortedData,
      },sortSet());
    } else if (sortable && sortable === 'custom') {
      this.setState({
        sortColumn: column,
        sortOrder: order,
      },sortSet())
    }

  }

  toggleFilterOpened(column: _Column) {
    column.filterOpened = !column.filterOpened;
    this.forceUpdate();
  }

  changeFilteredValue(column: _Column, value: string | number) {
    column.filteredValue = value;
    const filteredData = filterData(this.props.data.slice(), this.state.columns);
    this.setState(Object.assign(this.state, {
      filteredData
    }), () => {
      this.dispatchEvent('onFilterChange', { [column.columnKey]: value })
    });
    this.changeSortCondition(null, null, false);
  }

  dispatchEvent(name: string, ...args: Array<any>) {
    const fn = this.props[name];
    fn && fn(...args);
  }

  render()  {
    const renderExpanded = (this.state.columns.find(column => column.type === 'expand') || {}).expandPannel;
    return (
      <TableLayout
        {...this.props}
        renderExpanded={renderExpanded}
        store={this.state}
      />
    )
  }
}
