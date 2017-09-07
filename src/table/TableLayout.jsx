// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';

import type {
  TableProps,
  TableStoreState,
  TableLayoutState,
} from './Types';

import {flattenColumns, getScrollBarWidth} from "./utils";

export default function TableLayoutHOC(WrapedComponent: React.ComponentType<any>): React.ComponentType<any> {
  return class TableLayout extends Component<TableProps & { store: TableStoreState }, TableLayoutState> {
    static childContextTypes = {
      layout: PropTypes.any,
    };

    constructor(props) {
      super(props);
      this.state = {
        // fit: props.fit,
        // show
        height: props.height || props.maxHeight || null, // Table's height or maxHeight prop
        gutterWidth: getScrollBarWidth(), // scrollBar width
        tableHeight: null, // Table's real height
        headerHeight: null, // header's height of Table
        bodyHeight: null, // body's height of Table
        footerHeight: null, // footer's height of Table
        fixedBodyHeight: null, // fixed body's height of Table
        viewportHeight: null, // Table's real height without y scroll bar height
        scrollX: null, // has x scroll bar
        scrollY: null, // has y scroll bar
      };
    }

    componentDidMount() {
      this.el = this.table.el;

      this.doLayout();
    }

    componentWillReceiveProps(nextProps) {
      const preHeight = this.props.height || this.props.maxHeight;
      const nextHeight = nextProps.height || nextProps.maxHeight;
      if (preHeight !== nextHeight) {
        this.setState({
          height: nextHeight
        });
      }
    }

    componentDidUpdate(preProps) {
      const { columns, height, maxHeight, data, expandRowKeys, store } = this.props;
      const columnsChanged = columns !== preProps.columns;
      const heightChanged = height !== preProps.height || maxHeight !== preProps.maxHeight;
      const dataChanged = data !== preProps.data;
      const rowExpandChanged = store.expandingRows !== preProps.store.expandingRows || expandRowKeys !== preProps.expandRowKeys;
      if (columnsChanged) {
        this.doLayout();
      } else if (heightChanged || dataChanged || rowExpandChanged) {
        this.updateHeight();
        this.updateScrollY();
      }
    }

    getChildContext() {
      return {
        layout: this
      };
    }

    doLayout() {
      this.update();
      this.updateHeight();
      this.updateScrollY();
    }

    // horizontal direction layout
    update() {
      const { store: { columns, fixedColumns, rightFixedColumns }, fit } = this.props;
      const { gutterWidth } = this.state;
      const bodyMinWidth = columns.reduce((pre, col) => pre + (col.width || col.minWidth), 0);

      let bodyWidth = this.table.el.clientWidth;
      let scrollX;
      let fixedWidth;
      let rightFixedWidth;

      // mutate TableStore's state(columns), thinking to avoid(move columns from store to layout)
      const flexColumns = columns.filter(column => typeof column.width !== 'number');
      if (flexColumns.length && fit) {
        if (bodyMinWidth < bodyWidth - gutterWidth) { // no scroll bar
          scrollX = false;

          const totalFlexWidth = bodyWidth - gutterWidth - bodyMinWidth;
          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth;
          } else {
            const allColumnsWidth = flexColumns.reduce((pre, col) => pre + col.minWidth, 0);
            const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;

            let widthWithoutFirst = 0;

            flexColumns.forEach((column, index) => {
              if (index === 0) return;
              const flexWidth = Math.floor(column.minWidth * flexWidthPerPixel);
              widthWithoutFirst += flexWidth;
              column.realWidth = column.minWidth + flexWidth;
            });

            flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth - widthWithoutFirst;
          }
        } else { // have horizontal scroll bar
          scrollX = true;
          flexColumns.forEach((column) => {
            column.realWidth = column.minWidth;
          });
        }

        bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      } else {
        scrollX = bodyMinWidth > bodyWidth;
        bodyWidth = bodyMinWidth;
      }

      if (fixedColumns.length) {
        fixedWidth = fixedColumns.reduce((pre, col) => pre + col.realWidth, 0);
      }

      if (rightFixedColumns.length) {
        rightFixedWidth = rightFixedColumns.reduce((pre, col) => pre + col.realWidth, 0);
      }

      this.setState(Object.assign(this.state, {
        scrollX,
        bodyWidth,
        fixedWidth,
        rightFixedWidth
      }));
    }

    // vertical direction layout
    updateHeight() {
      const { data } = this.props;
      const { scrollX, gutterWidth } = this.state;
      // const hasHeight = height && (!isNaN(height) || typeof height === 'string');
      const noData = !data || !data.length;
      const { headerWrapper, footerWrapper } = this.table;

      const tableHeight = this.el.clientHeight;
      const headerHeight = headerWrapper ? headerWrapper.offsetHeight : 0;
      const footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
      const bodyHeight = tableHeight - headerHeight- footerHeight + (footerWrapper ? 1 : 0);
      const fixedBodyHeight = bodyHeight - (scrollX ? gutterWidth : 0);
      const viewportHeight = tableHeight - (scrollX && !noData ? gutterWidth : 0);

      this.setState(Object.assign(this.state, {
        tableHeight,
        headerHeight,
        bodyHeight,
        footerHeight,
        fixedBodyHeight,
        viewportHeight
      }));
    }

    // judge if has scroll-Y bar
    updateScrollY() {
      const { bodyWrapper } = this.table;
      const { fixedBodyHeight } = this.state;

      const body = bodyWrapper.querySelector('.el-table__body');
      const scrollY = body.offsetHeight > fixedBodyHeight;

      this.setState(Object.assign(this.state, {
        scrollY
      }));
    }

    render() {
      return (
        <WrapedComponent
          ref={(table) => { this.table = table; }}
          {...this.props}
          layout={this.state}
        />
      )
    }
  }
}