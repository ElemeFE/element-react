'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleLayout = exports.calculateBodyWidth = exports.calculateFixedWidth = exports.enhanceColumns = exports.getDefaultColumn = exports.defaultColumn = undefined;

var _utils = require('./utils');

var MIN_COLUMN_WIDTH = 48;
var defaultColumn = exports.defaultColumn = {
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
var calcuateColumnsTotalWidth = function calcuateColumnsTotalWidth() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return columns.reduce(function (preWidth, next) {
    var nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
    if (next.minWidth && nextWidth < next.minWidth) {
      nextWidth = next.minWidth;
    }
    return preWidth + nextWidth;
  }, 0);
};

var getDefaultColumn = exports.getDefaultColumn = function getDefaultColumn(type, options) {
  var column = {};

  for (var name in options) {
    if (options.hasOwnProperty(name)) {
      var value = options[name];
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

var enhanceColumns = exports.enhanceColumns = function enhanceColumns() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var tableId = arguments[1];

  var columnIdSeed = 1;

  var _columns = columns.map(function (col) {
    var width = col.width && !isNaN(col.width) ? parseInt(col.width, 10) : undefined;
    var minWidth = col.minWidth && !isNaN(col.minWidth) ? parseInt(col.minWidth, 10) : MIN_COLUMN_WIDTH;
    var realWidth = col.width || MIN_COLUMN_WIDTH;

    //如果设定的宽度小于最小宽度，就用最小宽度做为真实宽度
    if (realWidth && minWidth && realWidth < minWidth) {
      realWidth = width = minWidth;
    }

    var columnId = tableId + 'column_' + columnIdSeed++;

    return getDefaultColumn(col.type, {
      id: columnId,
      label: col.label,
      property: col.prop || col.property,
      type: col.type,
      minWidth: minWidth,
      width: width,
      realWidth: realWidth,
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

  var fixedLeftColumns = _columns.filter(function (col) {
    return typeof col.fixed == 'boolean' && !!col.fixed || col.fixed == 'left';
  });
  var fixedRightColumns = _columns.filter(function (col) {
    return col.fixed == 'right';
  });
  var flattenColumns = _columns.filter(function (col) {
    return !col.fixed;
  });
  var newColumns = fixedLeftColumns.concat(flattenColumns).concat(fixedRightColumns);

  return {
    fixedLeftColumns: fixedLeftColumns,
    fixedRightColumns: fixedRightColumns,
    columns: newColumns
  };
};

var calculateFixedWidth = exports.calculateFixedWidth = function calculateFixedWidth(fxiedColumns) {
  var width = fxiedColumns.reduce(function (pre, next) {
    var preWidth = pre;
    var nextWidth = next.realWidth || next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);
  return width;
};

var calculateBodyWidth = exports.calculateBodyWidth = function calculateBodyWidth(columns, owerTableWidth) {
  var bodyMinWidth = calcuateColumnsTotalWidth(columns);
  return bodyMinWidth < owerTableWidth ? owerTableWidth : bodyMinWidth;
};

var scheduleLayout = exports.scheduleLayout = function scheduleLayout() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var owerTableWidth = arguments[1];
  var scrollY = arguments[2];
  var fit = arguments[3];

  var layout = {};
  var columnsWithNoWidth = columns.filter(function (col) {
    return typeof col.width == 'undefined';
  });
  var columnsWithWidth = columns.filter(function (col) {
    return typeof col.width != 'undefined';
  });

  //计算列占用最小宽度，不能使用realWidth
  var bodyMinWidth = columns.reduce(function (preWidth, next) {
    var nextWidth = next.width || MIN_COLUMN_WIDTH;
    return preWidth + nextWidth;
  }, 0);

  var gutterWidth = scrollY ? (0, _utils.getScrollBarWidth)() : 0;

  if (typeof owerTableWidth == 'number') {
    owerTableWidth -= gutterWidth;
  }

  if (typeof owerTableWidth == 'number' && bodyMinWidth <= owerTableWidth && fit) {
    var remainWidthForEach = (owerTableWidth - calcuateColumnsTotalWidth(columnsWithWidth)) / columnsWithNoWidth.length;
    remainWidthForEach = remainWidthForEach < MIN_COLUMN_WIDTH ? MIN_COLUMN_WIDTH : remainWidthForEach;
    columnsWithNoWidth.forEach(function (col) {
      col.realWidth = remainWidthForEach;
    });
    bodyMinWidth = calcuateColumnsTotalWidth(columns);
  } else {
    bodyMinWidth = calcuateColumnsTotalWidth(columns);
  }

  layout.bodyWidth = bodyMinWidth;

  return layout;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MIN_COLUMN_WIDTH, 'MIN_COLUMN_WIDTH', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(defaultColumn, 'defaultColumn', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(calcuateColumnsTotalWidth, 'calcuateColumnsTotalWidth', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(getDefaultColumn, 'getDefaultColumn', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(enhanceColumns, 'enhanceColumns', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(calculateFixedWidth, 'calculateFixedWidth', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(calculateBodyWidth, 'calculateBodyWidth', 'src/table/mixins.js');

  __REACT_HOT_LOADER__.register(scheduleLayout, 'scheduleLayout', 'src/table/mixins.js');
}();

;