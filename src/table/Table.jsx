// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

import type {
  TableProps,
  TableState,
} from './Types';

// let tableIdSeed = 1;

export default class Table extends Component<TableProps, TableState> {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any,
  };

  static childContextTypes = {
    table: PropTypes.any
  };

  constructor(props: TableProps) {
    super(props);
    this.state = {};

    // this.tableId = `el-table_${tableIdSeed++}_`;
    // this.tableId = tableIdSeed++;

    ['syncScroll'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  get bodyWrapperHeight(): Object {
    const { layout, height, maxHeight } = this.props;
    const style = {};

    if (height) {
      style.height = layout.bodyHeight || '';
    } else if (maxHeight) {
      if (layout.headerHeight !== null) { // 非首次渲染
        style.maxHeight = maxHeight - layout.headerHeight - layout.footerHeight
      }
    }

    return style;
  }

  get bodyWidth(): number | '' {
    const { layout } = this.props;
    const { bodyWidth, scrollY, gutterWidth } = layout;
    return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
  }

  get fixedHeight(): Object {
    const { layout } = this.props;
    return {
      bottom: layout.scrollX ? layout.gutterWidth - 1 : 0
    };
  }

  get fixedBodyHeight(): Object {
    const { layout, ...props } = this.props;
    const style = {};

    if (props.height) {
      style.height = layout.fixedBodyHeight || '';
    } else if (props.maxHeight) {
      if (layout.headerHeight !== null) {
        style.maxHeight = props.maxHeight - layout.headerHeight - layout.footerHeight - (layout.scrollX ? layout.gutterWidth : 0);
      }
    }

    return style;
  }

  getChildContext(): Object {
    return {
      table: this
    }
  }

  syncScroll() {
    const { headerWrapper, footerWrapper, bodyWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this;
    if (headerWrapper) {
      headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }
    if (footerWrapper) {
      footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }

    if (fixedBodyWrapper) {
      fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
    if (rightFixedBodyWrapper) {
      rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
  }

  bindRef(key: string) {
    return (node: Object) => { this[key] = node; }
  }

  render() {
    const { store, layout, ...props } = this.props;
    const { isHidden } = this.state;

    return (
      <div
        style={this.style({
          height: props.height,
          maxHeight: props.maxHeight,
        })}
        className={this.className('el-table', {
          'el-table--fit': props.fit,
          'el-table--striped': props.stripe,
          'el-table--border': props.border,
          'el-table--hidden': isHidden,
          'el-table--fluid-height': props.maxHeight,
          'el-table--enable-row-hover': !store.isComplex,
          'el-table--enable-row-transition': (store.data || []).length && (store.data || []).length < 100
        })}
        ref={this.bindRef('el')}
      >
        {props.showHeader && (
          <div className="el-table__header-wrapper" ref={this.bindRef('headerWrapper')}>
            <TableHeader
              {...this.props}
              style={{ width: this.bodyWidth || '' }}
            />
          </div>
        )}
        <div
          style={this.bodyWrapperHeight}
          className="el-table__body-wrapper"
          ref={this.bindRef('bodyWrapper')}
          onScroll={this.syncScroll}
        >
          <TableBody
            {...this.props}
            style={{ width: this.bodyWidth }}
          />
          {(!props.data || !props.data.length) && (
            <div
              style={{ width: this.bodyWidth }}
              className="el-table__empty-block"
            >
              <span className="el-table__empty-text">{props.emptyText}</span>
            </div>
          )}
        </div>
        {props.showSummary && (
          <div
            style={{ visibility: props.data && props.data.length ? 'visible' : 'hidden' }}
            className="el-table__footer-wrapper"
            ref={this.bindRef('footerWrapper')}
          >
            <TableFooter
              {...this.props}
              style={{ width: this.bodyWidth || '' }}
            />
          </div>
        )}
        {!!store.fixedColumns.length && (
          <div
            style={Object.assign({}, this.fixedHeight, {
              width: layout.fixedWidth || ''
            })}
            className="el-table__fixed"
            ref={this.bindRef('fixedWrapper')}
          >
            {props.showHeader && (
              <div className="el-table__fixed-header-wrapper" ref={this.bindRef('fixedHeaderWrapper')}>
                <TableHeader
                  fixed="left"
                  {...this.props}
                  style={{ width: this.bodyWidth || '' }}
                />
              </div>
            )}
            <div
              style={Object.assign({}, this.fixedBodyHeight, {
                top: layout.headerHeight || 0
              })}
              className="el-table__fixed-body-wrapper"
              ref={this.bindRef('fixedBodyWrapper')}
            >
              <TableBody
                fixed="left"
                {...this.props}
                style={{ width: this.bodyWidth || '' }}
              />
            </div>
            {props.showSummary && (
              <div className="el-table__fixed-footer-wrapper" ref={this.bindRef('fixedFooterWrapper')}>
                <TableFooter
                  fixed="left"
                  {...this.props}
                  style={{ width: this.bodyWidth || '' }}
                />
              </div>
            )}
          </div>
        )}
        {!!store.rightFixedColumns.length && (
          <div
            className="el-table__fixed-right"
            ref={this.bindRef('rightFixedWrapper')}
            style={Object.assign({}, {
              width: layout.rightFixedWidth || '',
              right: layout.scrollY ? (props.border ? layout.gutterWidth : (layout.gutterWidth || 1)) : ''
            }, this.fixedHeight)}
          >
            {props.showHeader && (
              <div className="el-table__fixed-header-wrapper" ref={this.bindRef('rightFixedHeaderWrapper')}>
                <TableHeader
                  fixed="right"
                  {...this.props}
                  style={{ width: this.bodyWidth || '' }}
                />
              </div>
            )}
            <div
              className="el-table__fixed-body-wrapper"
              ref={this.bindRef('rightFixedBodyWrapper')}
              style={Object.assign({}, {
                top: layout.headerHeight
              }, this.fixedBodyHeight)}
            >
              <TableBody
                fixed="right"
                {...this.props}
                style={{ width: this.bodyWidth || '' }}
              />
            </div>
            {props.showSummary && (
              <div
                className="el-table__fixed-footer-wrapper"
                ref={this.bindRef('rightFixedFooterWrapper')}
                style={{ visibility: props.data && props.data.length ? 'visible' : 'hidden' }}
              >
                <TableFooter
                  fixed="right"
                  {...this.props}
                  style={{ width: this.bodyWidth || '' }}
                />
              </div>
            )}
          </div>
        )}
        {!!store.rightFixedColumns.length && (
          <div
            className="el-table__fixed-right-patch"
            style={{ width: layout.scrollY ? layout.gutterWidth : '0', height: layout.headerHeight }}
          />
        )}
        <div className="el-table__column-resize-proxy" ref={this.bindRef('resizeProxy')} style={{ visibility: 'hidden' }} />
      </div>
    )
  }
}
