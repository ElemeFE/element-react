// @flow
let scrollBarWidth;

export function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const dom = document.createElement('div');
  const body:any = document.body || dom;

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

export function _getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
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
    if (column.subColumns) {
      result.push(...flattenColumns(column.subColumns));
    } else {
      result.push(column);
    }
  });
  return result;
}
