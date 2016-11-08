import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import classNames from 'classNames';

export default class TableHeader extends  Component{
  render() {
    const { columns, style } = this.props;

    return (
      <table 
        style={style}
        className={this.classNames('el-table__header')}
        cellPadding={0}
        cellSpacing={0}>
        <thead>
          <tr>
            {
              columns.map((item, idx)=>{
                return (
                  <th 
                    key={idx} 
                    style={{width: item.width?item.width:''}}>
                    <div className="cell">{item.label}</div>
                  </th>)
              })
            }
          </tr>
        </thead>
      </table>
    )
  }
};

TableHeader.propTypes = {
   columns: PropTypes.array.isRequired
};