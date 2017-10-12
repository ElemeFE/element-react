// @flow

import React from 'react';
import { Component, PropTypes } from '../../libs';
import type { TableFooterState, TableFooterProps, TableBodyProps } from './Types';

export default class TableFooter extends  Component{
  props: TableFooterProps;
  state: TableFooterState;

  constructor(props: TableBodyProps, context: Object){
    super(props, context);

    this.state = {
      dataList: []
    };
  }

  componentDidMount(){
    const { data=[], leafColumns } = this.props;
    if(this.props.getSummaries){
      const tableRow = this.props.getSummaries(leafColumns, data);
      this.setState({
        dataList: tableRow instanceof Array ? tableRow : []
      });
    }else{
      for(var i=0; i < leafColumns.length; i++){
        let total = 0;
        for(let j=0; j < data.length; j++){
          let value = data[j][leafColumns[i]['property']];

          if(isNaN(value)){
            total = 'N/A'
            break;
          }else{
            total += parseFloat(value);
          }
        }
        this.state.dataList[i] = total;
      }
    }
  }

  render() {
    const {
      leafColumns,
      sumText
    } = this.props;

    return (
      <div className="el-table__footer-wrapper">
        <table cellPadding={0} cellSpacing={0}>
          <colgroup>
            {
              leafColumns.map((item, idx)=>{
                return (
                  <col key={idx} style={{width: item.width}} />
                )
              })
            }
          </colgroup>
          <tbody>
            <tr>
              {
                leafColumns.map((column, idx)=>{
                  if(idx == 0){
                    return <td key={idx} style={{width: column.realWidth}}><div className="cell">{ sumText || "合计"}</div></td>
                  }
                  
                  return (
                    <td key={idx} style={{width: column.realWidth}}>
                      <div className="cell">{this.state.dataList[idx]}</div>
                    </td>
                  )
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

TableFooter.contextTypes = {
  $owerTable: PropTypes.object
};
