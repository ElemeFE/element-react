import { getScrollBarWidth } from './utils'

const MIN_COLUMN_WIDTH = 48;

export const defaultColumn = {
  default: {
    order: ''
  },

  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },

  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

//计算列实际占用宽度, 必须用realWidth
const calcuateColumnsTotalWidth = (columns=[])=>{
  return columns.reduce((preWidth, next)=>{
    var nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
    if(next.minWidth && nextWidth < next.minWidth){
      nextWidth = next.minWidth;
    }
    return preWidth + nextWidth;
  }, 0);
}

export const getDefaultColumn = (type, options)=>{
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

export const enhanceColumns = (columns=[], tableId)=>{
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

    return getDefaultColumn(col.type, {
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
      render: col.render
    });
  });

  const fixedLeftColumns = _columns.filter((col)=>{ return (typeof col.fixed == 'boolean' &&  !!col.fixed) || col.fixed == 'left';});
  const fixedRightColumns = _columns.filter((col)=>{return col.fixed == 'right'});
  const flattenColumns = _columns.filter((col)=>{return !col.fixed});
  const newColumns = fixedLeftColumns.concat(flattenColumns).concat(fixedRightColumns);

  return {
    fixedLeftColumns,
    fixedRightColumns,
    columns: newColumns
  };
};


export const calculateFixedWidth = (fxiedColumns=[])=>{
  const width = fxiedColumns.reduce((pre, next)=>{
    var preWidth = pre;
    var nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);
  return width;
};

export const calculateBodyWidth = (columns, owerTableWidth)=>{
  let bodyMinWidth = calcuateColumnsTotalWidth(columns);
  if(bodyMinWidth < owerTableWidth){
    return owerTableWidth;
  }else{
    return bodyMinWidth;
  }
}

export const scheduleLayout = (columns, owerTableWidth, scrollY, fit)=>{
  const layout = {};
  const columnsWithNoWidth = columns.filter((col)=>typeof col.width == 'undefined');
  const columnsWithWidth = columns.filter((col)=>typeof col.width != 'undefined');

  //计算列占用最小宽度，不能使用realWidth
  let bodyMinWidth = columns.reduce((preWidth, next)=>{
    var nextWidth = next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);

  const gutterWidth = scrollY ? getScrollBarWidth() : 0;
  owerTableWidth -= gutterWidth;

  if(bodyMinWidth <= owerTableWidth && fit){
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




