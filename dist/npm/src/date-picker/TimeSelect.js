'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _TimeSelectPanel = require('./panel/TimeSelectPanel');

var _TimeSelectPanel2 = _interopRequireDefault(_TimeSelectPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSelect = function (_BasePicker) {
  _inherits(TimeSelect, _BasePicker);

  _createClass(TimeSelect, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({
        start: _libs.PropTypes.string,
        end: _libs.PropTypes.string,
        step: _libs.PropTypes.string,
        minTime: _libs.PropTypes.instanceOf(Date)
      }, _BasePicker3.default.propTypes);
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.defaultProps);
    }
  }]);

  function TimeSelect(props) {
    _classCallCheck(this, TimeSelect);

    // props, type, state
    return _possibleConstructorReturn(this, (TimeSelect.__proto__ || Object.getPrototypeOf(TimeSelect)).call(this, props, 'timeselect', {}));
  }

  _createClass(TimeSelect, [{
    key: 'isDateValid',
    value: function isDateValid(value) {
      return _get(TimeSelect.prototype.__proto__ || Object.getPrototypeOf(TimeSelect.prototype), 'isDateValid', this).call(this, value) && _TimeSelectPanel2.default.isValid(this.dateToStr(value), this.panelProps());
    }
  }, {
    key: 'panelProps',
    value: function panelProps(props) {
      var ps = props || this.props;
      var minTime = this.dateToStr(this.props.minTime);
      return _extends({}, ps, { minTime: minTime });
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      var value = this.dateToStr(state.value);
      return _react2.default.createElement(_TimeSelectPanel2.default, _extends({}, this.panelProps(props), {
        value: value,
        onPicked: this.onPicked.bind(this),
        dateParser: function dateParser(str) {
          var r = _this2.parseDate(str);
          return r;
        }
      }));
    }
  }]);

  return TimeSelect;
}(_BasePicker3.default);

var _default = TimeSelect;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimeSelect, 'TimeSelect', 'src/date-picker/TimeSelect.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/TimeSelect.jsx');
}();

;