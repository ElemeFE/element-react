import React from 'react';
import ReactDom from 'react-dom';
import { Component, PropTypes } from '../../libs';

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
          column.width = column.realWidth = columnWidth;

          //this.store.scheduleLayout();

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
              columns.map((column, idx)=>{
                return (
                  <th
                    key={idx}
                    onMouseMove={(e)=>this.handleMouseMove(e, column)}
                    onMouseDown={(e)=>this.handleMouseDown(e, column)}
                    style={{width: column.width?column.width:''}}>
                    <div className="cell">{column.label}</div>
                  </th>)
              })
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
