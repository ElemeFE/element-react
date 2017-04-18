'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollBarWidth = getScrollBarWidth;
var scrollBarWidth = void 0;

function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  var outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;
  scrollBarWidth = widthNoScroll - widthWithScroll;
  outer.parentNode.removeChild(outer);

  return scrollBarWidth;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(scrollBarWidth, 'scrollBarWidth', 'src/scrollbar/scrollbar-width.js');

  __REACT_HOT_LOADER__.register(getScrollBarWidth, 'getScrollBarWidth', 'src/scrollbar/scrollbar-width.js');
}();

;