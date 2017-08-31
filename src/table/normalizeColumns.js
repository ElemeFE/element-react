import Checkbox from '../checkbox';
import Tag from '../tag';
import { getValueByPath } from "./utils";

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

const forced = {};

// function getDefaultColumn() {
//
// }

export default function normalizeColumns(columns) {
  return columns.map((column) => {
    let _column = {};
    if (column.subColumns) {
      _column.label = column.label;
      _column.subColumns = normalizeColumns(column.subColumns);
    } else {
      let width = column.width;
      if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      let minWidth = column.minWidth;
      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);
        if (isNaN(minWidth)) {
          minWidth = 80;
        }
      }

      _column = Object.assign({}, column, {
        width,
        minWidth,
        realWidth: width || minWidth,
        property: column.prop || column.property,
        // render: column.render || getValueByPath,
        align: column.align ? 'is-' + column.align : null,
        headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
      }, defaults[column.type]);
    }

    return _column;
  })
}