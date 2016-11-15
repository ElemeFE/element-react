import React from 'react';
import { Component, PropTypes } from '../../libs';

class BodyItem extends Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      hover: false
    };
  }

  onMouseState(hover){
    const fixedLeftBody = this.context.$owerTable.refs.fixedLeftBody;
    const mainBody = this.context.$owerTable.refs.mainBody;
    const fixedRightBody = this.context.$owerTable.refs.fixedRightBody;

    fixedLeftBody && fixedLeftBody.hoverRowItem(this.props.rowIndex, hover);
    mainBody && mainBody.hoverRowItem(this.props.rowIndex, hover);
    fixedRightBody && fixedRightBody.hoverRowItem(this.props.rowIndex, hover);
  }

  setHoverState(hover){
    this.setState({
      hover: hover
    });
  }

  render(){
    const { itemData, columns, rowIndex, rowClassName } = this.props;
    const rootClassName = this.classNames({
      'hover-row': this.state.hover,
      [rowClassName?rowClassName(itemData, rowIndex):'']: true
    });

    return (
      <tr
        className={rootClassName}
        onMouseEnter={()=>{this.onMouseState(true)}}
        onMouseLeave={()=>this.onMouseState(false)}>
        {
          columns.map((col, idx)=>{
            let content = col.render ? col.render(itemData, col) : itemData[col.property];
            return (
              <td
                key={idx}
                style={{width: col.width?col.width: ''}}>
                <div className="cell">{content}</div>
              </td>
            )
          })
        }
      </tr>
    )
  }
}


BodyItem.contextTypes = {
  $owerTable: React.PropTypes.object
};

BodyItem.propTypes = {
  columns: PropTypes.array.isRequired,
  itemData: PropTypes.object.isRequired,
};

export default class TableBody extends  Component{
  constructor(props, context){
    super(props, context);
    this.rowPrefix = props.fixed + 'TableRow';
  }
  hoverRowItem(rowIndex, hover){
    var rcRowElement = this.refs[this.rowPrefix + rowIndex ];
    rcRowElement.setHoverState(hover);
  }
  render() {
    const { 
      columns, 
      data, 
      rowClassName,
      fixed
    } = this.props;

    const rowPrefix = this.rowPrefix;

    return (
      <table
        className={this.classNames('el-table__body')}
        cellPadding={0}
        cellSpacing={0}>
        <tbody>
          {
            data.map((dataItem, dataIdx)=>{
              var refId = rowPrefix + dataIdx;
              return (
                <BodyItem 
                  key={dataIdx}
                  ref={refId}
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
  $owerTable: React.PropTypes.object
};

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
