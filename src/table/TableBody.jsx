import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class TableBody extends  Component{
  render() {
    const { columns, data, style } = this.props;

    return (
      <table
        className={this.classNames('el-table__body')}
        cellPadding={0}
        cellSpacing={0}>
        <tbody>
          {
            data.map((dataItem, dataIdx)=>{
              return (
                <tr key={dataIdx}>
                  {
                    columns.map((col, colIdx)=>{
                      return (
                        <td
                          key={colIdx}
                          style={{width: col.width?col.width: ''}}>
                          <div className="cell">{dataItem[col.prop]}</div>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
