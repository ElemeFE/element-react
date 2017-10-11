// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';

import TableLayout from './TableLayout';
import type {
  TableStoreProps,
  TableStoreState,
  Column,
} from './Types';
import normalizeColumns from './normalizeColumns';
import { flattenColumns, getValueByPath } from "./utils";


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
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    emptyText: '暂无数据',
    defaultExpandAll: false,
    highlightCurrentRow: false,
    showSummary: false,
    sumText: '合计',
  };

  static childContextTypes = {
    store: PropTypes.any,
  };

  getChildContext(): Object {
    return {
      store: this,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      _columns: null, // transformed columns props
      fixedColumns: null, // left fixed columns from _columns
      rightFixedColumns: null, // right fixed columns from _columns
      originColumns: null, // _columns sorted by 'fixed'
      columns: null, // contain only leaf column
      isComplex: null, // has fixed column
      expandingRows: [], // expanding rows
      hoverRow: null,
      rowKey: props.rowKey,
      defaultExpandAll: props.defaultExpandAll,
      currentRow: null,
      // selectable: null,
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
  }

  componentWillMount() {
    // const { columns, data, defaultExpandALl } = this.props;
    this.updateColumns(this.props);
    this.updateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { columns, data, highlightCurrentRow, currentRowKey } = this.props;
    if (columns !== nextProps.columns) {
      this.updateColumns(nextProps.columns);
    }

    if (data !== nextProps.data) {
      this.updateData(nextProps);
    }

  }

  get isAllSelected(): boolean {
    const { currentRowKey } = this.props;
    const { selectedRows, data } = this.state;

    if (Array.isArray(currentRowKey)) {
      return currentRowKey.length === data.length;
    }
    return selectedRows.length === data.length;
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

  updateColumns(props) {
    const { columns } = props;
    const _columns = normalizeColumns(columns);
    let selectable = false;

    const fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left');
    const rightFixedColumns = _columns.filter(column => column.fixed === 'right');
    const originColumns = [].concat(fixedColumns, _columns.filter(column => !column.fixed), rightFixedColumns);

    if (_columns[0] && _columns[0].type === 'selection') {
      selectable = true;
      if (fixedColumns.length && !_columns[0].fixed) {
        _columns[0].fixed = true;
      }
    }

    this.setState(Object.assign(this.state || {}, {
      _columns,
      fixedColumns,
      rightFixedColumns,
      originColumns,
      columns: flattenColumns(_columns),
      isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0,
      selectable
    }));
  }

  updateData(props) {
    // todo more
    const { data, defaultExpandAll, defaultSort} = props;
    const filteredData = filterData(data.slice(), this.state.columns);

    // do filter when data changed, clear hover, select and expanding status
    this.setState(Object.assign(this.state, {
      data: filteredData,
      filteredData,
      hoverRow: null,
      currentRow: null,
      selectedRows: [],
      expandingRows: defaultExpandAll ? data.slice() : [],
    }));

    if (defaultSort) {
      const { prop, order = 'ascending' } = defaultSort;
      const { columns } = this.state;
      const sortColumn = columns.find(column => column.property === prop);
      this.changeSortCondition(sortColumn, order);
    }
  }

  setHoverRow(index: number) {
    if (!this.state.isComplex) return;
    // todo optimize
    // clearTimeout(this.clearHoverTimer);
    // if (index === null) {
    //   this.clearHoverTimer = setTimeout(() => {
    //     this.setState({
    //       hoverRow: index
    //     });
    //   }, 300);
    //   return;
    // }
    this.setState({
      hoverRow: index
    });
  }

  toggleRowExpanded(row: Object, rowKey: string | number) {
    const { expand, expandRowKeys } = this.props;
    let { expandingRows } = this.state;
    if (expandRowKeys) { // controlled expanding status
      const isRowExpanding = expandRowKeys.includes(rowKey);
      expand && expand(row, !isRowExpanding);
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
      expand && expand(row, rowIndex === -1);
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
    const { highlightCurrentRow, currentRowKey, onCurrentChange } = this.props;
    if (!highlightCurrentRow || currentRowKey) return;

    const { currentRow: oldRow } = this.state;
    this.setState({
      currentRow: row
    }, () => {
      onCurrentChange && onCurrentChange(row, oldRow);
    });
  }

  toggleRowSelection(row, isSelected) {
    const { currentRowKey, onSelect, onSelectChange } = this.props;
    // const { selectable } = this.state;

    if (Array.isArray(currentRowKey)) return;

    const selectedRows = this.state.selectedRows.slice();
    if (isSelected) {
      selectedRows.push(row);
    } else {
      const rowIndex = selectedRows.indexOf(row);
      selectedRows.splice(rowIndex, 1);
    }

    this.setState({
      selectedRows
    }, () => {
      onSelect && onSelect(selectedRows, row);
      onSelectChange && onSelectChange(selectedRows);
    });
  }

  toggleAllSelection() {
    const { currentRowKey, onSelectAll, onSelectChange } = this.props;
    if (Array.isArray(currentRowKey)) return;

    let selectedRows = this.state.selectedRows.slice();
    if (this.isAllSelected) {
      selectedRows = [];
    } else {
      selectedRows = this.state.data.slice();
    }

    this.setState({
      selectedRows,
    }, () => {
      onSelectAll && this.isAllSelected && onSelectAll(selectedRows);
      onSelectChange && onSelectChange(selectedRows);
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

  changeSortCondition(column, order) {
    if (!column) ({ sortColumn: column, sortOrder: order } = this.state);

    const data = this.state.filteredData.slice();

    if (!column) {
      this.setState({
        data
      });
      return;
    }

    const { sortMethod, property } = column;
    let sortedData;
    if (!order) {
      sortedData = data;
    } else {
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

    this.setState({
      sortColumn: column,
      sortOrder: order,
      data: sortedData,
    });
  }

  toggleFilterOpened(column) {
    column.filterOpened = !column.filterOpened;
    this.forceUpdate();
  }

  changeFilteredValue(column, value) {
    column.filteredValue = value;
    const filteredData = filterData(this.props.data.slice(), this.state.columns);
    this.setState(Object.assign(this.state, {
      filteredData
    }));
    this.changeSortCondition();
  }

  render()  {
    const renderExpanded = (this.props.columns.find(column => column.type === 'expand') || {}).expandPannel;
    return (
      <TableLayout
        {...this.props}
        renderExpanded={renderExpanded}
        store={this.state}
      />
    )
  }
}
