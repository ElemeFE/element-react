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

var _TimeRangePanel = require('./panel/TimeRangePanel');

var _TimeRangePanel2 = _interopRequireDefault(_TimeRangePanel);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeRangePicker = function (_BasePicker) {
  _inherits(TimeRangePicker, _BasePicker);

  _createClass(TimeRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.propTypes);
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.defaultProps);
    }
  }]);

  function TimeRangePicker(props) {
    _classCallCheck(this, TimeRangePicker);

    var _this = _possibleConstructorReturn(this, (TimeRangePicker.__proto__ || Object.getPrototypeOf(TimeRangePicker)).call(this, props, 'timerange', {}));

    _this._onSelectionChange = (0, _utils.debounce)(_this.onSelectionChange.bind(_this), 200);
    return _this;
  }

  _createClass(TimeRangePicker, [{
    key: 'onSelectionChange',
    value: function onSelectionChange(start, end) {
      this.refs.reference.setSelectionRange(start, end);
      this.refs.reference.focus();
    }
  }, {
    key: 'pickerPannel',
    value: function pickerPannel(state, props) {
      var _this2 = this;

      return _react2.default.createElement(_TimeRangePanel2.default, _extends({}, props, {
        key: 'time-range-picker-panel',
        currentDates: state.value,
        onCancel: function onCancel() {
          return _this2.setState({ pickerVisible: false });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange,
        getPopperRefElement: function getPopperRefElement() {
          return _this2.refs.reference;
        },
        popperMixinOption: {
          placement: _constants.PLACEMENT_MAP[props.align] || _constants.PLACEMENT_MAP.left
        } }));
    }
  }]);

  return TimeRangePicker;
}(_BasePicker3.default);

var _default = TimeRangePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimeRangePicker, 'TimeRangePicker', 'src/date-picker/TimeRangePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/TimeRangePicker.jsx');
}();

;