// @flow
import { getScrollBarWidth } from './utils'

const MIN_COLUMN_WIDTH = 48;

export const defaultColumn = {
  default: {
    order: null
  },

  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: null
  },

  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: null
  },

  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48
  }
};

/*
 *@param: columns<Array>
 *计算表格最低宽度
 *计算列实际占用宽度, 必须用realWidth
 */
const calcuateColumnsTotalWidth = (columns: Array<Object>=[])=>{
  return columns.reduce((preWidth, next)=>{
    const subColumns = next.subColumns;
    let nextWidth;

    if(subColumns instanceof Array){
      nextWidth = preWidth + calcuateColumnsTotalWidth(subColumns);
    }else{
      nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
      if(next.minWidth && nextWidth < next.minWidth){
        nextWidth = next.minWidth;
      }
      nextWidth = preWidth + nextWidth;
    }
    return nextWidth;
  }, 0);
}

export const getDefaultColumn = (type: string, options: Object)=>{
  const column = {};

  for (var name in options) {
    if (options.hasOwnProperty(name)) {
      const value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  Object.assign(column, defaultColumn[type || 'default']);

  if (!column.minWidth) {
    column.minWidth = MIN_COLUMN_WIDTH;
  }

  column.realWidth = column.width || column.minWidth;

  return column;
};

export const execColRowSpan = (enhancedColumns: Array<Object>=[])=>{
  let maxLevel = 0;

  const getColByObject = (item)=>{
    let colSpan = 0;
    if(item.subColumns instanceof Array){
      for(let i=0; i < item.subColumns.length; i++){
        colSpan += getColByObject(item.subColumns[i]);
      }
    }else{
      colSpan = 1;
    }
    return colSpan;
  }

  const recursiveCol = (ehlist: Array<Object>=[], level: number)=>{
    ehlist.forEach((item: any)=>{
      item.level = level;

      if(item.subColumns instanceof Array){
        item.colSpan = getColByObject(item);
        recursiveCol(item.subColumns, ++level);
        console.log(enhancedColumns);
      }else{
        maxLevel = level > maxLevel ? level : maxLevel;
      }
    });
    return ehlist;
  };

  const recursiveRow = (ehlist: Array<Object>=[])=>{
    ehlist.forEach((item: any)=>{
      if(!item.subColumns){
        item.rowSpan = maxLevel - item.level + 1;
      }
    });
  }

  recursiveRow(recursiveCol(enhancedColumns, 0));
};

export const enhanceColumns = (columns: Array<Object>=[], tableId: number)=>{
  let columnIdSeed = 1;

  const _columns = columns.map((col)=>{
    let width = col.width && !isNaN(col.width)? parseInt(col.width, 10): undefined;
    let minWidth = col.minWidth && !isNaN(col.minWidth)? parseInt(col.minWidth, 10): MIN_COLUMN_WIDTH;
    let realWidth = col.width || MIN_COLUMN_WIDTH;

    //如果设定的宽度小于最小宽度，就用最小宽度做为真实宽度
    if(realWidth && minWidth && realWidth < minWidth){
      realWidth = width = minWidth;
    }

    const columnId = tableId + 'column_' + columnIdSeed++

    var ehObj = getDefaultColumn(col.type, {
      id: columnId,
      label: col.label,
      property: col.prop || col.property,
      type: col.type,
      minWidth,
      width,
      realWidth,
      align: col.align,
      sortable: col.sortable,
      sortMethod: col.sortMethod,
      resizable: col.resizable,
      showOverflowTooltip: col.showOverflowTooltip || col.showTooltipWhenOverflow,
      formatter: col.formatter,
      selectable: col.selectable,
      reserveSelection: col.reserveSelection,
      fixed: col.fixed,
      filterMethod: col.filterMethod,
      filters: col.filters,
      filterable: col.filters || col.filterMethod,
      filterMultiple: col.filterMultiple,
      filterOpened: false,
      filteredValue: [],
      render: col.render,
      expandPannel: col.expandPannel
    });

    if(col.subColumns instanceof Array){
      ehObj.subColumns = enhanceColumns(col.subColumns, tableId).columns;
    }

    return ehObj;
  });

  execColRowSpan(_columns);

  const filterFixedLeftColumns = (list=[])=>{
    return list.filter((col)=>{ 
      return (typeof col.fixed == 'boolean' &&  !!col.fixed) || col.fixed == 'left';
    });
  };

  const fixedLeftColumns = filterFixedLeftColumns(_columns);
  const fixedRightColumns = _columns.filter((col)=>{return col.fixed == 'right'});
  const flattenColumns = _columns.filter((col)=>{return !col.fixed});
  const newColumns = fixedLeftColumns.concat(flattenColumns).concat(fixedRightColumns);

  return {
    fixedLeftColumns,
    fixedRightColumns,
    columns: newColumns
  };
};




export const calculateFixedWidth = (fxiedColumns: Array<Object>)=>{
  const width = fxiedColumns.reduce((pre, next)=>{
    var preWidth = pre;
    var nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);
  return width;
};

export const calculateBodyWidth = (columns: Array<Object>, owerTableWidth: number)=>{
  const bodyMinWidth:number = calcuateColumnsTotalWidth(columns);
  return (bodyMinWidth < owerTableWidth ? owerTableWidth : bodyMinWidth)
}

export const scheduleLayout = (
  columns: Array<Object> = [], 
  owerTableWidth: '' | number, 
  scrollY: number, 
  fit: boolean) => {

  const layout = {};
  const columnsWithNoWidth = columns.filter((col)=>typeof col.width == 'undefined');
  const columnsWithWidth = columns.filter((col)=>typeof col.width != 'undefined');

  //计算列占用最小宽度，不能使用realWidth
  let bodyMinWidth = columns.reduce((preWidth, next)=>{
    var nextWidth = next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);

  const gutterWidth:number = scrollY ? getScrollBarWidth() : 0;
  
  if(typeof owerTableWidth == 'number'){
    owerTableWidth -= gutterWidth;
  }

  if(typeof owerTableWidth == 'number' && bodyMinWidth <= owerTableWidth && fit){
    let remainWidthForEach = (owerTableWidth - calcuateColumnsTotalWidth(columnsWithWidth)) / columnsWithNoWidth.length;
    remainWidthForEach = remainWidthForEach < MIN_COLUMN_WIDTH ? MIN_COLUMN_WIDTH : remainWidthForEach;
    columnsWithNoWidth.forEach((col)=>{col.realWidth = remainWidthForEach});
    bodyMinWidth = calcuateColumnsTotalWidth(columns);
  }else{
    bodyMinWidth = calcuateColumnsTotalWidth(columns);
  }

  layout.bodyWidth = bodyMinWidth;

  return layout;
};




