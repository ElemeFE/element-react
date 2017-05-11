'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

var _zhCN = require('./lang/zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _lang = _zhCN2.default;

function use(lang) {
  _lang = lang;
}

function t(path, options) {
  var array = path.split('.');
  var current = _lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    var value = current[property];
    if (i === j - 1) return (0, _format2.default)(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
}

var _default = {
  use: use,
  t: t
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_lang, '_lang', 'src/locale/index.js');

  __REACT_HOT_LOADER__.register(use, 'use', 'src/locale/index.js');

  __REACT_HOT_LOADER__.register(t, 't', 'src/locale/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/locale/index.js');
}();

;