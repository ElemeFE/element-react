// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';

import type {
  TableStoreProps,
  TableStoreState,
  TableLayoutProps,
} from './Types';


export default function TableStoreHOC(WrapedComponent: React.ComponentType<TableLayoutProps>): React.ComponentType<TableStoreProps> {
  return class TableStore extends Component<TableStoreProps, TableStoreState> {
    static childContextTypes = {
      store: PropTypes.object,
    };

    constructor(props) {
      super(props);

      this.state = {
        rowKey: props.rowKey,
        defaultExpandAll: props.defaultExpandAll
      };
    }

    componentWillMount() {
      this.updateColumns(this.props.columns);
    }

    componentWillReceiveProps(nextProps) {

    }

    getChildContext() {
      store: this;
    }

    updateColumns(columns) {

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