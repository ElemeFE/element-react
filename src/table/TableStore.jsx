// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';

import type {
  TableStoreProps,
  TableStoreState,
  TableLayoutProps,
} from './Types';
import normalizeColumns from './normalizeColumns';
import { flattenColumns } from "./utils";


export default function TableStoreHOC(WrapedComponent: React.ComponentType<TableLayoutProps>): React.ComponentType<TableStoreProps> {
  return class TableStore extends Component<TableStoreProps, TableStoreState> {
    static defaultProps = {
      showHeader: true,
      fit: true,
    };

    static childContextTypes = {
      store: PropTypes.object,
    };

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

    getChildContext() {
      store: this;
    }

    updateColumns(columns) {
      const _columns = normalizeColumns(columns);
      if (_columns[0].type === 'selection' && !_columns[0].fixed) {
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