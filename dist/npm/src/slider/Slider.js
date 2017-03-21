'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _inputNumber = require('../input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = {
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      precision: 0,
      inputValue: 0,
      dragging: false
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          range = _props.range,
          value = _props.value,
          min = _props.min,
          max = _props.max,
          step = _props.step;
      var _state = this.state,
          firstValue = _state.firstValue,
          secondValue = _state.secondValue,
          oldValue = _state.oldValue,
          inputValue = _state.inputValue,
          precision = _state.precision;


      if (range) {
        if (Array.isArray(value)) {
          firstValue = Math.max(min, value[0]);
          secondValue = Math.min(max, value[1]);
        } else {
          firstValue = min;
          secondValue = max;
        }

        oldValue = [firstValue, secondValue];
      } else {
        if (typeof value !== 'number' || isNaN(value)) {
          firstValue = min;
        } else {
          firstValue = Math.min(max, Math.max(min, value));
        }

        oldValue = firstValue;
      }

      var precisions = [min, max, step].map(function (item) {
        var decimal = ('' + item).split('.')[1];
        return decimal ? decimal.length : 0;
      });

      precision = Math.max.apply(null, precisions);
      inputValue = inputValue || firstValue;

      this.setState({ firstValue: firstValue, secondValue: secondValue, oldValue: oldValue, inputValue: inputValue, precision: precision });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (props.min != this.props.min || props.max != this.props.max) {
        this.setValues();
      }

      if (props.value != this.props.value) {
        var _oldValue = this.state.oldValue;

        if (this.state.dragging || Array.isArray(this.props.value) && Array.isArray(props.value) && Array.isArray(_oldValue) && this.props.value.every(function (item, index) {
          return item === _oldValue[index];
        })) {
          return;
        }

        this.setValues();
      }

      if (state.firstValue != this.state.firstValue) {
        if (this.props.range) {
          this.setState({
            inputValue: [this.minValue(), this.maxValue()]
          });
        } else {
          this.setState({
            inputValue: this.state.firstValue
          });
        }
      }

      if (state.secondValue != this.state.secondValue) {
        if (this.props.range) {
          this.setState({
            inputValue: [this.minValue(), this.maxValue()]
          });
        }
      }
    }
  }, {
    key: 'valueChanged',
    value: function valueChanged() {
      var _props2 = this.props,
          range = _props2.range,
          value = _props2.value;
      var oldValue = this.state.oldValue;


      if (range && Array.isArray(oldValue)) {
        return ![this.minValue(), this.maxValue()].every(function (item, index) {
          return item === oldValue[index];
        });
      } else {
        return value !== oldValue;
      }
    }
  }, {
    key: 'setValues',
    value: function setValues() {
      var _props3 = this.props,
          range = _props3.range,
          value = _props3.value,
          min = _props3.min,
          max = _props3.max;
      var _state2 = this.state,
          firstValue = _state2.firstValue,
          secondValue = _state2.secondValue,
          oldValue = _state2.oldValue,
          inputValue = _state2.inputValue;


      if (range && Array.isArray(value)) {
        if (value[1] < min) {
          inputValue = [min, min];
        } else if (value[0] > max) {
          inputValue = [max, max];
        } else if (value[0] < min) {
          inputValue = [min, value[1]];
        } else if (value[1] > max) {
          inputValue = [value[0], max];
        } else {
          firstValue = value[0];
          secondValue = value[1];

          if (this.valueChanged()) {
            this.onValueChanged([this.minValue(), this.maxValue()]);

            oldValue = value.slice();
          }
        }
      } else if (!range && typeof value === 'number' && !isNaN(value)) {
        if (value < min) {
          inputValue = min;
        } else if (value > max) {
          inputValue = max;
        } else {
          firstValue = value;

          if (this.valueChanged()) {
            this.onValueChanged(value);

            oldValue = value;
          }
        }
      }

      this.forceUpdate();
    }
  }, {
    key: 'setPosition',
    value: function setPosition(percent) {
      var _props4 = this.props,
          range = _props4.range,
          min = _props4.min,
          max = _props4.max;
      var _state3 = this.state,
          firstValue = _state3.firstValue,
          secondValue = _state3.secondValue;


      var targetValue = min + percent * (max - min) / 100;

      if (!range) {
        this.refs.button1.setPosition(percent);return;
      }

      var button = void 0;

      if (Math.abs(this.minValue() - targetValue) < Math.abs(this.maxValue() - targetValue)) {
        button = firstValue < secondValue ? 'button1' : 'button2';
      } else {
        button = firstValue > secondValue ? 'button1' : 'button2';
      }

      this.refs[button].setPosition(percent);
    }
  }, {
    key: 'onSliderClick',
    value: function onSliderClick(event) {
      if (this.props.disabled || this.state.dragging) return;

      var sliderOffsetLeft = this.refs.slider.getBoundingClientRect().left;

      this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderWidth() * 100);
    }

    /* Watched Methods */

  }, {
    key: 'onValueChanged',
    value: function onValueChanged(val) {
      if (this.props.onChange) {
        this.props.onChange(val);
      }
    }
  }, {
    key: 'onInputValueChanged',
    value: function onInputValueChanged(e) {
      this.setState({
        inputValue: e,
        firstValue: e
      });
    }
  }, {
    key: 'onFirstValueChange',
    value: function onFirstValueChange(e) {
      this.setState({
        firstValue: e
      });
    }
  }, {
    key: 'onSecondValueChange',
    value: function onSecondValueChange(e) {
      this.setState({
        secondValue: e
      });
    }
  }, {
    key: 'onDraggingChanged',
    value: function onDraggingChanged(val) {
      if (!val) {
        this.setValues();
      }
    }

    /* Computed Methods */

  }, {
    key: 'sliderWidth',
    value: function sliderWidth() {
      return parseInt(this.refs.slider.offsetWidth, 10);
    }
  }, {
    key: 'stops',
    value: function stops() {
      var _this2 = this;

      var _props5 = this.props,
          range = _props5.range,
          min = _props5.min,
          max = _props5.max,
          step = _props5.step;
      var firstValue = this.state.firstValue;


      var stopCount = (max - min) / step;
      var stepWidth = 100 * step / (max - min);
      var result = [];

      for (var i = 1; i < stopCount; i++) {
        result.push(i * stepWidth);
      }

      if (range) {
        return result.filter(function (step) {
          return step < 100 * (_this2.minValue() - min) / (max - min) || step > 100 * (_this2.maxValue() - min) / (max - min);
        });
      } else {
        return result.filter(function (step) {
          return step > 100 * (firstValue - min) / (max - min);
        });
      }
    }
  }, {
    key: 'minValue',
    value: function minValue() {
      return Math.min(this.state.firstValue, this.state.secondValue);
    }
  }, {
    key: 'maxValue',
    value: function maxValue() {
      return Math.max(this.state.firstValue, this.state.secondValue);
    }
  }, {
    key: 'barWidth',
    value: function barWidth() {
      return this.props.range ? 100 * (this.maxValue() - this.minValue()) / (this.props.max - this.props.min) + '%' : 100 * (this.state.firstValue - this.props.min) / (this.props.max - this.props.min) + '%';
    }
  }, {
    key: 'barLeft',
    value: function barLeft() {
      return this.props.range ? 100 * (this.minValue() - this.props.min) / (this.props.max - this.props.min) + '%' : '0%';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          showInput = _props6.showInput,
          showStops = _props6.showStops,
          showInputControls = _props6.showInputControls,
          range = _props6.range,
          step = _props6.step,
          disabled = _props6.disabled,
          min = _props6.min,
          max = _props6.max;
      var _state4 = this.state,
          inputValue = _state4.inputValue,
          firstValue = _state4.firstValue,
          secondValue = _state4.secondValue;


      return _react2.default.createElement(
        'div',
        { className: 'el-slider' },
        showInput && !range && _react2.default.createElement(_inputNumber2.default, {
          value: inputValue,
          className: 'el-slider__input',
          ref: 'input',
          step: step,
          disabled: disabled,
          controls: showInputControls,
          min: min,
          max: max,
          size: 'small',
          onChange: this.onInputValueChanged.bind(this)
        }),
        _react2.default.createElement(
          'div',
          { ref: 'slider', className: this.classNames('el-slider__runway', {
              'show-input': showInput,
              'disabled': disabled
            }), onClick: this.onSliderClick.bind(this) },
          _react2.default.createElement('div', {
            className: 'el-slider__bar',
            style: {
              width: this.barWidth(),
              left: this.barLeft()
            } }),
          _react2.default.createElement(_Button2.default, { ref: 'button1', value: firstValue, onChange: this.onFirstValueChange.bind(this) }),
          range && _react2.default.createElement(_Button2.default, { ref: 'button2', value: secondValue, onChange: this.onSecondValueChange.bind(this) }),
          showStops && this.stops().map(function (item, index) {
            return _react2.default.createElement('div', { key: index, className: 'el-slider__stop', style: { 'left': item + '%' } });
          })
        )
      );
    }
  }]);

  return Slider;
}(_libs.Component);

Slider.defaultProps = {
  showInputControls: true,
  min: 0,
  max: 100,
  step: 1,
  value: 0
};
var _default = Slider;
exports.default = _default;


Slider.childContextTypes = {
  component: _libs.PropTypes.any
};

Slider.propTypes = {
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  step: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.arrayOf(_libs.PropTypes.number)]),
  showInput: _libs.PropTypes.bool,
  showInputControls: _libs.PropTypes.bool,
  showStops: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool,
  range: _libs.PropTypes.bool,
  onChange: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Slider, 'Slider', 'src/slider/Slider.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/slider/Slider.jsx');
}();

;