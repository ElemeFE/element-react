import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, Transition, View } from '../../libs';
import classNames from 'classNames';
import TableHeader from './TableHeader'
import TableBody from './TableBody'

export default class Table extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      bodyWidth: 'auto'
    }
  }

  componentDidMount(){
    this.initLayout();
  }

  initLayout(){
    const rootDom = ReactDOM.findDOMNode(this);
    const bodyWidth = parseFloat(window.getComputedStyle(rootDom).getPropertyValue("width"));
    this.setState({bodyWidth});
  }

  render() {
    const { 
      fit, 
      stripe, 
      border, 
      columns, 
      data, 
      style } = this.props;
    const { bodyWidth } = this.state;
    const rootClassName = this.classNames(
      'el-table', 
      classNames({
        'el-table--fit':fit, 
        'el-table--striped': stripe, 
        'el-table--border': border
      })
    );


    return (
      <div className={rootClassName}>
        <div 
          className="el-table__header-wrapper">
          <TableHeader 
            style={{width: bodyWidth}}
            columns={columns}/>
        </div>
        <div 
          className="el-table__body-wrapper" 
          ref="bodyWrapper">
          <TableBody 
            style={{width: bodyWidth}}
            columns={columns} 
            data={data}/>
        </div>
      </div>
    )
  }
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