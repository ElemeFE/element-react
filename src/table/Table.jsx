// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../../libs';
import { enhanceColumns, calculateBodyWidth, calculateFixedWidth, scheduleLayout } from './mixins';
import { getScrollBarWidth } from './utils';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';


import type {
  Column,
  TableProps,
  TableState,
  DefaultTableProps
} from './Types';

let tableIdSeed = 1;

export default class Table extends Component{
  props: TableProps;
  state: TableState;
  static defaultProps: DefaultTableProps;

  constructor(props:Object, context:Object){
    super(props, context);
    this.tableId = tableIdSeed++;

    const { columns, data } = this.props;
    const enhCols = enhanceColumns(columns, this.tableId);

    this.state = {
      columns: columns,//用户原始columns配置
      _columns: enhCols.columns,//补充后的列配置
      fixedLeftColumns: enhCols.fixedLeftColumns,
      fixedRightColumns: enhCols.fixedRightColumns,
      data: data,
      sortList: null,
      filterList: null,

      bodyWidth: '',
      bodyHeight: '',
      headerHeight: '',
      realTableHeaderHeight: '',
      realTableHeight: '',
      realTableWidth: '',
      resizeProxyVisible: false,

      scrollY: false,//表格竖Y轴是否有滚动条,
      scrollX: false
    }
  }

  getChildContext(){
    return {
      $owerTable: this
    }
  }

  componentDidMount(){
    this.initLayout();

    const des:Object = {
      get: this._filterContainer.bind(this)
    };
    Object.defineProperty(this, 'filterContainer', des);
  }

  componentWillUnmount(){
    if (this._filterContainer instanceof HTMLElement) {
      const body = document.body || document;
      ReactDOM.unmountComponentAtNode(this.filterContainer);
      body.removeChild(this.filterContainer);
    }
  }

  componentWillReceiveProps(nextProps:Object){
    if(nextProps.data != this.props.data){
      this.setState({data: nextProps.data}, ()=>{
        this.initLayout();
      });
    }

    if(nextProps.height != this.props.height){
      this.initLayout();
    }
  }

  _filterContainer(){
    if(!this._filterCon){
      this._filterCon = document.createElement('div');
      this._filterCon.style.cssText = "position:absolute;left:0;top:0";
      this._filterCon.id = "__filter__" + Math.random().toString().slice(2);
      const body = document.body || document.createElement('body');
      body.appendChild(this._filterCon);
    }

    return this._filterCon;
  }

  initLayout(){
    const { height, fit, maxHeight } = this.props;

    let rootComputedStyle = window.getComputedStyle(this.refs.root);
    let headerComputedStyle = window.getComputedStyle(this.refs.headerWrapper);
    let thisTableWidth = parseFloat(headerComputedStyle.getPropertyValue('width'));
    let realTableHeight = parseFloat(rootComputedStyle.getPropertyValue('height'));
    let bodyWidth = scheduleLayout(this.state._columns, thisTableWidth, 0, fit).bodyWidth;
    let headerHeight = this.refs.headerWrapper.offsetHeight;
    let  bodyHeight;

    if(height){
      bodyHeight = height - headerHeight;
    }else if(maxHeight && maxHeight < realTableHeight){//流体布局
      realTableHeight = maxHeight;
      bodyHeight = maxHeight - headerHeight;
    }else{
      bodyHeight = '';
    }

    this.setState({
      bodyWidth,
      bodyHeight,
      headerHeight,
      realTableHeaderHeight: headerHeight,
      realTableWidth: thisTableWidth,
      realTableHeight: this.props.height || realTableHeight || ''
    }, ()=>{
      this.adjustScrollState();
    });
  }

  scheduleLayout(){
    const { _columns, realTableWidth, scrollY } = this.state;

    const layout = scheduleLayout(_columns, realTableWidth, Number(scrollY), this.props.fit);
    this.setState({
      bodyWidth: layout.bodyWidth
    }, ()=>{
      this.onScrollBodyWrapper();
      this.adjustScrollState();
    });
  }

  adjustScrollState(){
    const scrollY = this.refs.mainBody.isScrollY();
    this.setState({
      scrollX: this.refs.mainBody.isScrollX(),
      scrollY: scrollY,
      bodyWidth: scheduleLayout(this.state._columns, this.state.realTableWidth, scrollY, this.props.fit).bodyWidth
    });
  }

  getBodyWrapperStyle(){
    const { bodyHeight } = this.state;
    const style = {};

    style.height = bodyHeight;
    return style;
  }

  onScrollBodyWrapper(){
    const target = arguments[0] ? arguments[0].target : this.refs.bodyWrapper;
    const headerWrapper = this.refs.headerWrapper;
    const fixedBodyWrapper = this.refs.fixedBodyWrapper;
    const rightFixedBodyWrapper = this.refs.rightFixedBodyWrapper;

    if(target instanceof HTMLDivElement){
      headerWrapper.scrollLeft = target.scrollLeft;
      fixedBodyWrapper && (fixedBodyWrapper.scrollTop = target.scrollTop);
      rightFixedBodyWrapper && (rightFixedBodyWrapper.scrollTop = target.scrollTop);
    }
  }

  sortBy(sort:number, prop:string, compare:any){
    const data = this.state.filterList || this.state.data;
    const sortList = data.slice(0);

    if(sort === 0){
      this.setState({sortList: null});
    }else{
      const defaultCompare = (a, b)=>{
        if(sort == 2){ var t = b; b = a; a = t;}
        return (a[prop] > b[prop] ? 1 : -1);
      }
      sortList.sort(compare ? compare : defaultCompare);
      this.setState({sortList});
    }
  }

  filterBy(column:Object, filteCondi:Array<Object>){
    const data = this.state.sortList || this.state.data;

    const filterList = data.filter((d)=>{
      const defaultFilterMethod = (c)=>d[column.property] == c.value;
      return !!filteCondi.filter(column.filterMethod || defaultFilterMethod).length
    });

    this.setState({
      filterList: filteCondi && filteCondi.length ? filterList : data
    });
  }

  flattenHeaderColumn(){
    const { _columns } = this.state;
    const headerLevelColumns = [];
    const leafColumns = [];

    let rescurveColumns = (list)=>{
      list.forEach((item)=>{
        headerLevelColumns[item.level] = headerLevelColumns[item.level] || [];
        headerLevelColumns[item.level].push(item);
        if(item.subColumns instanceof Array){
          rescurveColumns(item.subColumns);
        }else{
          leafColumns.push(item);
        }
      });
    };
    rescurveColumns(_columns);

    return {headerLevelColumns, leafColumns};
  }

  render() {
    let { fit,
      stripe,
      border,
      highlightCurrentRow,
      showSummary,
      sumText,
      getSummaries
    } = this.props;
    let {
      bodyWidth,
      bodyHeight,
      _columns,
      data,
      fixedLeftColumns,
      fixedRightColumns,
      realTableHeight,
      realTableHeaderHeight,
      scrollY,
      scrollX,
      sortList,
      filterList,
    } = this.state;

    const rootClassName = this.classNames(
      'el-table',
      {
        'el-table--fit': fit,
        'el-table--striped': stripe,
        'el-table--border': border
      }
    );

    const scrollYWiddth = scrollX ? getScrollBarWidth() : 0;

    data = filterList || sortList || data;

    const flettenColumns = this.flattenHeaderColumn();
    const { leafColumns } = flettenColumns;

    return (
      <div
        ref="root"
        style={this.style()}
        className={this.className(rootClassName)}>
        <div
          ref="headerWrapper"
          className="el-table__header-wrapper">
          <TableHeader
            ref="header"
            isScrollY={scrollY}
            style={{width: bodyWidth}}
            flettenColumns={flettenColumns}
            columns={_columns}/>
        </div>

        <div
          style={this.getBodyWrapperStyle()}
          className="el-table__body-wrapper"
          onScroll={this.onScrollBodyWrapper.bind(this)}
          ref="bodyWrapper">
          <TableBody
            ref="mainBody"
            style={{width: bodyWidth}}
            rowClassName={this.props.rowClassName}
            columns={_columns}
            flettenColumns={flettenColumns}
            highlightCurrentRow={highlightCurrentRow}
            data={data}/>
        </div>
        {
          !!fixedLeftColumns.length && (
            <div
              className="el-table__fixed"
              ref="fixedWrapper"
              style={{width: calculateFixedWidth(fixedLeftColumns), height: realTableHeight ? (realTableHeight - scrollYWiddth) : ''}}>
              <div className="el-table__fixed-header-wrapper" ref="fixedHeaderWrapper">
                <TableHeader
                  fixed="left"
                  border="border"
                  columns={_columns}
                  flettenColumns={flettenColumns}
                  style={{width: '100%', height: '100%'}}/>
              </div>
              <div
                className="el-table__fixed-body-wrapper"
                ref="fixedBodyWrapper"
                style={{top: realTableHeaderHeight, height: bodyHeight ? (bodyHeight - scrollYWiddth) : ''}}>
                <TableBody
                  ref="fixedLeftBody"
                  fixed="left"
                  rowClassName={this.props.rowClassName}
                  columns={_columns}
                  data={data}
                  flettenColumns={flettenColumns}
                  highlightCurrentRow={highlightCurrentRow}
                  style={{width: bodyWidth}}>
                </TableBody>
              </div>
            </div>)
        }

        <div
          className="el-table__fixed-right"
          ref="rightFixedWrapper"
          style={{width: calculateFixedWidth(fixedRightColumns), height: realTableHeight ? (realTableHeight - scrollYWiddth) : '' ,right: scrollY?getScrollBarWidth() : 0}}>
          <div
            className="el-table__fixed-header-wrapper"
            ref="rightFixedHeaderWrapper">
            <TableHeader
              fixed="right"
              border="border"
              columns={_columns}
              flettenColumns={flettenColumns}
              style={{width: '100%', height: '100%'}}/>
          </div>
          <div
            className="el-table__fixed-body-wrapper"
            ref="rightFixedBodyWrapper"
            style={{top: realTableHeaderHeight, height: bodyHeight? (bodyHeight - scrollYWiddth):''}}>
            <TableBody
              ref="fixedRightBody"
              fixed="right"
              rowClassName={this.props.rowClassName}
              columns={_columns}
              data={data}
              flettenColumns={flettenColumns}
              highlightCurrentRow={highlightCurrentRow}
              style={{width: bodyWidth}}>
            </TableBody>
          </div>
        </div>

        {
          showSummary && (
            <TableFooter
              leafColumns={leafColumns}
              sumText={sumText}
              getSummaries={getSummaries}
              data={data}/>
          )
        }

        <div
          style={{display: this.state.resizeProxyVisible?"block":"none"}}
          className="el-table__column-resize-proxy"
          ref="resizeProxy">
        </div>

        <div className="el-table__body-scroller">
          <div></div>
        </div>
      </div>
    )
  }
}

Table.childContextTypes = {
  $owerTable: PropTypes.object
};

Table.defaultProps = {
  columns: [],
  data: [],
  stripe: false,
  border: false,
  fit: true,
  showSummary: false,
  highlightCurrentRow: false
};
