'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _utils = require('../../libs/utils');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _TimePanel = require('./panel/TimePanel');

var _TimePanel2 = _interopRequireDefault(_TimePanel);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function converSelectRange(props) {
  var selectableRange = [];
  if (props.selectableRange) {
    (function () {
      var ranges = props.selectableRange;
      var parser = _constants.TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
      var format = _constants.DEFAULT_FORMATS.timerange;

      ranges = Array.isArray(ranges) ? ranges : [ranges];
      selectableRange = ranges.map(function (range) {
        return parser(range, format);
      });
    })();
  }
  return selectableRange;
}

var TimePicker = function (_BasePicker) {
  _inherits(TimePicker, _BasePicker);

  _createClass(TimePicker, null, [{
    key: 'propTypes',

    // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
    get: function get() {
      return Object.assign({
        // '18:30:00 - 20:30:00'
        // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.arrayOf(_libs.PropTypes.string)])
      }, _BasePicker3.default.propTypes);
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.defaultProps);
    }
  }]);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props, 'time', {}));

    _this._onSelectionChange = (0, _utils.debounce)(_this.onSelectionChange.bind(_this), 200);
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'onSelectionChange',
    value: function onSelectionChange(start, end) {
      this.refs.reference.setSelectionRange(start, end);
      this.refs.reference.focus();
    }
  }, {
    key: 'pickerPannel',
    value: function pickerPannel(state, props) {
      var _this2 = this;

      return _react2.default.createElement(_TimePanel2.default, _extends({}, props, {
        key: 'time-picker-panel',
        currentDate: state.value,
        onCancel: function onCancel() {
          return _this2.setState({ pickerVisible: false });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange,
        selectableRange: converSelectRange(props),
        getPopperRefElement: function getPopperRefElement() {
          return _this2.refs.reference;
        },
        popperMixinOption: {
          placement: _constants.PLACEMENT_MAP[props.align] || _constants.PLACEMENT_MAP.left
        } }));
    }
  }]);

  return TimePicker;
}(_BasePicker3.default);

var _default = TimePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(converSelectRange, 'converSelectRange', 'src/date-picker/TimePicker.jsx');

  __REACT_HOT_LOADER__.register(TimePicker, 'TimePicker', 'src/date-picker/TimePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/TimePicker.jsx');
}();

;