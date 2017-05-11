'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DialogBody = require('./DialogBody');

var _DialogBody2 = _interopRequireDefault(_DialogBody);

var _DialogFooter = require('./DialogFooter');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Dialog2.default.Body = _DialogBody2.default;
_Dialog2.default.Footer = _DialogFooter2.default;

var _default = _Dialog2.default;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dialog/index.js');
}();

;