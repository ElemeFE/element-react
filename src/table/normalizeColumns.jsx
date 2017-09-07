import * as React from 'react';
import Checkbox from '../checkbox';
import Tag from '../tag';
import { getValueByPath } from "./utils";

function defaultRender(row, column) {
  return getValueByPath(row, column.property);
}

const defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  expand: {
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

const forced = {
  expand: {
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  },
  index: {
    sortable: false
  },
  selection: {
    sortable: false,
    resizable: false
  }
};

// function getDefaultColumn() {
//
// }

export default function normalizeColumns(columns) {
  return columns.map((column) => {
    let _column;
    if (column.subColumns) {
      // renderHeader
      _column = Object.assign({}, columns);
      _column.subColumns = normalizeColumns(column.subColumns);
    } else {
      let { width, minWidth } = column;

      if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);
        if (isNaN(minWidth)) {
          minWidth = 80;
        }
      } else {
        minWidth = 80;
      }

      _column = Object.assign({}, column, {
        width,
        minWidth,
        realWidth: width || minWidth,
        property: column.prop || column.property,
        render: column.render || defaultRender,
        align: column.align ? 'is-' + column.align : null,
        headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
      }, defaults[column.type || 'default'], forced[column.type]);
    }

    return _column;
  })
}