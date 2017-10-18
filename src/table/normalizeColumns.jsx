import * as React from 'react';
import { getValueByPath } from "./utils";

import type {
  Column,
  _Column,
} from "./Types";

function defaultRender(row: Object, column: _Column) {
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
    className: 'el-table-column--selection',
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
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

let columnIDSeed = 1;

export default function normalizeColumns(columns: Array<Column>, tableIDSeed: number): Array<_Column> {
  return columns.map((column) => {
    let _column;
    if (column.subColumns) {
      // renderHeader
      _column = Object.assign({}, column);
      _column.subColumns = normalizeColumns(column.subColumns, tableIDSeed);
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

      const id = `el-table_${tableIDSeed}_column_${columnIDSeed++}`;

      _column = Object.assign({
        id,
        sortable: false,
        resizable: true,
        showOverflowTooltip: false,
        align: 'left',
        filterMultiple: true
      }, column, {
        columnKey: column.columnKey || id,
        width,
        minWidth,
        realWidth: width || minWidth,
        property: column.prop || column.property,
        render: column.render || defaultRender,
        align: column.align ? 'is-' + column.align : null,
        headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
        filterable: column.filters && column.filterMethod,
        filterOpened: false,
        filteredValue: column.filteredValue || null,
        filterPlacement: column.filterPlacement || 'bottom',
      }, defaults[column.type || 'default'], forced[column.type]);
    }

    return _column;
  })
}