'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../libs/utils');

var _utils2 = require('./utils');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _DatePanel = require('./panel/DatePanel');

var _DatePanel2 = _interopRequireDefault(_DatePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_BasePicker) {
  _inherits(DatePicker, _BasePicker);

  _createClass(DatePicker, null, [{
    key: 'propTypes',

    // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
    get: function get() {
      return Object.assign({}, _BasePicker3.default.propTypes, (0, _utils.pick)(_DatePanel2.default.propTypes, ['value', 'showTime', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.defaultProps);
    }
  }]);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var type = 'date';
    switch (props.selectionMode) {
      case _utils2.SELECTION_MODES.YEAR:
        type = 'year';break;
      case _utils2.SELECTION_MODES.MONTH:
        type = 'month';break;
      case _utils2.SELECTION_MODES.WEEK:
        type = 'week';break;
    }
    return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props, type, {}));
  }

  _createClass(DatePicker, [{
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      return _react2.default.createElement(_DatePanel2.default, _extends({}, props, {
        value: state.value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);

  return DatePicker;
}(_BasePicker3.default);

var _default = DatePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DatePicker, 'DatePicker', 'src/date-picker/DatePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/DatePicker.jsx');
}();

;