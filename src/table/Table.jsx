import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../../libs';
import { enhanceColumns, calculateBodyWidth, calculateFixedWidth } from './mixins';
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

      bodyWidth: 'auto',
      bodyHeight: 'auto',
      headerHeight: 'auto',
      realTableHeaderHeight: '',
      realTableHeight: '',
      resizeProxyVisible: false
    }
  }

  getChildContext(){
    return {
      $owerTable: this
    }
  }

  componentDidMount(){
    this.initLayout();
  }

  initLayout(){
    const rootDom = ReactDOM.findDOMNode(this);
    const thisTableWidth = parseFloat(window.getComputedStyle(rootDom).getPropertyValue('width'));
    const realTableHeight = parseFloat(window.getComputedStyle(rootDom).getPropertyValue('height'));
    const { height } = this.props;
    const bodyWidth = calculateBodyWidth(this.state.columns, thisTableWidth);
    const headerHeight = this.refs.headerWrapper.offsetHeight;
    const bodyHeight = height ? height - headerHeight : this.state.headerHeight;

    this.setState({
      bodyWidth,
      bodyHeight,
      headerHeight,
      realTableHeaderHeight: headerHeight,
      realTableHeight: this.props.height || realTableHeight || 'auto'
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
    const headerWrapper = this.refs.headerWrapper;
    const fixedBodyWrapper = this.refs.fixedBodyWrapper;
    const rightFixedBodyWrapper = this.refs.rightFixedBodyWrapper;

    headerWrapper.scrollLeft = e.target.scrollLeft;
    fixedBodyWrapper && (fixedBodyWrapper.scrollTop = e.target.scrollTop);
    rightFixedBodyWrapper && (rightFixedBodyWrapper.scrollTop = e.target.scrollTop);
  }

  render() {
    const { fit, stripe, border } = this.props;
    const { 
      bodyWidth,  
      bodyHeight, 
      _columns, 
      data, 
      fixedLeftColumns, 
      fixedRightColumns, 
      realTableHeight,
      realTableHeaderHeight
    } = this.state;

    const rootClassName = this.classNames(
      'el-table',
      {
        'el-table--fit': fit,
        'el-table--striped': stripe,
        'el-table--border': border
      }
    );

    return (
      <div className={rootClassName}>
        <div
          ref="headerWrapper"
          className="el-table__header-wrapper">
          <TableHeader 
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
            data={data}/>
        </div>
        {
          !!fixedLeftColumns.length && (
            <div 
              className="el-table__fixed" 
              ref="fixedWrapper"
              style={{width: calculateFixedWidth(fixedLeftColumns), height: realTableHeight}}>
              <div className="el-table__fixed-header-wrapper" ref="fixedHeaderWrapper">
                <TableHeader
                  fixed="left"
                  border="border"
                  columns={fixedLeftColumns}
                  style={{width: '100%', height: '100%'}}/>
              </div>
              <div 
                className="el-table__fixed-body-wrapper" 
                ref="fixedBodyWrapper"
                style={{top: realTableHeaderHeight, height: bodyHeight ? bodyHeight : ''}}>
                <TableBody
                  ref="fixedLeftBody"
                  fixed="left"
                  rowClassName={this.props.rowClassName}
                  columns={fixedLeftColumns}
                  data={data}
                  style={{width: calculateFixedWidth(fixedLeftColumns)}}>
                </TableBody>
              </div>
            </div>)
        }

        <div 
          className="el-table__fixed-right" 
          ref="rightFixedWrapper"
          style={{width: calculateFixedWidth(fixedRightColumns), height: realTableHeight,right: 0}}>
          <div 
            className="el-table__fixed-header-wrapper" 
            ref="rightFixedHeaderWrapper">
            <TableHeader
              fixed="left"
              border="border"
              columns={fixedRightColumns}
              style={{width: '100%', height: '100%'}}/>
          </div>
          <div 
            className="el-table__fixed-body-wrapper" 
            ref="rightFixedBodyWrapper"
            style={{top: realTableHeaderHeight, height: bodyHeight?bodyHeight:''}}>
            <TableBody
              ref="fixedRightBody"
              fixed="right"
              rowClassName={this.props.rowClassName}
              columns={fixedRightColumns}
              data={data}
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
  style: PropTypes.object
};

Table.defaultProps = {
  stripe: false,
  border: false,
  fit: true
};
