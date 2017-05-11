'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//taken from : http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
var ExtendableError = exports.ExtendableError = function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    _classCallCheck(this, ExtendableError);

    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  return ExtendableError;
}(Error);

var MethodImplementationRequiredError = exports.MethodImplementationRequiredError = function (_ExtendableError) {
  _inherits(MethodImplementationRequiredError, _ExtendableError);

  function MethodImplementationRequiredError(msg) {
    _classCallCheck(this, MethodImplementationRequiredError);

    return _possibleConstructorReturn(this, (MethodImplementationRequiredError.__proto__ || Object.getPrototypeOf(MethodImplementationRequiredError)).call(this, msg));
  }

  return MethodImplementationRequiredError;
}(ExtendableError);

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ExtendableError, 'ExtendableError', 'libs/utils/errors.js');

  __REACT_HOT_LOADER__.register(MethodImplementationRequiredError, 'MethodImplementationRequiredError', 'libs/utils/errors.js');
}();

;