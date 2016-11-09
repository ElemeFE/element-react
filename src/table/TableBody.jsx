import React from 'react';
import { Component, PropTypes } from '../../libs';
import classnames from 'classnames';

class BodyItem extends Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      hover: false
    };
  } 

  onMouseState(hover){
    this.setState({
      hover: hover
    });
  }

  render(){
    const { itemData, columns, rowIndex, rowClassName } = this.props;
    const rootClassName = this.classNames({
      'hover-row': this.state.hover,
      [rowClassName&&rowClassName(itemData, rowIndex)]: true
    });

    return (
      <tr 
        className={rootClassName}
        onMouseEnter={(e)=>{this.onMouseState(true)}} 
        onMouseLeave={e=>this.onMouseState(false)}>
        {
          columns.map((col, idx)=>{
            return (
              <td
                key={idx}
                style={{width: col.width?col.width: ''}}>
                <div className="cell">{itemData[col.prop]}</div>
              </td>
            )
          })
        }
      </tr>
    )
  }
}

BodyItem.propTypes = {
  columns: PropTypes.array.isRequired,
  itemData: PropTypes.object.isRequired,
};


export default class TableBody extends  Component{
  render() {
    const { 
      columns, 
      data, 
      style,
      rowClassName } = this.props;

    return (
      <table
        className={this.classNames('el-table__body')}
        cellPadding={0}
        cellSpacing={0}>
        <tbody>
          { 
            data.map((dataItem, dataIdx)=>{
              return (
                <BodyItem 
                  key={dataIdx} 
                  rowIndex={dataIdx}
                  rowClassName={rowClassName}
                  itemData={dataItem} 
                  columns={columns}/>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

TableBody.contextTypes = {
  $parent: React.PropTypes.object
};

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
