// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import TableStoreHOC from './TableStore';
import TableLayoutHOC from './TableLayout';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

import type {
  TableProps,
  TableStoreState,
  TableLayoutState,
  TableState,
} from './Types';

let tableIdSeed = 1;

class Table extends Component<TableProps & { store: TableStoreState } & { layout: TableLayoutState }, TableState> {
  static contextTypes = {
    store: PropTypes.object,
    layout: PropTypes.object,
  };


  constructor(props) {
    super(props);
    this.state = {};

    // this.tableId = `el-table_${tableIdSeed++}_`;
    this.tableId = tableIdSeed++;
  }

  componentWillReceiveProps(next) {
    // this.tableId === 'el-table_1_' && console.log(next.layout);
  }

  get bodyWrapperHeight() {
    const { layout, ...props } = this.props;
    const style = {};

    if (props.height) {
      style.height = layout.bodyHeight ? layout.bodyHeight : '';
    } else if (props.maxHeight) {
      if (layout.headerHeight !== null) { // 非首次渲染
        style.maxHeight = props.showHeader
          ? props.maxHeight - layout.headerHeight - layout.footerHeight
          : props.maxHeight - layout.footerHeight
      }
    }

    return style;
  }

  get bodyWidth() {
    const { layout } = this.props;
    const { bodyWidth, scrollY, gutterWidth } = layout;
    return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
  }

  get fixedHeight() {
    const { layout, ...props } = this.props;
    let style;

    if (props.maxHeight) {
      style = {
        bottom: (layout.scrollX && props.data.length) ? layout.gutterWidth : ''
      };
    } else {
      style = {
        height: layout.viewportHeight ? layout.viewportHeight : ''
      };
    }

    return style;
  }

  get fixedBodyHeight() {
    const { layout, ...props } = this.props;
    let style;

    if (props.height) {
      style = {
        height: layout.fixedBodyHeight ? layout.fixedBodyHeight + 'px' : ''
      };
    } else if (props.maxHeight) {
      let maxHeight = layout.scrollX ? props.maxHeight - layout.gutterWidth : props.maxHeight;

      if (this.showHeader) {
        maxHeight -= layout.headerHeight;
      }

      style = {
        maxHeight: maxHeight + 'px'
      };
    }

    return style;
  }

  bindRef(key) {
    return (node) => { this[key] = node; }
  }

  render() {
    const { store, layout, ...props } = this.props;
    const { isHidden, resizeProxyVisible } = this.state;

    return (
      <div
        style={this.style({
          height: props.height,
          maxHeight: props.maxHeight,
        })}
        className={this.classNames('el-table', {
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
              store={store}
              layout={layout}
              border={props.border}
              defaultSort={props.defaultSort}
              style={{ width: layout.bodyWidth || '' }}
            />
          </div>
        )}
        <div
          style={this.bodyWrapperHeight}
          className="el-table__body-wrapper"
          ref={this.bindRef('bodyWrapper')}
        >
          <TableBody
            store={store}
            layout={layout}
            stripe={props.stripe}
            rowClassName={props.rowClassName}
            rowStyle={props.rowStyle}
            highlight={props.highlightCurrentRow}
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
              store={store}
              layout={layout}
              border={props.border}
              sumText={props.sumText}
              summaryMethod={props.summaryMethod}
              defaultSort={props.defaultSort}
              style={{ width: !!layout.bodyWidth ? layout.bodyWidth + 'px' : '' }}
            />
          </div>
        )}
        {!!store.fixedColumns.length && (
          <div
            style={Object.assign({}, this.fixedHeight, {
              width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
            })}
            className="el-table__fixed"
            ref={this.bindRef('fixedWrapper')}
          >
            {props.showHeader && (
              <div className="el-table__fixed-header-wrapper" ref={this.bindRef('fixedHeaderWrapper')}>
                <TableHeader
                  store={store}
                  layout={layout}
                  fixed="left"
                  border={props.border}
                  style={{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }}
                />
              </div>
            )}
            <div
              style={Object.assign({}, this.fixedBodyHeight, {
                top: layout.headerHeight ? layout.headerHeight + 'px' : ''
              })}
              className="el-table__fixed-body-wrapper"
              ref={this.bindRef('fixedBodyWrapper')}
            >
              <TableBody
                store={store}
                layout={layout}
                fixed="left"
                hightlight={props.highlightCurrentRow}
                rowClassName={props.rowClassName}
                rowStyle={props.rowStyle}
                style={{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }}
              />
            </div>
            {props.showSummary && (
              <div className="el-table__fixed-footer-wrapper" ref={this.bindRef('fixedFooterWrapper')}>
                <TableFooter
                  store={store}
                  layout={layout}
                  fixed="left"
                  border={props.border}
                  sumText={props.sumText}
                  summaryMethod={props.summaryMethod}
                  style={{ width: !!layout.fixedWidth ? layout.fixedWidth + 'px' : '' }}
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
              width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
              right: layout.scrollY ? (props.border ? layout.gutterWidth : (layout.gutterWidth || 1)) + 'px' : ''
            }, this.fixedHeight)}
          >
            {props.showHeader && (
              <div className="el-table__fixed-header-wrapper" ref={this.bindRef('rightFixedHeaderWrapper')}>
                <TableHeader
                  store={store}
                  layout={layout}
                  fixed="right"
                  border={props.border}
                  style={{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }}
                />
              </div>
            )}
            <div
              className="el-table__fixed-body-wrapper"
              ref={this.bindRef('rightFixedBodyWrapper')}
              style={Object.assign({}, {
                top: layout.headerHeight + 'px'
              }, this.fixedBodyHeight)}
            >
              <TableBody
                store={store}
                layout={layout}
                fixed="right"
                hightlight={props.highlightCurrentRow}
                rowClassName={props.rowClassName}
                rowStyle={props.rowStyle}
                style={{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }}
              />
            </div>
            {props.showSummary && (
              <div
                className="el-table__fixed-footer-wrapper"
                ref={this.bindRef('rightFixedFooterWrapper')}
                style={{ visibility: props.data && props.data.length ? 'visible' : 'hidden' }}
              >
                <TableFooter
                  store={store}
                  layout={layout}
                  fixed="right"
                  border={props.border}
                  sumText={props.sumText}
                  summaryMethod={props.summaryMethod}
                  style={{ width: !!layout.rightFixedWidth && layout.rightFixedWidth + 'px' }}
                />
              </div>
            )}
          </div>
        )}
        {!!store.rightFixedColumns.length && (
          <div
            className="el-table__fixed-right-patch"
            style={{ width: layout.scrollY ? layout.gutterWidth + 'px' : '0', height: layout.headerHeight + 'px' }}
          />
        )}
        {resizeProxyVisible && <div className="el-table__column-resize-proxy" ref={this.bindRef('resizeProxy')} />}
      </div>
    )
  }
}

export default TableStoreHOC(TableLayoutHOC(Table));