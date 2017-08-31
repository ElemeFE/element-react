// @flow
let scrollBarWidth;

export const getScrollBarWidth = () => {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const outer = document.createElement('div');
  var body:any = document.body || outer;

  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  const outerParent = outer.parentNode || body;
  outerParent.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

export function getValueByPath(data, path) {
  if (typeof path !== 'string') return null;
  return path.split('.').reduce((pre, cur) => pre[cur], data);
}

export function getRowIdentity(row, rowKey) {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    return getValueByPath(row, rowKey);
  } else if (typeof rowKey === 'function') {
    return rowKey(row);
  }
}

export function flattenColumns(columns) {
  const result = [];
  columns.forEach((column) => {
    result.push(column);
    if (column.subColumns) {
      result.push(...flattenColumns(column.subColumns));
    }
  });
  return result;
}
