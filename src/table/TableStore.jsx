// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';

import type {
  TableProps,
  TableStoreState,
} from './Types';
import normalizeColumns from './normalizeColumns';
import { flattenColumns } from "./utils";


export default function TableStoreHOC(WrapedComponent: React.ComponentType<any>): React.ComponentType<any> {
  return class TableStore extends Component<TableProps, TableStoreState> {
    static defaultProps = {
      showHeader: true,
      fit: true,
      emptyText: '暂无数据',
    };

    static childContextTypes = {
      store: PropTypes.object,
    };

    getChildContext() {
      store: this;
    }

    constructor(props) {
      super(props);

      this.state = {
        rowKey: props.rowKey,
        defaultExpandAll: props.defaultExpandAll,
        _columns: null, // transformed columns props
        fixedColumns: null, // left fixed columns from _columns
        rightFixedColumns: null, // right fixed columns from _columns
        originColumns: null, // _columns sorted by 'fixed'
        columns: null, // contain only leaf column
        isComplex: null, // has fixed column
      };
    }

    componentWillMount() {
      const { columns, data } = this.props;
      this.updateColumns(columns);
      this.setData(data);
    }

    componentWillReceiveProps(nextProps) {

    }

    updateColumns(columns) {
      const _columns = normalizeColumns(columns);
      if (_columns[0].type === 'selection' && !_columns[0].fixed) { // 首列为多选列强制固定
        _columns[0].fixed = true;
      }
      const fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left');
      const rightFixedColumns = _columns.filter(column => column.fixed === 'right');
      const originColumns = [].concat(fixedColumns, _columns.filter(column => !column.fixed), rightFixedColumns);

      this.setState({
        _columns,
        fixedColumns,
        rightFixedColumns,
        originColumns,
        columns: flattenColumns(_columns),
        isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0
      });
    }

    setData(_data) {
      // todo more
      this.setState({
        _data,
        data: _data,
      });
    }

    setHoverRow(index) {
      console.log(index);
    }

    render() {
      return (
        <WrapedComponent
          {...this.props}
          store={this.state}
        />
      )
    }
  }
}