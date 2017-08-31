// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';

import type {
  TableProps,
  TableLayoutState,
} from './Types';

export default function TableLayoutHOC(WrapedComponent: React.ComponentType<TableProps & { layout: TableState }>): React.ComponentType<TableProps & { layout: TableState }> {
  return class TableLayout extends Component {
    static childContextTypes = {
      store: PropTypes.object,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    getChildContext() {
      layout: this;
    }

    render() {
      return (
        <WrapedComponent
          {...this.props}
          layout={this.state}
        />
      )
    }
  }
}