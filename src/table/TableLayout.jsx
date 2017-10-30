// @flow
import * as React from 'react';
import throttle from 'throttle-debounce/throttle';
import { Component, PropTypes } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

import Table from './Table';
import type {
  TableLayoutProps,
  TableLayoutState,
} from './Types';

import { getScrollBarWidth, getValueByPath } from "./utils";

export default class TableLayout extends Component<TableLayoutProps, TableLayoutState> {
  static childContextTypes = {
    layout: PropTypes.any,
  };

  constructor(props: TableLayoutProps) {
    super(props);
    this.state = {
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

    this.resizeListener = throttle(50, () => {
      this.scheduleLayout();
    });
  }

  componentDidMount() {
    this.el = this.table.el;

    this.scheduleLayout();
    addResizeListener(this.el, this.resizeListener)
  }

  componentWillReceiveProps(nextProps: TableLayoutProps) {
    const preHeight = this.props.height || this.props.maxHeight;
    const nextHeight = nextProps.height || nextProps.maxHeight;
    if (preHeight !== nextHeight) {
      this.setState({
        height: nextHeight
      });
    }
  }

  componentDidUpdate(preProps: TableLayoutProps) {
    if (
      this.isPropChanged('columns', preProps)
      || this.isPropChanged('style', preProps)
      || this.isPropChanged('className', preProps)
    ) {
      this.scheduleLayout();
      return;
    }

    const shouldUpdateHeight = [
      'height',
      'maxHeight',
      'data',
      'store.expandingRows',
      'expandRowKeys',
      'showSummary',
      'summaryMethod',
      'sumText',
    ].some(key => this.isPropChanged(key, preProps));
    if (shouldUpdateHeight) {
      this.updateHeight();
      this.updateScrollY();
    }
  }

  componentWillUnmount() {
    removeResizeListener(this.el, this.resizeListener)
  }

  isPropChanged(key: string, preProps: TableLayoutProps): boolean {
    const prop = getValueByPath(this.props, key);
    const preProp = getValueByPath(preProps, key);
    return prop !== preProp;
  }

  getChildContext() {
    return {
      layout: this
    };
  }

  scheduleLayout() {
    this.setState(this.caculateWidth(), () => {
      this.updateHeight();
      this.updateScrollY();
    });
  }

  // horizontal direction layout
  caculateWidth(): Object {
    const { store: { columns, fixedColumns, rightFixedColumns }, fit } = this.props;
    const { gutterWidth } = this.state;
    const bodyMinWidth = columns.reduce((pre, col) => pre + (col.width || col.minWidth), 0);

    let bodyWidth = this.table.el.clientWidth;
    let scrollX;
    let fixedWidth;
    let rightFixedWidth;

    // mutate props (TableStore's state[columns])
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

    return {
      scrollX,
      bodyWidth,
      fixedWidth,
      rightFixedWidth
    };
  }

  // vertical direction layout
  updateHeight() {
    this.setState((state) => {
      const { data } = this.props;
      const { scrollX, gutterWidth } = state;

      const noData = !data || !data.length;
      const { headerWrapper, footerWrapper } = this.table;

      const tableHeight = this.el.clientHeight;
      const headerHeight = headerWrapper ? headerWrapper.offsetHeight : 0;
      const footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
      const bodyHeight = tableHeight - headerHeight- footerHeight + (footerWrapper ? 1 : 0);
      const fixedBodyHeight = bodyHeight - (scrollX ? gutterWidth : 0);
      const viewportHeight = tableHeight - (scrollX && !noData ? gutterWidth : 0);

      return {
        tableHeight,
        headerHeight,
        bodyHeight,
        footerHeight,
        fixedBodyHeight,
        viewportHeight // no useful
      };
    });
  }

  // judge if has scroll-Y bar
  updateScrollY() {
    this.setState((state) => {
      const { bodyWrapper } = this.table;
      const { fixedBodyHeight } = state;

      const body = bodyWrapper.querySelector('.el-table__body');
      const scrollY = body.offsetHeight > fixedBodyHeight;

      return {
        scrollY
      };
    });
  }

  render() {
    return (
      <Table
        ref={(table) => { this.table = table; }}
        {...this.props}
        layout={this.state}
      />
    )
  }
}
