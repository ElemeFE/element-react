'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadStyleString = exports.loadStyleString = function loadStyleString(css) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (document.getElementById(id)) return;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.id = id;
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(loadStyleString, 'loadStyleString', 'libs/utils/dom.js');
}();

;