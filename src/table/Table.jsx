import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../../libs';
import { enhanceColumns, calculateBodyWidth, calculateFixedWidth, scheduleLayout } from './mixins';
import { getScrollBarWidth } from './utils';
import TableHeader from './TableHeader';
import TableBody from './TableBody';


let tableIdSeed = 1;

export default class Table extends Component{

  constructor(props, context){
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

    Object.defineProperty(this, 'filterContainer', {
      get: this._filterContainer.bind(this)
    });
  }

  componentWillUnmount(){
    if (this._filterContainer instanceof HTMLElement) {
      ReactDOM.unmountComponentAtNode(this._filterContainer);
      document.body.removeChild(this._filterContainer);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data != this.props.data){
      this.setState({data: nextProps.data});
    }
  }

  _filterContainer(){
    if(!this._filterCon){
      this._filterCon = document.createElement('div');
      this._filterCon.style="position:absolute;left:0;top:0";
      this._filterCon.id = "__filter__" + Math.random(32).toString().slice(2);
      document.body.appendChild(this._filterCon);
    }

    return this._filterCon;
  }

  initLayout(){
    const { height, fit } = this.props;
    const rootComputedStyle = window.getComputedStyle(this.refs.headerWrapper);
    const thisTableWidth = parseFloat(rootComputedStyle.getPropertyValue('width'));
    const realTableHeight = parseFloat(rootComputedStyle.getPropertyValue('height'));
    const bodyWidth = scheduleLayout(this.state._columns, thisTableWidth, undefined, fit).bodyWidth;
    const headerHeight = this.refs.headerWrapper.offsetHeight;
    const bodyHeight = height ? height - headerHeight : this.state.headerHeight;

    this.setState({
      bodyWidth,
      bodyHeight,
      headerHeight,
      realTableHeaderHeight: headerHeight,
      realTableWidth: thisTableWidth,
      realTableHeight: this.props.height || realTableHeight || 'auto'
    }, ()=>{
      this.adjustScrollState();
    });
  }

  scheduleLayout(){
    const { _columns, realTableWidth, scrollY } = this.state;

    const layout = scheduleLayout(_columns, realTableWidth, scrollY, this.props.fit);
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
    const { height } = this.props;
    const style = {};

    style.height = bodyHeight;
    return style;
  }

  onScrollBodyWrapper(e){
    const target = e ? e.target : this.refs.bodyWrapper;
    const headerWrapper = this.refs.headerWrapper;
    const fixedBodyWrapper = this.refs.fixedBodyWrapper;
    const rightFixedBodyWrapper = this.refs.rightFixedBodyWrapper;

    headerWrapper.scrollLeft = target.scrollLeft;
    fixedBodyWrapper && (fixedBodyWrapper.scrollTop = target.scrollTop);
    rightFixedBodyWrapper && (rightFixedBodyWrapper.scrollTop = target.scrollTop);
  }

  sortBy(sort, prop, compare){
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

  filterBy(column, filteCondi){
    const data = this.state.sortList || this.state.data;

    const filterList = data.filter((d)=>{
      const defaultFilterMethod = (c)=>d[column.property] == c.value;
      return !!filteCondi.filter(column.filterMethod || defaultFilterMethod).length
    });

    this.setState({
      filterList: filteCondi && filteCondi.length ? filterList : data
    });
  }

  render() {
    let { fit, stripe, border, highlightCurrentRow } = this.props;
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
      filterList
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

    return (
      <div style={this.style()} className={this.className(rootClassName)}>
        <div
          ref="headerWrapper"
          className="el-table__header-wrapper">
          <TableHeader
            ref="header"
            isScrollY={scrollY}
            style={{width: bodyWidth}}
            columns={_columns}/>
        </div>

        <div
          style={this.getBodyWrapperStyle()}
          className="el-table__body-wrapper"
          onScroll={(e)=>{this.onScrollBodyWrapper(e)}}
          ref="bodyWrapper">
          <TableBody
            ref="mainBody"
            style={{width: bodyWidth}}
            rowClassName={this.props.rowClassName}
            columns={_columns}
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
                  highlightCurrentRow={highlightCurrentRow}
                  style={{width: calculateFixedWidth(fixedLeftColumns)}}>
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
              highlightCurrentRow={highlightCurrentRow}
              style={{width: calculateFixedWidth(fixedRightColumns)}}>
            </TableBody>
          </div>
        </div>

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
  $owerTable: React.PropTypes.object
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  stripe: PropTypes.bool,
  border: PropTypes.bool,
  fit: PropTypes.bool,
  rowClassName: PropTypes.func,
  style: PropTypes.object,
  highlightCurrentRow: PropTypes.bool,

  //Event
  onCurrentChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectChange: PropTypes.func
};

Table.defaultProps = {
  columns: [],
  data: [],
  stripe: false,
  border: false,
  fit: true,
  highlightCurrentRow: false
};
