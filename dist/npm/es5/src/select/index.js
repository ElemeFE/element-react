'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _OptionGroup = require('./OptionGroup');

var _OptionGroup2 = _interopRequireDefault(_OptionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Select2.default.Option = _Option2.default;
_Select2.default.OptionGroup = _OptionGroup2.default;

var _default = _Select2.default;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/index.js');
}();

;