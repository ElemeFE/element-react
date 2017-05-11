'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.require_condition = require_condition;

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorConditionFailed = function (_ExtendableError) {
  _inherits(ErrorConditionFailed, _ExtendableError);

  function ErrorConditionFailed() {
    _classCallCheck(this, ErrorConditionFailed);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (ErrorConditionFailed.__proto__ || Object.getPrototypeOf(ErrorConditionFailed)).call(this, args));
  }

  return ErrorConditionFailed;
}(_errors.ExtendableError);

function require_condition(condition) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pre-condition failed';

  if (!condition) {
    throw new ErrorConditionFailed(msg);
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ErrorConditionFailed, 'ErrorConditionFailed', 'libs/utils/assert.js');

  __REACT_HOT_LOADER__.register(require_condition, 'require_condition', 'libs/utils/assert.js');
}();

;