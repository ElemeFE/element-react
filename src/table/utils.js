// @flow
import type { _Column } from "./Types";

const _document = (document: any);

let scrollBarWidth: ?number;

export function getScrollBarWidth(): ?number {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const dom = _document.createElement('div');
  const body = _document.body || dom;

  dom.style.visibility = 'hidden';
  dom.style.width = '100px';
  dom.style.position = 'absolute';
  dom.style.top = '-9999px';
  dom.style.overflow = 'scroll';

  body.appendChild(dom);

  const totalWidth = dom.offsetWidth;
  const widthWithoutScroll = dom.clientWidth;

  body.removeChild(dom);

  return totalWidth - widthWithoutScroll;
}

export function getValueByPath(data: Object, path: ?string): any {
  if (typeof path !== 'string') return null;
  return path.split('.').reduce((pre, cur) => (pre || {})[cur], data);
}

export function getRowIdentity(row: Object, rowKey: any): any {
  if (typeof rowKey === 'string') {
    return getValueByPath(row, rowKey);
  } else if (typeof rowKey === 'function') {
    return rowKey(row);
  }
}

export function flattenColumns(columns: Array<_Column>): Array<_Column> {
  const result = [];
  columns.forEach((column) => {
    if (column.subColumns) {
      result.push(...flattenColumns(column.subColumns));
    } else {
      result.push(column);
    }
  });
  return result;
}
