import React from 'react';
import ReactDom from 'react-dom';
import Checkbox from '../checkbox';
import { Component, PropTypes } from '../../libs';
import { getScrollBarWidth } from './utils'

export default class TableHeader extends  Component{
  constructor(props, context){
    super(props, context);

    this.$ower = context.$owerTable;

    this.state = {
      dragging: false,
      dragState: {}
    };
  }

  handleMouseMove(event, column){
    let target = event.target;
    while (target && target.tagName !== 'TH') {
      target = target.parentNode;
    }

    if (!column || 
      !this.$ower.props.border || 
      column.type == 'selection' ||
      column.type == 'index' ||
      (typeof column.resizable != 'undefined' && column.resizable)) {
      return;
    }

    if (!this.dragging) {
      let rect = target.getBoundingClientRect();
      var bodyStyle = document.body.style;

      if (rect.width > 12 && rect.right - event.pageX < 8) {
        bodyStyle.cursor = 'col-resize';
        this.draggingColumn = column;
      } else if (!this.dragging) {
        bodyStyle.cursor = '';
        this.draggingColumn = null;
      }
    }
  }

  handleMouseDown(event, column){
    if (this.draggingColumn && this.$ower.props.border) {
      this.dragging = true;

      let columnEl = event.target;
      while (columnEl && columnEl.tagName !== 'TH') {
        columnEl = columnEl.parentNode;
      }

      this.$ower.setState({resizeProxyVisible: true});

      const tableEl = ReactDom.findDOMNode(this.context.$owerTable);
      const tableLeft = tableEl.getBoundingClientRect().left;
      const columnRect = columnEl.getBoundingClientRect();
      const minLeft = columnRect.left - tableLeft + 30;

      columnEl.classList.add('noclick');

      this.state.dragState = {
        startMouseLeft: event.clientX,
        startLeft: columnRect.right - tableLeft,
        startColumnLeft: columnRect.left - tableLeft,
        tableLeft
      };

      const resizeProxy = this.context.$owerTable.refs.resizeProxy;
      resizeProxy.style.left = this.state.dragState.startLeft + 'px';

      document.onselectstart = function() { return false; };
      document.ondragstart = function() { return false; };

      const handleMouseMove = (event) => {
        const deltaLeft = event.clientX - this.state.dragState.startMouseLeft;
        const proxyLeft = this.state.dragState.startLeft + deltaLeft;

        resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
      };

      const handleMouseUp = () => {
        if (this.dragging) {
          const finalLeft = parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - this.state.dragState.startColumnLeft;
          //width本应为配置的高度， 如果改变过宽度， realWidth 与 width永远保持一致
          //这列不再参与宽度的自动重新分配
          column.realWidth = column.width = columnWidth;

          this.context.$owerTable.scheduleLayout();

          document.body.style.cursor = '';
          this.dragging = false;
          this.draggingColumn = null;
          this.dragState = {};

          this.context.$owerTable.setState({resizeProxyVisible: false});
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.onselectstart = null;
        document.ondragstart = null;

        setTimeout(function() {
          columnEl.classList.remove('noclick');
        }, 0);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }

  onAllChecked(checked){
    const body = this.context.$owerTable.refs.mainBody;
    body.selectAll(checked);
  }

  render() {
    const { columns, style, isScrollY, fixed } = this.props;
    return (
      <table
        style={style}
        className={this.classNames('el-table__header')}
        cellPadding={0}
        cellSpacing={0}>
        <thead>
          <tr>
            {
              columns.map((column, idx)=>{
                return (
                  <th
                    key={idx}
                    className={this.classNames({'is-hidden': !this.props.fixed && column.fixed})}
                    onMouseMove={(e)=>this.handleMouseMove(e, column)}
                    onMouseDown={(e)=>this.handleMouseDown(e, column)}
                    style={{width: column.realWidth}}>
                    {
                      column.type == 'selection' && <div className="cell" onChange={e=>this.onAllChecked(e.target.checked)}><Checkbox/></div>
                    }
                    {
                      column.type == 'index' && <div className="cell">#</div>
                    }
                    { column.type != 'selection' && column.type != 'index' && <div className="cell">{column.label}</div>}
                  </th>)
              })
            }

            {
              !fixed && isScrollY&& <th className="gutter" style={{ width:  getScrollBarWidth()+ 'px' }}></th>
            }
          </tr>
        </thead>
      </table>
    )
  }
}

TableHeader.contextTypes = {
  $owerTable: React.PropTypes.object
};

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired
};
