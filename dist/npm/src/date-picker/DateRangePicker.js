'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../libs/utils');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _DateRangePanel = require('./panel/DateRangePanel');

var _DateRangePanel2 = _interopRequireDefault(_DateRangePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRangePicker = function (_BasePicker) {
  _inherits(DateRangePicker, _BasePicker);

  _createClass(DateRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.propTypes, (0, _utils.pick)(_DateRangePanel2.default.propTypes, ['value', 'showTime', 'shortcuts']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.defaultProps);
    }
  }]);

  function DateRangePicker(props) {
    _classCallCheck(this, DateRangePicker);

    return _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props, 'daterange', {}));
  }

  _createClass(DateRangePicker, [{
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var value = state.value;
      if (value instanceof Date) {
        value = [value, null];
      }
      return _react2.default.createElement(_DateRangePanel2.default, _extends({}, props, {
        value: value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);

  return DateRangePicker;
}(_BasePicker3.default);

var _default = DateRangePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DateRangePicker, 'DateRangePicker', 'src/date-picker/DateRangePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/DateRangePicker.jsx');
}();

;