// @flow
import React from 'react';
import { Component, PropTypes } from '../../libs';
import Checkbox from '../checkbox';
import { getScrollBarWidth } from './utils'

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

  onToggleSelectedRow(isHiglight, dataItem){
    const fixedLeftBody = this.context.$owerTable.refs.fixedLeftBody;
    const mainBody = this.context.$owerTable.refs.mainBody;
    const fixedRightBody = this.context.$owerTable.refs.fixedRightBody;

    fixedLeftBody && fixedLeftBody.toggleSelectedRow(isHiglight, dataItem);
    mainBody && mainBody.toggleSelectedRow(isHiglight, dataItem);
    fixedRightBody && fixedRightBody.toggleSelectedRow(isHiglight, dataItem);

    const tableProps = this.context.$owerTable.props;
    tableProps.highlightCurrentRow && tableProps.onCurrentChange && tableProps.onCurrentChange(dataItem);
  }

  onChange(e){
    const { onSelected, itemData } = this.props;
    const checked = e.target.checked;
    onSelected && onSelected(checked, itemData);
  } 

  render(){
    const { itemData, columns, rowIndex, rowClassName, isHiglight, selected } = this.props;
    const rootClassName = this.classNames({
      'hover-row': this.state.hover,
      'current-row': isHiglight,
      [rowClassName?rowClassName(itemData, rowIndex):'']: true
    });

    return (
      <tr
        onClick={()=>{this.onToggleSelectedRow(!isHiglight, itemData)}}
        className={rootClassName}
        onMouseEnter={()=>{this.onMouseState(true)}}
        onMouseLeave={()=>{this.onMouseState(false)}}>
        {
          columns.map((column, idx)=>{
            let content = column.render ? column.render(itemData, column) : itemData[column.property];
            const className = this.classNames({ 
              'is-hidden': !this.props.fixed && column.fixed,
              'is-center': column.align == 'center',
              'is-right' : column.align == 'right'
            });
            return (
              <td
                key={idx}
                className={className}
                style={{width: column.realWidth}}>
                {
                  column.type == 'selection' && <div className="cell"><Checkbox checked={selected} onChange={(e)=>this.onChange(e)}/></div>
                }
                {
                  column.type == 'index' && <div className="cell">{rowIndex+1}</div>
                }
                { column.type != 'selection' && column.type != 'index' && <div className="cell">{content}</div>}
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
  constructor(props:Object, context:Object){
    super(props, context);
    this.rowPrefix = props.fixed + 'TableRow';

    this.state = {
      highlightRows: [],
      selected: []
    }
  }

  toggleSelectedRow(isHiglight:Boolean, rowData:any){
    const { highlightCurrentRow } = this.props;
    if(!highlightCurrentRow){
      return;
    }
    this.setState({
      highlightRows: isHiglight?[rowData]:[]
    });
  }

  hoverRowItem(rowIndex:number, hover:Boolean){
    var rcRowElement = this.refs[this.rowPrefix + rowIndex ];
    rcRowElement.setHoverState(hover);
  }

  isScrollY(){
    const tableBodyWrapper = this.context.$owerTable.refs.bodyWrapper;
    const contentHeight = tableBodyWrapper.offsetHeight - (this.isScrollX() ? getScrollBarWidth() : 0);
    return contentHeight < this.refs.root.offsetHeight;
  }

  isScrollX(){
    const tableBodyWrapper = this.context.$owerTable.refs.bodyWrapper;
    return tableBodyWrapper.offsetWidth < this.refs.root.offsetWidth;
  }

  onSelected(checked:Boolean, data:Object){
    const { selected } = this.state;
    const dataList = this.props.data;
    const { onSelectChange } = this.context.$owerTable.props;

    checked ? selected.push(data) : selected.splice(selected.indexOf(data), 1);

    this.context.$owerTable.refs.header.setState({allChecked : dataList.length == selected.length});
    this.setState({ selected });

    onSelectChange && onSelectChange(data, checked);
  }

  selectAll(checked:Boolean){
    const { data } = this.props;
    const { onSelectAll } = this.context.$owerTable.props;

    this.setState({selected: checked ? data.slice(0) : []});
    onSelectAll && onSelectAll(checked ? data : [], checked);
  }

  render() {
    const { 
      columns, 
      data, 
      rowClassName,
      fixed,
      highlightCurrentRow
    } = this.props;

    const { highlightRows, selected } = this.state;
    const rowPrefix = this.rowPrefix;

    return (
      <table
        ref="root"
        style={this.style()}
        className={this.classNames('el-table__body')}
        cellPadding={0}
        cellSpacing={0}>
        <tbody>
          {
            data.map((dataItem, dataIdx)=>{
              const refId = rowPrefix + dataIdx;
              const isHiglight = (highlightRows[0] == dataItem);
              return (
                <BodyItem 
                  fixed={fixed}
                  onSelected={(c, d)=>{this.onSelected(c, d)}}
                  selected={selected.indexOf(dataItem) > -1}
                  key={dataIdx}
                  ref={refId}
                  isHiglight={isHiglight}
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
