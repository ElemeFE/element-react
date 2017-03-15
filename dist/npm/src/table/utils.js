'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scrollBarWidth = void 0;

var getScrollBarWidth = exports.getScrollBarWidth = function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var outer = document.createElement('div');
  var body = document.body || outer;

  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;
  var outerParent = outer.parentNode || body;
  outerParent.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(scrollBarWidth, 'scrollBarWidth', 'src/table/utils.js');

  __REACT_HOT_LOADER__.register(getScrollBarWidth, 'getScrollBarWidth', 'src/table/utils.js');
}();

;