import React from 'react';
import ReactDom from 'react-dom';
import Checkbox from '../checkbox';
import { Component, PropTypes } from '../../libs';
import { getScrollBarWidth } from './utils'
import Filter from './filter'

export default class TableHeader extends  Component{
  constructor(props, context){
    super(props, context);

    this.$ower = context.$owerTable;

    this.state = {
      allChecked: false,
      dragging: false,
      dragState: {},
      sortStatus: 0, //0：没有排序 1：升序 2：降序
      sortPropertyName: '',
      filterParams: {column: null, condi: null}//存储当前的过滤条件
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
          column.realWidth = column.width = (column.minWidth > columnWidth? column.minWidth:columnWidth);

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
    this.setState({allChecked: checked});
    body.selectAll(checked);
  }

  onSort(column){
    const { sortStatus } = this.state;
    let  nextStatus;

    switch(sortStatus){
      case 0: nextStatus = 1;break;
      case 1: nextStatus = 2;break;
      case 2: nextStatus = 0;break;
    }

    this.setState({
      sortStatus: nextStatus,
      sortPropertyName: column.property
    });
    this.context.$owerTable.sortBy(nextStatus, column.property, column.sortMethod);
  }

  onFilter(e, filters, columnData){
    const { filterParams } = this.state;

    e.stopPropagation();

    let column = e.target.parentNode;
    let ower = this.context.$owerTable;
    let arrow, pos;

    while(column.tagName.toLowerCase() != 'th'){
      column = column.parentNode;
    } 

    pos = this.getPosByEle(column);

    arrow = column.querySelector('.el-icon-arrow-down');
    pos.x = this.getPosByEle(arrow).x + arrow.offsetWidth;
    pos.y = pos.y + column.offsetHeight - 3;


    let visible;
    if(arrow.className.indexOf('el-icon-arrow-up') > -1){
      arrow.className = arrow.className.replace('el-icon-arrow-up', '');
      visible = false;
    }else{
      arrow.className = arrow.className + ' el-icon-arrow-up';
      visible = true;
    }

    const onClose = ()=>{arrow.className = arrow.className.replace('el-icon-arrow-up', '')}

    ReactDom.render(
      <Filter
        defaultCondi={filterParams.column==columnData?filterParams.condi:null}
        onFilter={this.onFilterAction.bind(this, columnData)}
        visible={visible}
        onClose={onClose}
        filters={filters}
        position={pos} 
        ower={ower}/>, 
      ower.filterContainer
    );
  }

  onFilterAction(column, filterCondi){
    const { filterParams } = this.state;

    filterParams.column = filterCondi && filterCondi.length? column : null
    filterParams.condi = filterCondi && filterCondi.length ? filterCondi : null;

    this.context.$owerTable.filterBy(column, filterCondi);
  }

  getPosByEle(el){
    let y = el.offsetTop;
    let x = el.offsetLeft;

    while(el = el.offsetParent){
      y += el.offsetTop;
      x += el.offsetLeft;
    }

    return { x, y }
  }

  render() {
    const { columns, style, isScrollY, fixed } = this.props;
    const { sortPropertyName, sortStatus } = this.state;

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
                const className = this.classNames({
                  'is-center': column.align == 'center',
                  'is-right' : column.align == 'right',
                  'is-hidden': !this.props.fixed && column.fixed, 
                  'ascending': (sortPropertyName == column.property && sortStatus == 1),
                  'descending': (sortPropertyName == column.property && sortStatus == 2)
                });

                return (
                  <th
                    key={idx}
                    className={className}
                    onMouseMove={(e)=>this.handleMouseMove(e, column)}
                    onMouseDown={(e)=>this.handleMouseDown(e, column)}
                    style={{width: column.realWidth}}>
                    {
                      column.type == 'selection' && (
                        <div className="cell">
                          <Checkbox 
                            checked={this.state.allChecked}
                            onChange={e=>this.onAllChecked(e.target.checked)}/>
                        </div>)
                    }

                    {
                      column.type == 'index' && <div className="cell">#</div>
                    }

                    { 
                      column.type != 'selection' && 
                      column.type != 'index' && 
                      <div className="cell">
                        {column.label}

                        {
                          column.sortable ? (
                            <span className="caret-wrapper" onClick={()=>{this.onSort(column)}}>
                              <i className="sort-caret ascending"></i>
                              <i className="sort-caret descending"></i>
                            </span>) : ''
                        }

                        {
                          column.filterable ? (
                            <span 
                              className="el-table__column-filter-trigger" 
                              onClick={(e)=>this.onFilter(e, column.filters, column)}>
                              <i className="el-icon-arrow-down"></i>
                            </span>
                          ):''
                        }
                      </div>
                    }
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
