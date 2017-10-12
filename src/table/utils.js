let scrollBarWidth;

export function getScrollBarWidth(): number {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const dom = document.createElement('div');
  const body = document.body || dom;

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

export function getValueByPath(data: Object, path: string): any {
  if (typeof path !== 'string') return null;
  return path.split('.').reduce((pre, cur) => (pre || {})[cur], data);
}

export function getRowIdentity(row, rowKey) {
  if (typeof rowKey === 'string') {
    return getValueByPath(row, rowKey);
  } else if (typeof rowKey === 'function') {
    return rowKey(row);
  }
}

export function flattenColumns(columns) {
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
