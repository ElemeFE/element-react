'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputNumber = function (_Component) {
  _inherits(InputNumber, _Component);

  function InputNumber(props) {
    _classCallCheck(this, InputNumber);

    var _this = _possibleConstructorReturn(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).call(this, props));

    _this.state = {
      value: props.defaultValue,
      inputActive: false
    };
    return _this;
  }

  _createClass(InputNumber, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.value != this.props.value) {
        this.setState({ value: props.value });
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      e.preventDefault();

      switch (e.keyCode) {
        case 38:
          // KeyUp
          this.increase();
          break;
        case 40:
          // KeyDown
          this.decrease();
          break;
        default:
          break;
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var value = Number(this.state.value);

      if (isNaN(value) || value > this.props.max || value < this.props.min) {
        value = this.state.value;
      }

      this.setState({ value: value });
    }
  }, {
    key: 'onInput',
    value: function onInput(value) {
      this.setState({ value: value }, this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'minDisabled',
    value: function minDisabled() {
      return this.state.value - this.props.step < this.props.min;
    }
  }, {
    key: 'maxDisabled',
    value: function maxDisabled() {
      return this.state.value + this.props.step > this.props.max;
    }
  }, {
    key: 'increase',
    value: function increase() {
      var _props = this.props,
          step = _props.step,
          max = _props.max,
          disabled = _props.disabled;
      var _state = this.state,
          value = _state.value,
          inputActive = _state.inputActive;


      if (value + step > max || disabled) return;

      value = (0, _util.accAdd)(step, value);

      if (this.maxDisabled()) {
        inputActive = false;
      }

      this.setState({ value: value, inputActive: inputActive }, this.onChange);
    }
  }, {
    key: 'decrease',
    value: function decrease() {
      var _props2 = this.props,
          step = _props2.step,
          min = _props2.min,
          disabled = _props2.disabled;
      var _state2 = this.state,
          value = _state2.value,
          inputActive = _state2.inputActive;


      if (value - step < min || disabled) return;

      value = (0, _util.accSub)(value, step);

      if (this.minDisabled()) {
        inputActive = false;
      }

      this.setState({ value: value, inputActive: inputActive }, this.onChange);
    }
  }, {
    key: 'activeInput',
    value: function activeInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: true
        });
      }
    }
  }, {
    key: 'inactiveInput',
    value: function inactiveInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          controls = _props3.controls,
          disabled = _props3.disabled;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-input-number', this.props.size && 'el-input-number--' + this.props.size, {
            'is-disabled': disabled,
            'is-without-controls': !controls
          }) },
        controls && _react2.default.createElement(
          'span',
          {
            className: this.classNames("el-input-number__decrease", {
              'is-disabled': this.minDisabled()
            }),
            onClick: this.decrease.bind(this)
          },
          _react2.default.createElement('i', { className: 'el-icon-minus' })
        ),
        controls && _react2.default.createElement(
          'span',
          {
            className: this.classNames("el-input-number__increase", {
              'is-disabled': this.maxDisabled()
            }),
            onClick: this.increase.bind(this)
          },
          _react2.default.createElement('i', { className: 'el-icon-plus' })
        ),
        _react2.default.createElement(_input2.default, {
          ref: 'input',
          className: this.classNames({
            'is-active': this.state.inputActive
          }),
          value: this.state.value,
          disabled: this.props.disabled,
          size: this.props.size,
          onKeyDown: this.onKeyDown.bind(this),
          onBlur: this.onBlur.bind(this) })
      );
    }
  }]);

  return InputNumber;
}(_libs.Component);

var _default = InputNumber;
exports.default = _default;


InputNumber.propTypes = {
  defaultValue: _libs.PropTypes.number,
  value: _libs.PropTypes.number,
  step: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  disabled: _libs.PropTypes.bool,
  controls: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(InputNumber, 'InputNumber', 'src/input-number/InputNumber.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/input-number/InputNumber.jsx');
}();

;