const MIN_COLUMN_WIDTH = 80;

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

export const getDefaultColumn = (type, options)=>{
  const column = {};

  Object.assign(column, defaultColumn[type || 'default']);

  for (var name in options) {
    if (options.hasOwnProperty(name)) {
      const value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = MIN_COLUMN_WIDTH;
  }

  column.realWidth = column.width || column.minWidth;

  return column;
};


export const enhanceColumns = (columns=[], tableId)=>{
  let columnIdSeed = 1;

  const _columns = columns.map((col)=>{
    let width = col.width && !isNaN(col.width)? parseInt(col.width, 10): null;
    let minWidth = col.minWidth && !isNaN(minWidth)? parseInt(col.minWidth, 10): null;

    const columnId = tableId + 'column_' + columnIdSeed++

    return getDefaultColumn(col.type, {
      id: columnId,
      label: col.label,
      property: col.prop || col.property,
      type: col.type,
      minWidth,
      width,
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

  const fixedLeftColumns = _columns.filter((col)=>{
    return (typeof col.fixed == 'boolean' &&  !!col.fixed) || col.fixed == 'left';
  });
  const flattenColumns = _columns.filter((col)=>{return !col.fixed});
  const fixedRightColumns = _columns.filter((col)=>{return col.fixed == 'right'});
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
  let bodyMinWidth = columns.reduce((preWidth, next)=>{
    var nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);

  if(bodyMinWidth < owerTableWidth){
    return owerTableWidth;
  }else{
    return bodyMinWidth;
  }
}

export const updateColumns = ()=>{

};




