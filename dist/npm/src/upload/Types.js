"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawFile = exports.RawFile = function (_File2) {
  _inherits(RawFile, _File2);

  function RawFile() {
    _classCallCheck(this, RawFile);

    return _possibleConstructorReturn(this, (RawFile.__proto__ || Object.getPrototypeOf(RawFile)).apply(this, arguments));
  }

  return RawFile;
}(File);

// 自定义file类型


var _ProgressEvent = exports._ProgressEvent = function (_ProgressEvent2) {
  _inherits(_ProgressEvent, _ProgressEvent2);

  function _ProgressEvent() {
    _classCallCheck(this, _ProgressEvent);

    return _possibleConstructorReturn(this, (_ProgressEvent.__proto__ || Object.getPrototypeOf(_ProgressEvent)).apply(this, arguments));
  }

  return _ProgressEvent;
}(ProgressEvent);

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RawFile, "RawFile", "src/upload/Types.js");

  __REACT_HOT_LOADER__.register(_ProgressEvent, "_ProgressEvent", "src/upload/Types.js");
}();

;