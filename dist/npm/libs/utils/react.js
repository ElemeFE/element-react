'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstChild = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function firstChild(props) {
  var childrenArray = _react2.default.Children.toArray(props.children);
  return childrenArray[0] || null;
}

exports.firstChild = firstChild;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(firstChild, 'firstChild', 'libs/utils/react.js');
}();

;