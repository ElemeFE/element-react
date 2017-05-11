'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

/**
 * format
 *
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */

var _default = function _default(string) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length === 1 && _typeof(args[0]) === 'object') {
    args = args[0];
  }

  if (!args || !args.hasOwnProperty) {
    args = {};
  }

  return string.replace(RE_NARGS, function (match, prefix, i, index) {
    var result = void 0;

    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i;
    } else {
      result = Object.prototype.hasOwnProperty.call(args, i) ? args[i] : null;
      if (result === null || result === undefined) {
        return '';
      }

      return result;
    }
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RE_NARGS, 'RE_NARGS', 'src/locale/format.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/locale/format.js');
}();

;